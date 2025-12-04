#!/usr/bin/env python3
"""
Script pour consolider les données collectées
Usage: python scripts/consolidate-data.py results/performance/
"""

import json
import sys
from pathlib import Path
from collections import defaultdict

def load_all_executions(directory):
    """Charge toutes les exécutions depuis les fichiers JSON"""
    directory = Path(directory)
    executions_by_platform = defaultdict(list)
    
    for json_file in directory.glob("*.json"):
        try:
            with open(json_file) as f:
                data = json.load(f)
            
            # Support pour différents formats
            if isinstance(data, list):
                # Format: liste d'exécutions
                for execution in data:
                    if "platform" in execution:
                        executions_by_platform[execution["platform"]].append(execution)
            elif isinstance(data, dict):
                if "executions" in data:
                    # Format: {platform: "...", executions: [...]}
                    platform = data.get("platform", json_file.stem.split("_")[0])
                    for execution in data["executions"]:
                        execution["platform"] = platform
                        executions_by_platform[platform].append(execution)
                elif "platform" in data:
                    # Format: exécution unique
                    executions_by_platform[data["platform"]].append(data)
                else:
                    # Essayer de deviner la plateforme depuis le nom du fichier
                    platform = json_file.stem.split("_")[0]
                    if platform in ["github", "gitlab", "jenkins"]:
                        data["platform"] = platform
                        executions_by_platform[platform].append(data)
        except Exception as e:
            print(f"⚠️  Erreur lors de la lecture de {json_file.name}: {e}")
    
    return executions_by_platform

def consolidate_platform(platform, executions, output_dir):
    """Consolide les exécutions d'une plateforme"""
    output_file = output_dir / f"{platform}_all.json"
    
    consolidated = {
        "platform": platform,
        "total_executions": len(executions),
        "executions": executions
    }
    
    with open(output_file, 'w') as f:
        json.dump(consolidated, f, indent=2)
    
    return output_file

def generate_summary(executions_by_platform, output_dir):
    """Génère un résumé de toutes les données"""
    summary = {
        "total_platforms": len(executions_by_platform),
        "platforms": {}
    }
    
    for platform, executions in executions_by_platform.items():
        durations = [e.get("duration", {}).get("total", 0) for e in executions]
        durations = [d for d in durations if d > 0]
        
        summary["platforms"][platform] = {
            "total_executions": len(executions),
            "successful_executions": sum(1 for e in executions if e.get("success", False)),
            "failed_executions": sum(1 for e in executions if not e.get("success", True)),
            "avg_duration": sum(durations) / len(durations) if durations else 0,
            "min_duration": min(durations) if durations else 0,
            "max_duration": max(durations) if durations else 0
        }
    
    summary_file = output_dir / "summary.json"
    with open(summary_file, 'w') as f:
        json.dump(summary, f, indent=2)
    
    return summary_file

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/consolidate-data.py <results_dir>")
        sys.exit(1)
    
    results_dir = Path(sys.argv[1])
    
    if not results_dir.exists():
        print(f"❌ Répertoire introuvable: {results_dir}")
        sys.exit(1)
    
    print(f"🔍 Consolidation des données depuis {results_dir}...")
    print()
    
    # Charger toutes les exécutions
    executions_by_platform = load_all_executions(results_dir)
    
    if not executions_by_platform:
        print("❌ Aucune exécution trouvée")
        sys.exit(1)
    
    # Afficher le résumé
    print("📊 Exécutions trouvées:")
    for platform, executions in executions_by_platform.items():
        print(f"  {platform}: {len(executions)} exécutions")
    print()
    
    # Consolider par plateforme
    consolidated_files = []
    for platform, executions in executions_by_platform.items():
        output_file = consolidate_platform(platform, executions, results_dir)
        consolidated_files.append(output_file)
        print(f"✅ {platform}: {len(executions)} exécutions consolidées → {output_file.name}")
    
    # Générer le résumé
    summary_file = generate_summary(executions_by_platform, results_dir)
    print(f"✅ Résumé généré → {summary_file.name}")
    
    print()
    print("="*60)
    print("✅ Consolidation terminée!")
    print()
    print("📁 Fichiers générés:")
    for file in consolidated_files:
        print(f"   - {file.name}")
    print(f"   - {summary_file.name}")
    print("="*60)

if __name__ == "__main__":
    main()

