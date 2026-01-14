#!/usr/bin/env python3
"""
Script zur Validierung der gesammelten Daten
Verwendung: python scripts/validate-data.py results/performance/
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
    """Validiert eine JSON-Datei"""
    errors = []
    warnings = []
    
    try:
        with open(file_path) as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        return [f"❌ Ungültiges JSON: {e}"], []
    except Exception as e:
        return [f"❌ Lesefehler: {e}"], []
    
    # Pflichtfelder prüfen
    for field in REQUIRED_FIELDS:
        if field not in data:
            errors.append(f"Fehlendes Feld: {field}")
    
    # Struktur duration prüfen
    if "duration" in data:
        if not isinstance(data["duration"], dict):
            errors.append("duration muss ein Objekt sein")
        elif "total" not in data["duration"]:
            errors.append("duration.total fehlt")
        elif not isinstance(data["duration"]["total"], (int, float)):
            errors.append("duration.total muss eine Zahl sein")
        elif data["duration"]["total"] <= 0:
            warnings.append("duration.total ist <= 0")
    
    # Timestamp prüfen
    if "timestamp" in data:
        try:
            datetime.fromisoformat(data["timestamp"].replace('Z', '+00:00'))
        except:
            errors.append("timestamp muss im ISO 8601-Format sein")
    
    # Plattform prüfen
    if "platform" in data:
        if data["platform"] not in ["github", "gitlab", "jenkins"]:
            errors.append(f"Ungültige Plattform: {data['platform']}")
    
    # success prüfen
    if "success" in data:
        if not isinstance(data["success"], bool):
            errors.append("success muss ein Boolean sein")
    
    # Dauer der Stages prüfen
    if "duration" in data and "stages" in data["duration"]:
        stages = data["duration"]["stages"]
        if not isinstance(stages, dict):
            errors.append("duration.stages muss ein Objekt sein")
        else:
            for stage_name, stage_duration in stages.items():
                if not isinstance(stage_duration, (int, float)):
                    warnings.append(f"duration.stages.{stage_name} ist keine Zahl")
                elif stage_duration < 0:
                    warnings.append(f"duration.stages.{stage_name} ist negativ")
    
    return errors, warnings

def validate_directory(directory):
    """Validiert alle JSON-Dateien in einem Verzeichnis"""
    directory = Path(directory)
    
    if not directory.exists():
        print(f"❌ Verzeichnis nicht gefunden: {directory}")
        return False
    
    json_files = list(directory.glob("*.json"))
    
    if not json_files:
        print(f"⚠️  Keine JSON-Dateien in {directory} gefunden")
        return False
    
    print(f"🔍 Validierung von {len(json_files)} Dateien...")
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
            print(f"✅ {json_file.name}: Gültig")
    
    print()
    print("="*60)
    print(f"Zusammenfassung:")
    print(f"  ✅ Gültige Dateien: {valid_files}/{len(json_files)}")
    print(f"  ❌ Fehler: {total_errors}")
    print(f"  ⚠️  Warnungen: {total_warnings}")
    print("="*60)
    
    return total_errors == 0

def main():
    if len(sys.argv) < 2:
        print("Verwendung: python scripts/validate-data.py <results_dir>")
        sys.exit(1)
    
    results_dir = sys.argv[1]
    
    if validate_directory(results_dir):
        print("\n✅ Alle Dateien sind gültig!")
        sys.exit(0)
    else:
        print("\n❌ Fehler wurden gefunden. Bitte korrigieren Sie diese.")
        sys.exit(1)

if __name__ == "__main__":
    main()

