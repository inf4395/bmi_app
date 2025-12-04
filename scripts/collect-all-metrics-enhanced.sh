#!/bin/bash
# Script amélioré pour collecter toutes les métriques supplémentaires
# Usage: ./scripts/collect-all-metrics-enhanced.sh

set -e

RESULTS_DIR="results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🔍 Collecte complète des métriques supplémentaires..."
echo "Timestamp: $TIMESTAMP"
echo ""

# Créer les répertoires nécessaires
mkdir -p "$RESULTS_DIR/code-quality"
mkdir -p "$RESULTS_DIR/resource-usage"
mkdir -p "$RESULTS_DIR/developer-experience"
mkdir -p "$RESULTS_DIR/performance"

# 1. Collecter les métriques de qualité de code
echo "📊 1/4 - Collecte des métriques de qualité de code..."
if command -v node &> /dev/null; then
    node scripts/collect-code-quality-metrics.js all || echo "⚠️  Erreur lors de la collecte des métriques de qualité"
else
    echo "⚠️  Node.js non trouvé, skip des métriques de qualité de code"
fi

# 2. Collecter les métriques d'utilisation des ressources
echo ""
echo "💻 2/4 - Collecte des métriques d'utilisation des ressources..."
if command -v node &> /dev/null; then
    node scripts/collect-resource-usage.js || echo "⚠️  Erreur lors de la collecte des métriques de ressources"
else
    echo "⚠️  Node.js non trouvé, skip des métriques de ressources"
fi

# 3. Collecter les métriques d'expérience développeur
echo ""
echo "👨‍💻 3/4 - Collecte des métriques d'expérience développeur..."
if command -v node &> /dev/null; then
    node scripts/collect-developer-experience.js || echo "⚠️  Erreur lors de la collecte des métriques d'expérience"
else
    echo "⚠️  Node.js non trouvé, skip des métriques d'expérience"
fi

# 4. Calculer les coûts
echo ""
echo "💰 4/4 - Calcul des coûts..."
if command -v python3 &> /dev/null; then
    if [ -d "$RESULTS_DIR/performance" ] && [ "$(ls -A $RESULTS_DIR/performance/*.json 2>/dev/null)" ]; then
        python3 scripts/calculate-costs.py "$RESULTS_DIR/performance" 100 || echo "⚠️  Erreur lors du calcul des coûts"
    else
        echo "⚠️  Aucune donnée de performance disponible pour le calcul des coûts"
    fi
else
    echo "⚠️  Python3 non trouvé, skip du calcul des coûts"
fi

echo ""
echo "✅ Collecte terminée!"
echo ""
echo "📁 Résultats disponibles dans:"
echo "   - Code Quality: $RESULTS_DIR/code-quality/"
echo "   - Resource Usage: $RESULTS_DIR/resource-usage/"
echo "   - Developer Experience: $RESULTS_DIR/developer-experience/"
echo "   - Costs: (voir sortie ci-dessus)"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Examiner les rapports JSON générés"
echo "   2. Exécuter: python3 scripts/generate-visualizations.py"
echo "   3. Consolider les données: python3 scripts/consolidate-data.py"
echo ""

