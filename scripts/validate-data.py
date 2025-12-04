#!/usr/bin/env python3
"""
Script pour valider les données collectées
Usage: python scripts/validate-data.py results/performance/
"""

import json
import sys
from pathlib import Path
from datetime import datetime

REQUIRED_FIELDS = [
    "platform",
    "execution_id",
    "timestamp",
    "duration",
    "success"
]

REQUIRED_DURATION_FIELDS = [
    "total"
]

def validate_json_file(file_path):
    """Valide un fichier JSON"""
    errors = []
    warnings = []
    
    try:
        with open(file_path) as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        return [f"❌ JSON invalide: {e}"], []
    except Exception as e:
        return [f"❌ Erreur de lecture: {e}"], []
    
    # Vérifier les champs obligatoires
    for field in REQUIRED_FIELDS:
        if field not in data:
            errors.append(f"Champ manquant: {field}")
    
    # Vérifier la structure duration
    if "duration" in data:
        if not isinstance(data["duration"], dict):
            errors.append("duration doit être un objet")
        elif "total" not in data["duration"]:
            errors.append("duration.total est manquant")
        elif not isinstance(data["duration"]["total"], (int, float)):
            errors.append("duration.total doit être un nombre")
        elif data["duration"]["total"] <= 0:
            warnings.append("duration.total est <= 0")
    
    # Vérifier le timestamp
    if "timestamp" in data:
        try:
            datetime.fromisoformat(data["timestamp"].replace('Z', '+00:00'))
        except:
            errors.append("timestamp doit être au format ISO 8601")
    
    # Vérifier la plateforme
    if "platform" in data:
        if data["platform"] not in ["github", "gitlab", "jenkins"]:
            errors.append(f"platform invalide: {data['platform']}")
    
    # Vérifier success
    if "success" in data:
        if not isinstance(data["success"], bool):
            errors.append("success doit être un booléen")
    
    # Vérifier les durées des stages
    if "duration" in data and "stages" in data["duration"]:
        stages = data["duration"]["stages"]
        if not isinstance(stages, dict):
            errors.append("duration.stages doit être un objet")
        else:
            for stage_name, stage_duration in stages.items():
                if not isinstance(stage_duration, (int, float)):
                    warnings.append(f"duration.stages.{stage_name} n'est pas un nombre")
                elif stage_duration < 0:
                    warnings.append(f"duration.stages.{stage_name} est négatif")
    
    return errors, warnings

def validate_directory(directory):
    """Valide tous les fichiers JSON dans un répertoire"""
    directory = Path(directory)
    
    if not directory.exists():
        print(f"❌ Répertoire introuvable: {directory}")
        return False
    
    json_files = list(directory.glob("*.json"))
    
    if not json_files:
        print(f"⚠️  Aucun fichier JSON trouvé dans {directory}")
        return False
    
    print(f"🔍 Validation de {len(json_files)} fichiers...")
    print()
    
    total_errors = 0
    total_warnings = 0
    valid_files = 0
    
    for json_file in sorted(json_files):
        errors, warnings = validate_json_file(json_file)
        
        if errors:
            print(f"❌ {json_file.name}:")
            for error in errors:
                print(f"   - {error}")
            total_errors += len(errors)
        else:
            valid_files += 1
        
        if warnings:
            print(f"⚠️  {json_file.name}:")
            for warning in warnings:
                print(f"   - {warning}")
            total_warnings += len(warnings)
        
        if not errors and not warnings:
            print(f"✅ {json_file.name}: Valide")
    
    print()
    print("="*60)
    print(f"Résumé:")
    print(f"  ✅ Fichiers valides: {valid_files}/{len(json_files)}")
    print(f"  ❌ Erreurs: {total_errors}")
    print(f"  ⚠️  Avertissements: {total_warnings}")
    print("="*60)
    
    return total_errors == 0

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/validate-data.py <results_dir>")
        sys.exit(1)
    
    results_dir = sys.argv[1]
    
    if validate_directory(results_dir):
        print("\n✅ Tous les fichiers sont valides!")
        sys.exit(0)
    else:
        print("\n❌ Des erreurs ont été trouvées. Veuillez les corriger.")
        sys.exit(1)

if __name__ == "__main__":
    main()

