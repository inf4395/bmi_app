#!/bin/bash

# Script pour mesurer les performances des pipelines CI/CD
# Usage: ./scripts/measure-performance.sh [platform] [runs]
# Exemple: ./scripts/measure-performance.sh github 10

PLATFORM=${1:-github}
RUNS=${2:-10}
RESULTS_DIR="results/performance"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="${RESULTS_DIR}/${PLATFORM}_${TIMESTAMP}.json"

# Créer le dossier de résultats
mkdir -p "$RESULTS_DIR"

echo "📊 Mesure des performances pour $PLATFORM ($RUNS exécutions)"
echo "Résultats: $OUTPUT_FILE"

# Initialiser le fichier JSON
echo "{" > "$OUTPUT_FILE"
echo "  \"platform\": \"$PLATFORM\"," >> "$OUTPUT_FILE"
echo "  \"runs\": $RUNS," >> "$OUTPUT_FILE"
echo "  \"timestamp\": \"$TIMESTAMP\"," >> "$OUTPUT_FILE"
echo "  \"executions\": [" >> "$OUTPUT_FILE"

for i in $(seq 1 $RUNS); do
    echo "Run $i/$RUNS..."
    
    START_TIME=$(date +%s.%N)
    
    case $PLATFORM in
        github)
            # Déclencher GitHub Actions via API
            gh workflow run "BMI App CI/CD" 2>/dev/null || echo "Note: Utiliser gh CLI ou interface web"
            ;;
        gitlab)
            # Déclencher GitLab CI via API
            echo "Note: Déclencher manuellement via GitLab UI ou API"
            ;;
        jenkins)
            # Déclencher Jenkins via API
            echo "Note: Déclencher manuellement via Jenkins UI ou API"
            ;;
    esac
    
    # Attendre la fin (à adapter selon la plateforme)
    # Pour l'instant, on simule
    sleep 5
    
    END_TIME=$(date +%s.%N)
    DURATION=$(echo "$END_TIME - $START_TIME" | bc)
    
    # Ajouter au JSON
    if [ $i -gt 1 ]; then
        echo "," >> "$OUTPUT_FILE"
    fi
    echo "    {" >> "$OUTPUT_FILE"
    echo "      \"run\": $i," >> "$OUTPUT_FILE"
    echo "      \"duration\": $DURATION," >> "$OUTPUT_FILE"
    echo "      \"start_time\": $START_TIME," >> "$OUTPUT_FILE"
    echo "      \"end_time\": $END_TIME" >> "$OUTPUT_FILE"
    echo -n "    }" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"
echo "  ]" >> "$OUTPUT_FILE"
echo "}" >> "$OUTPUT_FILE"

echo "✅ Mesures terminées: $OUTPUT_FILE"

