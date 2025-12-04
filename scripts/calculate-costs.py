#!/usr/bin/env python3
"""
Script pour calculer les coûts des différentes plateformes CI/CD
Usage: python scripts/calculate-costs.py results/performance/
"""

import json
import sys
from pathlib import Path
from statistics import mean

# Pricing (à mettre à jour selon les tarifs actuels)
PRICING = {
    "github": {
        "free_minutes": 2000,  # Minutes gratuites par mois
        "price_per_minute": 0.008,  # $0.008 par minute après le quota
        "runner_type": "ubuntu-latest"
    },
    "gitlab": {
        "free_minutes": 400,  # Minutes gratuites par mois (Shared Runner)
        "price_per_minute": 0.01,  # $0.01 par minute après le quota
        "runner_type": "shared"
    },
    "jenkins": {
        "self_hosted": True,
        "infrastructure_cost_per_month": 20,  # Coût estimé infrastructure
        "maintenance_hours_per_month": 4,
        "hourly_rate": 50  # Taux horaire pour maintenance
    }
}

def load_results(results_dir):
    """Charge tous les fichiers de résultats JSON"""
    results = {}
    for file in Path(results_dir).glob("*.json"):
        platform = file.stem.split("_")[0]
        with open(file) as f:
            data = json.load(f)
            if platform not in results:
                results[platform] = []
            
            if isinstance(data, list):
                results[platform].extend(data)
            elif isinstance(data, dict):
                if "executions" in data:
                    results[platform].extend(data["executions"])
                else:
                    results[platform].append(data)
    
    return results

def calculate_github_costs(executions, builds_per_month=100):
    """Calcule les coûts pour GitHub Actions"""
    durations = []
    for e in executions:
        if isinstance(e, dict):
            duration = e.get("duration", {}).get("total", 0)
        else:
            duration = e.get("duration", 0)
        if duration > 0:
            durations.append(duration / 60)  # Convertir en minutes
    
    if not durations:
        return None
    
    avg_duration_minutes = mean(durations)
    total_minutes_per_month = avg_duration_minutes * builds_per_month
    
    free_minutes = PRICING["github"]["free_minutes"]
    paid_minutes = max(0, total_minutes_per_month - free_minutes)
    cost_per_month = paid_minutes * PRICING["github"]["price_per_minute"]
    
    return {
        "avg_duration_minutes": avg_duration_minutes,
        "total_minutes_per_month": total_minutes_per_month,
        "free_minutes": free_minutes,
        "paid_minutes": paid_minutes,
        "cost_per_month": cost_per_month,
        "cost_per_build": cost_per_month / builds_per_month if builds_per_month > 0 else 0
    }

def calculate_gitlab_costs(executions, builds_per_month=100):
    """Calcule les coûts pour GitLab CI"""
    durations = []
    for e in executions:
        if isinstance(e, dict):
            duration = e.get("duration", {}).get("total", 0)
        else:
            duration = e.get("duration", 0)
        if duration > 0:
            durations.append(duration / 60)  # Convertir en minutes
    
    if not durations:
        return None
    
    avg_duration_minutes = mean(durations)
    total_minutes_per_month = avg_duration_minutes * builds_per_month
    
    free_minutes = PRICING["gitlab"]["free_minutes"]
    paid_minutes = max(0, total_minutes_per_month - free_minutes)
    cost_per_month = paid_minutes * PRICING["gitlab"]["price_per_minute"]
    
    return {
        "avg_duration_minutes": avg_duration_minutes,
        "total_minutes_per_month": total_minutes_per_month,
        "free_minutes": free_minutes,
        "paid_minutes": paid_minutes,
        "cost_per_month": cost_per_month,
        "cost_per_build": cost_per_month / builds_per_month if builds_per_month > 0 else 0
    }

