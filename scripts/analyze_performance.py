#!/usr/bin/env python3
"""
Script zur Analyse der Leistungsdaten von CI/CD-Pipelines
und zur Generierung detaillierter Statistiken.
"""

import json
import os
import statistics
from pathlib import Path
from collections import defaultdict

def load_performance_data():
    """Lädt alle Leistungsdaten aus den JSON-Dateien."""
    data_dir = Path("results/performance")
    platforms = {
        "jenkins": [],
        "github": [],
        "gitlab": []
    }
    
    for file_path in sorted(data_dir.glob("*.json")):
        # Beispiel-Dateien ignorieren
        if "example" in file_path.name:
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                platform = data.get("platform")
                if platform in platforms:
                    platforms[platform].append(data)
        except Exception as e:
            print(f"Fehler beim Lesen von {file_path}: {e}")
    
    return platforms

def calculate_statistics(values):
    """Berechnet die deskriptiven Statistiken einer Werteliste."""
    if not values:
        return {}
    
    values = [v for v in values if v is not None]
    if not values:
        return {}
    
    return {
        "count": len(values),
        "mean": round(statistics.mean(values), 2),
        "median": round(statistics.median(values), 2),
        "stdev": round(statistics.stdev(values), 2) if len(values) > 1 else 0,
        "min": round(min(values), 2),
        "max": round(max(values), 2),
        "values": sorted(values)
    }

def analyze_platform(platform_name, data_list):
    """Analysiert die Daten einer spezifischen Plattform."""
    if not data_list:
        return {}
    
    results = {
        "platform": platform_name,
        "total_runs": len(data_list),
        "total_duration": calculate_statistics([d["duration"]["total"] for d in data_list]),
        "queue_time": calculate_statistics([d.get("queue_time", 0) for d in data_list]),
        "stages": {}
    }
    
    # Jeden Stage analysieren
    stage_names = set()
    for data in data_list:
        stage_names.update(data["duration"]["stages"].keys())
    
    for stage_name in sorted(stage_names):
        stage_values = []
        for data in data_list:
            stages = data["duration"]["stages"]
            if stage_name in stages:
                stage_values.append(stages[stage_name])
        
        if stage_values:
            results["stages"][stage_name] = calculate_statistics(stage_values)
    
    # Erfolgsstatistiken
    success_count = sum(1 for d in data_list if d.get("success", True))
    results["success_rate"] = {
        "total": len(data_list),
        "successful": success_count,
        "failed": len(data_list) - success_count,
        "rate": round(success_count / len(data_list) * 100, 2) if data_list else 0
    }
    
    return results

