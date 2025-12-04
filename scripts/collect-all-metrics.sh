#!/bin/bash
# Script pour collecter automatiquement les métriques de toutes les plateformes
# Usage: ./scripts/collect-all-metrics.sh

set -e

RESULTS_DIR="results/performance"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🔍 Collecte des métriques CI/CD..."
echo "Timestamp: $TIMESTAMP"
echo ""

# Créer le répertoire si nécessaire
mkdir -p "$RESULTS_DIR"

# Fonction pour collecter les métriques GitHub Actions
collect_github_metrics() {
    echo "📊 Collecte des métriques GitHub Actions..."
    
    # Note: Ceci nécessite l'API GitHub Actions
    # Pour l'instant, on crée un template
    cat > "$RESULTS_DIR/github_${TIMESTAMP}.json" <<EOF
{
  "platform": "github",
  "timestamp": "$TIMESTAMP",
  "execution_id": "auto_${TIMESTAMP}",
  "duration": {
    "total": 0,
    "stages": {
      "lint": 0,
      "test": 0,
      "build": 0,
      "e2e": 0,
      "docker": 0,
      "deploy": 0
    }
  },
  "resources": {
    "cpu_usage": 0,
    "memory_usage": 0,
    "network_usage": 0
  },
  "success": true,
  "errors": [],
  "queue_time": 0,
  "runner_type": "ubuntu-latest",
  "note": "Remplir manuellement depuis GitHub Actions UI"
}
EOF
    
    echo "✅ Template créé: $RESULTS_DIR/github_${TIMESTAMP}.json"
    echo "   → Remplir manuellement depuis GitHub Actions UI"
}

# Fonction pour collecter les métriques GitLab CI
collect_gitlab_metrics() {
    echo "📊 Collecte des métriques GitLab CI..."
    
    cat > "$RESULTS_DIR/gitlab_${TIMESTAMP}.json" <<EOF
{
  "platform": "gitlab",
  "timestamp": "$TIMESTAMP",
  "execution_id": "auto_${TIMESTAMP}",
  "duration": {
    "total": 0,
    "stages": {
      "lint": 0,
      "test": 0,
      "build": 0,
      "e2e": 0,
      "deploy": 0
    }
  },
  "resources": {
    "cpu_usage": 0,
    "memory_usage": 0,
    "network_usage": 0
  },
  "success": true,
  "errors": [],
  "queue_time": 0,
  "runner_type": "shared",
  "note": "Remplir manuellement depuis GitLab CI UI"
}
EOF
    
    echo "✅ Template créé: $RESULTS_DIR/gitlab_${TIMESTAMP}.json"
    echo "   → Remplir manuellement depuis GitLab CI UI"
}

# Fonction pour collecter les métriques Jenkins
collect_jenkins_metrics() {
    echo "📊 Collecte des métriques Jenkins..."
    
    cat > "$RESULTS_DIR/jenkins_${TIMESTAMP}.json" <<EOF
{
  "platform": "jenkins",
  "timestamp": "$TIMESTAMP",
  "execution_id": "auto_${TIMESTAMP}",
  "duration": {
    "total": 0,
    "stages": {
      "lint": 0,
      "test": 0,
      "build": 0,
      "e2e": 0,
      "deploy": 0
    }
  },
  "resources": {
    "cpu_usage": 0,
    "memory_usage": 0,
    "network_usage": 0
  },
  "success": true,
  "errors": [],
  "queue_time": 0,
  "runner_type": "local",
  "note": "Remplir manuellement depuis Jenkins Console"
}
EOF
    
    echo "✅ Template créé: $RESULTS_DIR/jenkins_${TIMESTAMP}.json"
    echo "   → Remplir manuellement depuis Jenkins Console"
}

# Collecter les métriques
collect_github_metrics
collect_gitlab_metrics
collect_jenkins_metrics

echo ""
echo "✅ Collecte terminée!"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Exécuter les pipelines sur chaque plateforme"
echo "   2. Remplir les fichiers JSON avec les métriques réelles"
echo "   3. Exécuter: python scripts/analyze-results.py $RESULTS_DIR"
echo ""