def calculate_jenkins_costs(executions, builds_per_month=100):
    """Calcule les coûts pour Jenkins (self-hosted)"""
    # Coût fixe d'infrastructure
    infrastructure_cost = PRICING["jenkins"]["infrastructure_cost_per_month"]
    
    # Coût de maintenance
    maintenance_hours = PRICING["jenkins"]["maintenance_hours_per_month"]
    hourly_rate = PRICING["jenkins"]["hourly_rate"]
    maintenance_cost = maintenance_hours * hourly_rate
    
    total_cost_per_month = infrastructure_cost + maintenance_cost
    
    return {
        "infrastructure_cost": infrastructure_cost,
        "maintenance_cost": maintenance_cost,
        "total_cost_per_month": total_cost_per_month,
        "cost_per_build": total_cost_per_month / builds_per_month if builds_per_month > 0 else 0,
        "note": "Coût fixe indépendant du nombre de builds"
    }

def generate_cost_report(results, builds_per_month=100):
    """Génère un rapport de coûts"""
    print("\n" + "="*80)
    print(f"ANALYSE DES COÛTS (pour {builds_per_month} builds/mois)")
    print("="*80)
    
    costs = {}
    
    # GitHub Actions
    if "github" in results:
        costs["github"] = calculate_github_costs(results["github"], builds_per_month)
    
    # GitLab CI
    if "gitlab" in results:
        costs["gitlab"] = calculate_gitlab_costs(results["gitlab"], builds_per_month)
    
    # Jenkins
    if "jenkins" in results:
        costs["jenkins"] = calculate_jenkins_costs(results["jenkins"], builds_per_month)
    
    # Afficher les résultats
    for platform, cost_data in costs.items():
        if cost_data is None:
            print(f"\n⚠️  {platform.upper()}: Pas assez de données")
            continue
        
        print(f"\n💰 {platform.upper()}:")
        print("-"*80)
        
        if platform in ["github", "gitlab"]:
            print(f"  Durée moyenne: {cost_data['avg_duration_minutes']:.2f} minutes")
            print(f"  Total minutes/mois: {cost_data['total_minutes_per_month']:.2f}")
            print(f"  Minutes gratuites: {cost_data['free_minutes']}")
            print(f"  Minutes payantes: {cost_data['paid_minutes']:.2f}")
            print(f"  Coût/mois: ${cost_data['cost_per_month']:.2f}")
            print(f"  Coût/build: ${cost_data['cost_per_build']:.4f}")
        else:  # Jenkins
            print(f"  Coût infrastructure: ${cost_data['infrastructure_cost']:.2f}/mois")
            print(f"  Coût maintenance: ${cost_data['maintenance_cost']:.2f}/mois")
            print(f"  Coût total/mois: ${cost_data['total_cost_per_month']:.2f}")
            print(f"  Coût/build: ${cost_data['cost_per_build']:.4f}")
            print(f"  Note: {cost_data['note']}")
    
    # Comparaison
    if len(costs) >= 2:
        print("\n" + "="*80)
        print("COMPARAISON DES COÛTS")
        print("="*80)
        
        monthly_costs = {}
        for platform, cost_data in costs.items():
            if cost_data:
                if platform in ["github", "gitlab"]:
                    monthly_costs[platform] = cost_data['cost_per_month']
                else:
                    monthly_costs[platform] = cost_data['total_cost_per_month']
        
        if monthly_costs:
            sorted_costs = sorted(monthly_costs.items(), key=lambda x: x[1])
            print("\n📊 Classement par coût (du moins cher au plus cher):")
            for i, (platform, cost) in enumerate(sorted_costs, 1):
                print(f"  {i}. {platform.upper()}: ${cost:.2f}/mois")

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/calculate-costs.py <results_dir> [builds_per_month]")
        sys.exit(1)
    
    results_dir = sys.argv[1]
    builds_per_month = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    
    results = load_results(results_dir)
    
    if not results:
        print(f"❌ Aucun résultat trouvé dans {results_dir}")
        sys.exit(1)
    
    generate_cost_report(results, builds_per_month)

if __name__ == "__main__":
    main()

