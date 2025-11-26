#!/usr/bin/env python3
"""
Script pour analyser les résultats de performance des pipelines CI/CD
Usage: python scripts/analyze-results.py results/performance/
"""

import json
import os
import sys
from pathlib import Path
from statistics import mean, median, stdev
import matplotlib.pyplot as plt

def load_results(results_dir):
    """Charge tous les fichiers de résultats JSON"""
    results = {}
    for file in Path(results_dir).glob("*.json"):
        platform = file.stem.split("_")[0]
        with open(file) as f:
            data = json.load(f)
            if platform not in results:
                results[platform] = []
            results[platform].extend(data.get("executions", []))
    return results

def calculate_statistics(executions):
    """Calcule les statistiques pour une série d'exécutions"""
    durations = [e["duration"] for e in executions]
    return {
        "mean": mean(durations),
        "median": median(durations),
        "min": min(durations),
        "max": max(durations),
        "stdev": stdev(durations) if len(durations) > 1 else 0,
        "count": len(durations)
    }

def generate_comparison_table(results):
    """Génère un tableau de comparaison"""
    print("\n" + "="*80)
    print("COMPARAISON DES PERFORMANCES")
    print("="*80)
    print(f"{'Plateforme':<20} {'Moyenne':<15} {'Médiane':<15} {'Min':<15} {'Max':<15} {'Écart-type':<15}")
    print("-"*80)
    
    for platform, executions in results.items():
        stats = calculate_statistics(executions)
        print(f"{platform:<20} {stats['mean']:<15.2f} {stats['median']:<15.2f} "
              f"{stats['min']:<15.2f} {stats['max']:<15.2f} {stats['stdev']:<15.2f}")
    
    print("="*80)

def plot_comparison(results, output_file="results/comparison.png"):
    """Génère un graphique de comparaison"""
    platforms = []
    means = []
    stds = []
    
    for platform, executions in results.items():
        stats = calculate_statistics(executions)
        platforms.append(platform)
        means.append(stats["mean"])
        stds.append(stats["stdev"])
    
    plt.figure(figsize=(10, 6))
    plt.bar(platforms, means, yerr=stds, capsize=5, alpha=0.7)
    plt.xlabel("Plateforme")
    plt.ylabel("Temps d'exécution (secondes)")
    plt.title("Comparaison des temps d'exécution moyens")
    plt.grid(axis='y', alpha=0.3)
    
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    plt.savefig(output_file)
    print(f"\nGraphique sauvegarde: {output_file}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/analyze-results.py <results_dir>")
        sys.exit(1)
    
    results_dir = sys.argv[1]
    results = load_results(results_dir)
    
    if not results:
        print(f"Aucun résultat trouvé dans {results_dir}")
        sys.exit(1)
    
    # Afficher les statistiques
    for platform, executions in results.items():
        print(f"\n{platform.upper()}:")
        stats = calculate_statistics(executions)
        print(f"  Nombre d'exécutions: {stats['count']}")
        print(f"  Temps moyen: {stats['mean']:.2f}s")
        print(f"  Temps médian: {stats['median']:.2f}s")
        print(f"  Min: {stats['min']:.2f}s")
        print(f"  Max: {stats['max']:.2f}s")
        print(f"  Écart-type: {stats['stdev']:.2f}s")
    
    # Tableau de comparaison
    generate_comparison_table(results)
    
    # Graphique
    plot_comparison(results)

if __name__ == "__main__":
    main()

