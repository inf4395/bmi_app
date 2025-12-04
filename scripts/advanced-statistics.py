#!/usr/bin/env python3
"""
Script pour calculer des statistiques avancées sur les résultats de performance
Usage: python scripts/advanced-statistics.py results/performance/
"""

import json
import sys
from pathlib import Path
from statistics import mean, median, stdev
from scipy import stats
import numpy as np

def load_results(results_dir):
    """Charge tous les fichiers de résultats JSON"""
    results = {}
    for file in Path(results_dir).glob("*.json"):
        platform = file.stem.split("_")[0]
        with open(file) as f:
            data = json.load(f)
            if platform not in results:
                results[platform] = []
            
            # Support pour ancien format (liste) et nouveau format (objet)
            if isinstance(data, list):
                results[platform].extend(data)
            elif isinstance(data, dict):
                if "executions" in data:
                    results[platform].extend(data["executions"])
                else:
                    results[platform].append(data)
    
    return results

def calculate_advanced_statistics(executions):
    """Calcule des statistiques avancées"""
    durations = [e.get("duration", {}).get("total", 0) if isinstance(e, dict) else e.get("duration", 0) for e in executions]
    
    if len(durations) < 2:
        return None
    
    durations = [d for d in durations if d > 0]  # Filtrer les valeurs invalides
    
    if len(durations) < 2:
        return None
    
    # Statistiques de base
    mean_val = mean(durations)
    median_val = median(durations)
    std_val = stdev(durations) if len(durations) > 1 else 0
    min_val = min(durations)
    max_val = max(durations)
    
    # Intervalle de confiance 95%
    n = len(durations)
    se = std_val / (n ** 0.5)
    t_critical = stats.t.ppf(0.975, n - 1)  # 95% confidence
    ci_lower = mean_val - t_critical * se
    ci_upper = mean_val + t_critical * se
    
    # Quartiles
    q1 = np.percentile(durations, 25)
    q3 = np.percentile(durations, 75)
    iqr = q3 - q1
    
    # Coefficient de variation
    cv = (std_val / mean_val) * 100 if mean_val > 0 else 0
    
    return {
        "count": n,
        "mean": mean_val,
        "median": median_val,
        "std": std_val,
        "min": min_val,
        "max": max_val,
        "q1": q1,
        "q3": q3,
        "iqr": iqr,
        "cv": cv,
        "ci_95_lower": ci_lower,
        "ci_95_upper": ci_upper
    }

def compare_platforms(results):
    """Compare les plateformes avec tests statistiques"""
    platforms = list(results.keys())
    
    if len(platforms) < 2:
        print("⚠️  Pas assez de plateformes pour comparaison")
        return
    
    print("\n" + "="*80)
    print("COMPARAISON STATISTIQUE DES PLATFORMES")
    print("="*80)
    
    # Extraire les durées pour chaque plateforme
    platform_durations = {}
    for platform, executions in results.items():
        durations = [e.get("duration", {}).get("total", 0) if isinstance(e, dict) else e.get("duration", 0) for e in executions]
        durations = [d for d in durations if d > 0]
        if len(durations) >= 2:
            platform_durations[platform] = durations
    
    # Tests t de Student (comparaison deux à deux)
    if len(platform_durations) >= 2:
        platforms_list = list(platform_durations.keys())
        print("\n📊 Tests t de Student (comparaison deux à deux):")
        print("-"*80)
        
        for i in range(len(platforms_list)):
            for j in range(i + 1, len(platforms_list)):
                p1, p2 = platforms_list[i], platforms_list[j]
                durations1 = platform_durations[p1]
                durations2 = platform_durations[p2]
                
                if len(durations1) >= 2 and len(durations2) >= 2:
                    t_stat, p_value = stats.ttest_ind(durations1, durations2)
                    significant = "✅ Significatif" if p_value < 0.05 else "❌ Non significatif"
                    print(f"{p1} vs {p2}:")
                    print(f"  t-statistic: {t_stat:.4f}")
                    print(f"  p-value: {p_value:.4f} {significant}")
                    print(f"  Différence moyenne: {mean(durations1) - mean(durations2):.2f}s")
                    print()

def generate_detailed_report(results):
    """Génère un rapport détaillé"""
    print("\n" + "="*80)
    print("RAPPORT STATISTIQUE DÉTAILLÉ")
    print("="*80)
    
    for platform, executions in results.items():
        stats_data = calculate_advanced_statistics(executions)
        
        if stats_data is None:
            print(f"\n⚠️  {platform.upper()}: Pas assez de données")
            continue
        
        print(f"\n📊 {platform.upper()}:")
        print("-"*80)
        print(f"  Nombre d'exécutions: {stats_data['count']}")
        print(f"  Temps moyen: {stats_data['mean']:.2f}s")
        print(f"  Médiane: {stats_data['median']:.2f}s")
        print(f"  Écart-type: {stats_data['std']:.2f}s")
        print(f"  Min: {stats_data['min']:.2f}s")
        print(f"  Max: {stats_data['max']:.2f}s")
        print(f"  Q1 (25%): {stats_data['q1']:.2f}s")
        print(f"  Q3 (75%): {stats_data['q3']:.2f}s")
        print(f"  IQR: {stats_data['iqr']:.2f}s")
        print(f"  Coefficient de variation: {stats_data['cv']:.2f}%")
        print(f"  Intervalle de confiance 95%: [{stats_data['ci_95_lower']:.2f}s, {stats_data['ci_95_upper']:.2f}s]")
    
    # Comparaison
    compare_platforms(results)

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/advanced-statistics.py <results_dir>")
        sys.exit(1)
    
    results_dir = sys.argv[1]
    results = load_results(results_dir)
    
    if not results:
        print(f"❌ Aucun résultat trouvé dans {results_dir}")
        sys.exit(1)
    
    generate_detailed_report(results)

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("❌ Erreur: scipy et numpy sont requis")
        print("   Installer avec: pip install scipy numpy")
        sys.exit(1)

