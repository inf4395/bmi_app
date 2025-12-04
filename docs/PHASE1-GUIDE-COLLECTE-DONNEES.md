# Phase 1 : Guide Pratique pour la Collecte de Données

## Objectif
Collecter au moins 10 exécutions par plateforme avec des métriques complètes et détaillées.

## Étape 1 : Préparation

### 1.1 Créer la structure de données

Chaque exécution doit être documentée dans un fichier JSON avec cette structure :

```json
{
  "platform": "github|gitlab|jenkins",
  "execution_id": "unique_id",
  "timestamp": "2025-01-26T10:00:00Z",
  "branch": "main|develop|feature/xxx",
  "trigger": "push|pull_request|manual|schedule",
  "duration": {
    "total": 297,
    "stages": {
      "lint_backend": 19,
      "lint_frontend": 10,
      "test_backend": 20,
      "test_frontend": 19,
      "build_frontend": 21,
      "e2e_tests": 129,
      "docker_build": 106,
      "deploy": 7
    }
  },
  "resources": {
    "cpu_usage_percent": 45.2,
    "memory_usage_mb": 1024,
    "network_usage_mb": 512
  },
  "success": true,
  "errors": [],
  "queue_time": 0,
  "runner_type": "ubuntu-latest|shared|local",
  "artifacts": {
    "count": 4,
    "total_size_mb": 15.3
  },
  "cache": {
    "hit": true,
    "size_mb": 250
  }
}
```

## Étape 2 : Collecte GitHub Actions

### 2.1 Accéder aux métriques

1. Aller sur votre repository GitHub
2. Cliquer sur l'onglet **Actions**
3. Sélectionner un workflow run
4. Noter les informations suivantes :

### 2.2 Informations à collecter

**Temps total :**
- Visible en haut de la page du workflow run
- Format : "Completed in Xm Ys"

**Temps par job :**
- Cliquer sur chaque job pour voir le temps d'exécution
- Noter le temps de chaque stage

**Queue time :**
- Visible dans les logs : "Waiting X seconds for a runner"
- Si pas visible, mettre 0

**Runner type :**
- Visible dans les logs : "Running on ubuntu-latest"
- Généralement : `ubuntu-latest`

**Artifacts :**
- Section "Artifacts" en bas de la page
- Nombre et taille totale

**Cache :**
- Vérifier dans les logs si cache a été utilisé
- Rechercher "Cache restored" ou "Cache saved"

### 2.3 Template de collecte GitHub Actions

Utilisez ce template pour chaque exécution :

```json
{
  "platform": "github",
  "execution_id": "run_1234567890",
  "timestamp": "2025-01-26T10:00:00Z",
  "branch": "main",
  "trigger": "push",
  "duration": {
    "total": 297,
    "stages": {
      "lint_backend": 19,
      "lint_frontend": 10,
      "test_backend": 20,
      "test_frontend": 19,
      "build_frontend": 21,
      "e2e_tests": 129,
      "docker_build": 106,
      "deploy": 7
    }
  },
  "resources": {
    "cpu_usage_percent": 0,
    "memory_usage_mb": 0,
    "network_usage_mb": 0
  },
  "success": true,
  "errors": [],
  "queue_time": 0,
  "runner_type": "ubuntu-latest",
  "artifacts": {
    "count": 4,
    "total_size_mb": 15.3
  },
  "cache": {
    "hit": true,
    "size_mb": 250
  }
}
```

### 2.4 Script d'aide pour GitHub Actions

Créez un fichier `results/performance/github_run_1.json`, `github_run_2.json`, etc.

## Étape 3 : Collecte GitLab CI

### 3.1 Accéder aux métriques

1. Aller sur votre projet GitLab
2. Cliquer sur **CI/CD** > **Pipelines**
3. Sélectionner un pipeline
4. Noter les informations suivantes :

### 3.2 Informations à collecter

**Temps total :**
- Visible en haut de la page du pipeline
- Format : "Duration: Xm Ys"

**Temps par job :**
- Cliquer sur chaque job pour voir le temps d'exécution
- Noter le temps de chaque stage

**Queue time :**
- Visible dans les logs : "Waiting for available runner"
- Temps d'attente avant le démarrage

**Runner type :**
- Visible dans les logs : "Running on gitlab-runner-xxx"
- Généralement : `shared` ou nom du runner

**Artifacts :**
- Section "Job artifacts" pour chaque job
- Nombre et taille totale

**Cache :**
- Vérifier dans les logs si cache a été utilisé
- Rechercher "Restoring cache" ou "Saving cache"

### 3.3 Template de collecte GitLab CI

```json
{
  "platform": "gitlab",
  "execution_id": "pipeline_123456",
  "timestamp": "2025-01-26T10:00:00Z",
  "branch": "main",
  "trigger": "push",
  "duration": {
    "total": 492,
    "stages": {
      "lint_backend": 25,
      "lint_frontend": 18,
      "test_backend": 28,
      "test_frontend": 22,
      "build_frontend": 35,
      "e2e_tests": 180,
      "deploy": 10
    }
  },
  "resources": {
    "cpu_usage_percent": 0,
    "memory_usage_mb": 0,
    "network_usage_mb": 0
  },
  "success": true,
  "errors": [],
  "queue_time": 3,
  "runner_type": "shared",
  "artifacts": {
    "count": 3,
    "total_size_mb": 12.5
  },
  "cache": {
    "hit": true,
    "size_mb": 200
  }
}
```

## Étape 4 : Collecte Jenkins

### 4.1 Accéder aux métriques

1. Aller sur votre instance Jenkins
2. Sélectionner votre pipeline
3. Cliquer sur un build
4. Noter les informations suivantes :

### 4.2 Informations à collecter

