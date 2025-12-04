# Script PowerShell pour collecter toutes les métriques supplémentaires
# Usage: .\scripts\collect-all-metrics-enhanced.ps1

$ErrorActionPreference = "Continue"
$RESULTS_DIR = "results"
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "🔍 Collecte complète des métriques supplémentaires..." -ForegroundColor Cyan
Write-Host "Timestamp: $TIMESTAMP"
Write-Host ""

# Créer les répertoires nécessaires
$directories = @(
    "$RESULTS_DIR\code-quality",
    "$RESULTS_DIR\resource-usage",
    "$RESULTS_DIR\developer-experience",
    "$RESULTS_DIR\performance"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# 1. Collecter les métriques de qualité de code
Write-Host "📊 1/4 - Collecte des métriques de qualité de code..." -ForegroundColor Yellow
try {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        node scripts/collect-code-quality-metrics.js all
        Write-Host "✅ Métriques de qualité collectées" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Node.js non trouvé, skip des métriques de qualité de code" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Erreur lors de la collecte des métriques de qualité: $_" -ForegroundColor Red
}

# 2. Collecter les métriques d'utilisation des ressources
Write-Host ""
Write-Host "💻 2/4 - Collecte des métriques d'utilisation des ressources..." -ForegroundColor Yellow
try {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        node scripts/collect-resource-usage.js
        Write-Host "✅ Métriques de ressources collectées" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Node.js non trouvé, skip des métriques de ressources" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Erreur lors de la collecte des métriques de ressources: $_" -ForegroundColor Red
}

# 3. Collecter les métriques d'expérience développeur
Write-Host ""
Write-Host "👨‍💻 3/4 - Collecte des métriques d'expérience développeur..." -ForegroundColor Yellow
try {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        node scripts/collect-developer-experience.js
        Write-Host "✅ Métriques d'expérience collectées" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Node.js non trouvé, skip des métriques d'expérience" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Erreur lors de la collecte des métriques d'expérience: $_" -ForegroundColor Red
}

# 4. Calculer les coûts
Write-Host ""
Write-Host "💰 4/4 - Calcul des coûts..." -ForegroundColor Yellow
try {
    if (Get-Command python3 -ErrorAction SilentlyContinue) {
        $perfDir = "$RESULTS_DIR\performance"
        if ((Test-Path $perfDir) -and (Get-ChildItem "$perfDir\*.json" -ErrorAction SilentlyContinue)) {
            python3 scripts/calculate-costs.py "$perfDir" 100
            Write-Host "✅ Coûts calculés" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Aucune donnée de performance disponible pour le calcul des coûts" -ForegroundColor Yellow
        }
    } elseif (Get-Command python -ErrorAction SilentlyContinue) {
        $perfDir = "$RESULTS_DIR\performance"
        if ((Test-Path $perfDir) -and (Get-ChildItem "$perfDir\*.json" -ErrorAction SilentlyContinue)) {
            python scripts/calculate-costs.py "$perfDir" 100
            Write-Host "✅ Coûts calculés" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Aucune donnée de performance disponible pour le calcul des coûts" -ForegroundColor Yellow
        }
    } else {
        Write-Host "⚠️  Python non trouvé, skip du calcul des coûts" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Erreur lors du calcul des coûts: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ Collecte terminée!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Résultats disponibles dans:" -ForegroundColor Cyan
Write-Host "   - Code Quality: $RESULTS_DIR\code-quality\" -ForegroundColor White
Write-Host "   - Resource Usage: $RESULTS_DIR\resource-usage\" -ForegroundColor White
Write-Host "   - Developer Experience: $RESULTS_DIR\developer-experience\" -ForegroundColor White
Write-Host "   - Costs: (voir sortie ci-dessus)" -ForegroundColor White
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Examiner les rapports JSON générés" -ForegroundColor White
Write-Host "   2. Exécuter: python scripts/generate-visualizations.py" -ForegroundColor White
Write-Host "   3. Consolider les données: python scripts/consolidate-data.py" -ForegroundColor White
Write-Host ""