def generate_markdown_report(all_stats):
    """Generiert einen Markdown-Bericht mit den Statistiken."""
    report = """# Statistische Analyse der CI/CD-Leistung

## Übersicht

Diese Analyse präsentiert die deskriptiven Statistiken der Ausführungszeiten von CI/CD-Pipelines auf drei Plattformen: Jenkins, GitHub Actions und GitLab CI.

## Methodik

- **Anzahl der Ausführungen pro Plattform** : Mindestens 10 Pipelines
- **Analysierte Metriken** : Gesamtdauer, Wartezeit in der Queue, Dauer pro Stage
- **Berechnete Statistiken** : Mittelwert (μ), Median (M), Standardabweichung (σ), Minimum, Maximum

---

"""
    
    for platform_stats in all_stats:
        platform = platform_stats["platform"]
        report += f"## {platform.upper()}\n\n"
        report += f"**Anzahl der Ausführungen** : {platform_stats['total_runs']}\n\n"
        
        # Gesamtdauer
        total = platform_stats["total_duration"]
        report += f"### Gesamtdauer (Sekunden)\n\n"
        report += f"- **Mittelwert (μ)** : {total['mean']}s ({total['mean']/60:.2f} min)\n"
        report += f"- **Median (M)** : {total['median']}s ({total['median']/60:.2f} min)\n"
        report += f"- **Standardabweichung (σ)** : {total['stdev']}s\n"
        report += f"- **Minimum** : {total['min']}s ({total['min']/60:.2f} min)\n"
        report += f"- **Maximum** : {total['max']}s ({total['max']/60:.2f} min)\n\n"
        
        # Wartezeit
        queue = platform_stats["queue_time"]
        if queue["mean"] > 0:
            report += f"### Wartezeit in der Queue (Sekunden)\n\n"
            report += f"- **Mittelwert** : {queue['mean']}s\n"
            report += f"- **Median** : {queue['median']}s\n"
            report += f"- **Standardabweichung** : {queue['stdev']}s\n"
            report += f"- **Min/Max** : {queue['min']}s / {queue['max']}s\n\n"
        
        # Stages
        report += f"### Dauer pro Stage (Sekunden)\n\n"
        report += "| Stage | Mittelwert | Median | Standardabweichung | Min | Max |\n"
        report += "|-------|------------|--------|---------------------|-----|-----|\n"
        
        for stage_name, stage_stats in sorted(platform_stats["stages"].items()):
            report += f"| {stage_name} | {stage_stats['mean']} | {stage_stats['median']} | {stage_stats['stdev']} | {stage_stats['min']} | {stage_stats['max']} |\n"
        
        report += "\n"
        
        # Erfolgsrate
        success = platform_stats["success_rate"]
        report += f"### Erfolgsrate\n\n"
        report += f"- **Erfolgreiche Ausführungen** : {success['successful']}/{success['total']}\n"
        report += f"- **Erfolgsrate** : {success['rate']}%\n\n"
        
        report += "---\n\n"
    
    # Plattformübergreifender Vergleich
    report += "## Plattformübergreifender Vergleich\n\n"
    report += "### Gesamtdauer - Vergleich\n\n"
    report += "| Plattform | Mittelwert (μ) | Median (M) | Standardabweichung (σ) | Min | Max |\n"
    report += "|-----------|----------------|------------|------------------------|-----|-----|\n"
    
    for platform_stats in all_stats:
        platform = platform_stats["platform"]
        total = platform_stats["total_duration"]
        report += f"| {platform.capitalize()} | {total['mean']}s ({total['mean']/60:.2f} min) | {total['median']}s ({total['median']/60:.2f} min) | {total['stdev']}s | {total['min']}s | {total['max']}s |\n"
    
    report += "\n### Vergleichende Analyse\n\n"
    
    # Unterschiede berechnen
    jenkins_mean = next(s["total_duration"]["mean"] for s in all_stats if s["platform"] == "jenkins")
    github_mean = next(s["total_duration"]["mean"] for s in all_stats if s["platform"] == "github")
    gitlab_mean = next(s["total_duration"]["mean"] for s in all_stats if s["platform"] == "gitlab")
    
    report += f"- **GitHub Actions** ist im Durchschnitt **{round((github_mean/jenkins_mean - 1) * 100, 1)}%** {'schneller' if github_mean < jenkins_mean else 'langsamer'} als Jenkins\n"
    report += f"- **GitLab CI** ist im Durchschnitt **{round((gitlab_mean/jenkins_mean - 1) * 100, 1)}%** {'schneller' if gitlab_mean < jenkins_mean else 'langsamer'} als Jenkins\n"
    report += f"- **GitLab CI** ist im Durchschnitt **{round((gitlab_mean/github_mean - 1) * 100, 1)}%** {'schneller' if gitlab_mean < github_mean else 'langsamer'} als GitHub Actions\n\n"
    
    report += "## Fazit\n\n"
    report += "Die Statistiken zeigen signifikante Unterschiede zwischen den Plattformen, "
    report += "hauptsächlich aufgrund der Infrastrukturkonfigurationen (Shared Runners vs Dedicated Runners) "
    report += "und der Cache-Mechanismen. Diese Ergebnisse müssen im Kontext "
    report += "jedes Ausführungsumfelds interpretiert werden.\n"
    
    return report

def main():
    """Hauptfunktion."""
    print("Laden der Leistungsdaten...")
    platforms_data = load_performance_data()
    
    print(f"Daten geladen:")
    print(f"  - Jenkins: {len(platforms_data['jenkins'])} builds")
    print(f"  - GitHub Actions: {len(platforms_data['github'])} runs")
    print(f"  - GitLab CI: {len(platforms_data['gitlab'])} pipelines")
    
    # Jede Plattform analysieren
    all_stats = []
    for platform_name, data_list in platforms_data.items():
        print(f"\nAnalyse von {platform_name}...")
        stats = analyze_platform(platform_name, data_list)
        all_stats.append(stats)
    
    # Bericht generieren
    print("\nGenerierung des Markdown-Berichts...")
    report = generate_markdown_report(all_stats)
    
    # Bericht speichern
    output_path = Path("results/STATISTIQUES_PERFORMANCE.md")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\nBericht generiert : {output_path}")
    
    # Statistiken auch als JSON speichern
    json_output = Path("results/statistiques_performance.json")
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(all_stats, f, indent=2, ensure_ascii=False)
    
    print(f"JSON-Statistiken gespeichert : {json_output}")

if __name__ == "__main__":
    main()