**Temps total :**
- Visible en haut de la page du build
- Format : "Duration: Xm Ys"

**Temps par stage :**
- Section "Pipeline Steps" ou "Stage View"
- Noter le temps de chaque stage

**Queue time :**
- Visible dans "Build History" : "Waiting in queue: Xs"
- Si pas visible, mettre 0

**Runner type :**
- Visible dans les logs : "Running on agent-xxx"
- Généralement : `local` ou nom de l'agent

**Artifacts :**
- Section "Artifacts" en bas de la page
- Nombre et taille totale

**Cache :**
- Vérifier dans les logs si cache a été utilisé
- Rechercher "Cache restored" ou "Cache saved"

### 4.3 Template de collecte Jenkins

```json
{
  "platform": "jenkins",
  "execution_id": "build_123",
  "timestamp": "2025-01-26T10:00:00Z",
  "branch": "main",
  "trigger": "manual",
  "duration": {
    "total": 218,
    "stages": {
      "lint_backend": 15,
      "lint_frontend": 12,
      "test_backend": 18,
      "test_frontend": 16,
      "build_frontend": 20,
      "e2e_tests": 120,
      "deploy": 5
    }
  },
  "resources": {
    "cpu_usage_percent": 0,
    "memory_usage_mb": 0,
    "network_usage_mb": 0
  },
  "success": true,
  "errors": [],
  "queue_time": 0,
  "runner_type": "local",
  "artifacts": {
    "count": 3,
    "total_size_mb": 10.2
  },
  "cache": {
    "hit": true,
    "size_mb": 180
  }
}
```

## Étape 5 : Organisation des fichiers

### 5.1 Structure recommandée

```
results/performance/
├── github/
│   ├── run_001.json
│   ├── run_002.json
│   ├── ...
│   └── run_010.json
├── gitlab/
│   ├── pipeline_001.json
│   ├── pipeline_002.json
│   ├── ...
│   └── pipeline_010.json
└── jenkins/
    ├── build_001.json
    ├── build_002.json
    ├── ...
    └── build_010.json
```

### 5.2 Nommage des fichiers

- GitHub : `github_run_001.json`, `github_run_002.json`, etc.
- GitLab : `gitlab_pipeline_001.json`, `gitlab_pipeline_002.json`, etc.
- Jenkins : `jenkins_build_001.json`, `jenkins_build_002.json`, etc.

## Étape 6 : Vérification des données

### 6.1 Vérifier chaque fichier

- ✅ Tous les champs obligatoires sont présents
- ✅ Les temps sont en secondes (pas en minutes)
- ✅ Les timestamps sont au format ISO 8601
- ✅ Le JSON est valide (pas d'erreurs de syntaxe)

### 6.2 Script de validation

Utilisez le script `scripts/validate-data.py` pour valider vos données.

## Étape 7 : Consolidation

### 7.1 Créer des fichiers consolidés

Une fois toutes les données collectées, créez des fichiers consolidés :

- `results/performance/github_all.json` : Toutes les exécutions GitHub
- `results/performance/gitlab_all.json` : Toutes les exécutions GitLab
- `results/performance/jenkins_all.json` : Toutes les exécutions Jenkins

### 7.2 Format consolidé

```json
{
  "platform": "github",
  "total_executions": 10,
  "executions": [
    { ... },
    { ... },
    ...
  ]
}
```

## Checklist de Collecte

### GitHub Actions (10 exécutions)
- [ ] Exécution 1 collectée
- [ ] Exécution 2 collectée
- [ ] Exécution 3 collectée
- [ ] Exécution 4 collectée
- [ ] Exécution 5 collectée
- [ ] Exécution 6 collectée
- [ ] Exécution 7 collectée
- [ ] Exécution 8 collectée
- [ ] Exécution 9 collectée
- [ ] Exécution 10 collectée

### GitLab CI (10 exécutions)
- [ ] Pipeline 1 collecté
- [ ] Pipeline 2 collecté
- [ ] Pipeline 3 collecté
- [ ] Pipeline 4 collecté
- [ ] Pipeline 5 collecté
- [ ] Pipeline 6 collecté
- [ ] Pipeline 7 collecté
- [ ] Pipeline 8 collecté
- [ ] Pipeline 9 collecté
- [ ] Pipeline 10 collecté

### Jenkins (10 exécutions)
- [ ] Build 1 collecté
- [ ] Build 2 collecté
- [ ] Build 3 collecté
- [ ] Build 4 collecté
- [ ] Build 5 collecté
- [ ] Build 6 collecté
- [ ] Build 7 collecté
- [ ] Build 8 collecté
- [ ] Build 9 collecté
- [ ] Build 10 collecté

## Prochaines Étapes

Une fois les données collectées :

1. ✅ Valider les données avec `scripts/validate-data.py`
2. ✅ Consolider les fichiers avec `scripts/consolidate-data.py`
3. ✅ Calculer les statistiques avec `scripts/advanced-statistics.py`
4. ✅ Générer les visualisations avec `scripts/generate-visualizations.py`
5. ✅ Calculer les coûts avec `scripts/calculate-costs.py`

## Conseils

- **Collectez au fur et à mesure** : Ne pas attendre d'avoir 10 exécutions pour commencer
- **Soyez précis** : Les temps doivent être exacts (en secondes)
- **Documentez les anomalies** : Si une exécution est anormale, notez-le dans le champ `errors`
- **Variez les conditions** : Essayez d'avoir des exécutions sur différentes branches, à différents moments
- **Vérifiez régulièrement** : Validez vos données au fur et à mesure pour éviter les erreurs

## Temps estimé

- **Par exécution** : 5-10 minutes
- **Total pour 30 exécutions** : 2.5-5 heures
- **Avec pauses** : 1-2 jours

Bon courage ! 🚀

