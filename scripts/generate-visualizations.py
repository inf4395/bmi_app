#!/usr/bin/env python3
"""
Script pour générer des visualisations améliorées
Usage: python scripts/generate-visualizations.py results/performance/
"""

import json
import sys
from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np
from statistics import mean, median, stdev
import seaborn as sns

# Configuration
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.size'] = 10

def load_consolidated_data(results_dir):
    """Charge les données consolidées"""
    results_dir = Path(results_dir)
    platforms_data = {}
    
    for platform in ["github", "gitlab", "jenkins"]:
        file = results_dir / f"{platform}_all.json"
        if file.exists():
            with open(file) as f:
                data = json.load(f)
                platforms_data[platform] = data.get("executions", [])
    
    return platforms_data

def extract_durations(executions):
    """Extrait les durées totales"""
    durations = []
    for e in executions:
        duration = e.get("duration", {}).get("total", 0) if isinstance(e.get("duration"), dict) else e.get("duration", 0)
        if duration > 0:
            durations.append(duration)
    return durations

def plot_comparison_boxplot(platforms_data, output_file):
    """Génère un box plot de comparaison"""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    data_to_plot = []
    labels = []
    
    for platform in ["github", "gitlab", "jenkins"]:
        if platform in platforms_data:
            durations = extract_durations(platforms_data[platform])
            if durations:
                data_to_plot.append(durations)
                labels.append(platform.upper())
    
    if data_to_plot:
        bp = ax.boxplot(data_to_plot, labels=labels, patch_artist=True)
        
        # Colorier les box plots
        colors = ['#28a745', '#fc6d26', '#d33833']
        for patch, color in zip(bp['boxes'], colors[:len(bp['boxes'])]):
            patch.set_facecolor(color)
            patch.set_alpha(0.7)
        
        ax.set_ylabel('Temps d\'exécution (secondes)')
        ax.set_title('Distribution des temps d\'exécution par plateforme')
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"✅ Box plot généré: {output_file}")

def plot_stage_comparison(platforms_data, output_file):
    """Génère une comparaison des temps par stage"""
    fig, ax = plt.subplots(figsize=(14, 8))
    
    stages = ["lint_backend", "lint_frontend", "test_backend", "test_frontend", 
              "build_frontend", "e2e_tests", "docker_build", "deploy"]
    
    x = np.arange(len(stages))
    width = 0.25
    
    platforms = []
    for platform in ["github", "gitlab", "jenkins"]:
        if platform in platforms_data:
            platforms.append(platform)
    
    for i, platform in enumerate(platforms):
        stage_means = []
        for stage in stages:
            durations = []
            for e in platforms_data[platform]:
                stages_data = e.get("duration", {}).get("stages", {})
                if isinstance(stages_data, dict) and stage in stages_data:
                    duration = stages_data[stage]
                    if duration > 0:
                        durations.append(duration)
            stage_means.append(mean(durations) if durations else 0)
        
        ax.bar(x + i * width, stage_means, width, label=platform.upper(), alpha=0.8)
    
    ax.set_xlabel('Stages')
    ax.set_ylabel('Temps moyen (secondes)')
    ax.set_title('Comparaison des temps moyens par stage')
    ax.set_xticks(x + width * (len(platforms) - 1) / 2)
    ax.set_xticklabels([s.replace('_', ' ').title() for s in stages], rotation=45, ha='right')
    ax.legend()
    ax.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"✅ Comparaison des stages générée: {output_file}")

def plot_statistics_comparison(platforms_data, output_file):
    """Génère une comparaison des statistiques"""
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    
    platforms = []
    for platform in ["github", "gitlab", "jenkins"]:
        if platform in platforms_data:
            platforms.append(platform)
    
    # Moyenne
    means = []
    for platform in platforms:
        durations = extract_durations(platforms_data[platform])
        means.append(mean(durations) if durations else 0)
    
    axes[0, 0].bar(platforms, means, color=['#28a745', '#fc6d26', '#d33833'], alpha=0.7)
    axes[0, 0].set_ylabel('Temps moyen (secondes)')
    axes[0, 0].set_title('Temps moyen d\'exécution')
    axes[0, 0].grid(True, alpha=0.3, axis='y')
    
    # Médiane
    medians = []
    for platform in platforms:
        durations = extract_durations(platforms_data[platform])
        medians.append(median(durations) if durations else 0)
    
    axes[0, 1].bar(platforms, medians, color=['#28a745', '#fc6d26', '#d33833'], alpha=0.7)
    axes[0, 1].set_ylabel('Temps médian (secondes)')
    axes[0, 1].set_title('Temps médian d\'exécution')
    axes[0, 1].grid(True, alpha=0.3, axis='y')
    
    # Écart-type
    stds = []
    for platform in platforms:
        durations = extract_durations(platforms_data[platform])
        if len(durations) > 1:
            stds.append(stdev(durations))
        else:
            stds.append(0)
    
    axes[1, 0].bar(platforms, stds, color=['#28a745', '#fc6d26', '#d33833'], alpha=0.7)
    axes[1, 0].set_ylabel('Écart-type (secondes)')
    axes[1, 0].set_title('Variabilité des temps d\'exécution')
    axes[1, 0].grid(True, alpha=0.3, axis='y')
    
    # Taux de succès
    success_rates = []
    for platform in platforms:
        executions = platforms_data[platform]
        successful = sum(1 for e in executions if e.get("success", False))
        success_rates.append((successful / len(executions) * 100) if executions else 0)
    
    axes[1, 1].bar(platforms, success_rates, color=['#28a745', '#fc6d26', '#d33833'], alpha=0.7)
    axes[1, 1].set_ylabel('Taux de succès (%)')
    axes[1, 1].set_title('Taux de succès des pipelines')
    axes[1, 1].set_ylim(0, 100)
    axes[1, 1].grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"✅ Comparaison des statistiques générée: {output_file}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/generate-visualizations.py <results_dir>")
        sys.exit(1)
    
    results_dir = Path(sys.argv[1])
    output_dir = results_dir / "visualizations"
    output_dir.mkdir(exist_ok=True)
    
    print(f"📊 Génération des visualisations...")
    print()
    
    # Charger les données
    platforms_data = load_consolidated_data(results_dir)
    
    if not platforms_data:
        print("❌ Aucune donnée consolidée trouvée")
        print("   Exécutez d'abord: python scripts/consolidate-data.py results/performance/")
        sys.exit(1)
    
    # Générer les visualisations
    plot_comparison_boxplot(platforms_data, output_dir / "comparison_boxplot.png")
    plot_stage_comparison(platforms_data, output_dir / "stage_comparison.png")
    plot_statistics_comparison(platforms_data, output_dir / "statistics_comparison.png")
    
    print()
    print("="*60)
    print("✅ Visualisations générées!")
    print(f"📁 Répertoire: {output_dir}")
    print("="*60)

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("❌ Erreur: matplotlib, seaborn et numpy sont requis")
        print("   Installer avec: pip install matplotlib seaborn numpy")
        sys.exit(1)

