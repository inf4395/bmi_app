# Comparaison des Plateformes CI/CD

Ce document compare les configurations CI/CD pour GitHub Actions, GitLab CI et Jenkins sur la base de l'application BMI.

## Vue d'ensemble

Les trois plateformes exécutent les mêmes tests et étapes pour permettre une comparaison équitable :

1. **Lint** : Vérification du code (backend et frontend)
2. **Tests** : Tests unitaires et d'intégration (backend et frontend)
3. **Build** : Construction de l'application frontend
4. **E2E Tests** : Tests end-to-end avec Playwright (chromium, firefox, webkit)
5. **Docker Build** : Construction des images Docker
6. **Deploy** : Déploiement en staging/production

## Structure des Pipelines

### GitHub Actions (`.github/workflows/ci.yml`)

**Caractéristiques :**
- Format YAML déclaratif
- Jobs parallèles pour lint et tests
- Utilisation d'actions pré-construites
- Artifacts pour stocker les résultats
- Déclenchement sur push, PR et workflow_dispatch

**Jobs :**
- `backend-lint` : Lint backend
- `frontend-lint` : Lint frontend
- `backend-test` : Tests backend avec couverture
- `frontend-test` : Tests frontend avec couverture
- `build-frontend` : Build frontend
- `e2e-tests` : Tests E2E avec Playwright
- `docker-build` : Build et push Docker images
- `deploy-staging` : Déploiement staging (develop)
- `deploy-production` : Déploiement production (main)

### GitLab CI (`.gitlab-ci.yml`)

**Caractéristiques :**
- Format YAML déclaratif
- Stages séquentiels avec parallélisation dans les stages
- Utilisation d'images Docker
- Cache pour les dépendances npm
- Artifacts pour stocker les résultats
- Déclenchement sur push, merge requests et branches

**Stages :**
- `lint` : Lint backend et frontend (parallèle)
- `test` : Tests backend et frontend (parallèle)
- `build` : Build frontend
- `e2e` : Tests E2E avec Playwright
- `docker` : Build Docker images (backend et frontend en parallèle)
- `deploy` : Déploiement staging/production (manuel)

### Jenkins (`Jenkinsfile`)

**Caractéristiques :**
- Format Groovy déclaratif
- Pipeline déclaratif avec stages
- Parallélisation explicite avec `parallel`
- Plugins pour rapports (JUnit, HTML Publisher)
- Déclenchement sur push et branches

**Stages :**
- `Install Dependencies` : Installation parallèle (backend, frontend, root)
- `Lint` : Lint backend et frontend (parallèle)
- `Test` : Tests backend et frontend (parallèle)
- `Build` : Build frontend
- `E2E Tests` : Tests E2E avec Playwright
- `Docker Build` : Build et push Docker images
- `Deploy` : Déploiement staging/production (avec input pour production)

## Comparaison Détaillée

### 1. Configuration et Syntaxe

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Format | YAML | YAML | Groovy (Declarative Pipeline) |
| Complexité | Moyenne | Moyenne | Élevée |
| Courbe d'apprentissage | Faible | Faible | Moyenne |
| Documentation | Excellente | Excellente | Bonne |

### 2. Exécution et Parallélisation

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Parallélisation | Jobs parallèles | Stages avec jobs parallèles | Stages avec parallel blocks |
| Matrices | ✅ Supporté | ✅ Supporté | ⚠️ Via plugins |
| Conditions | ✅ `if:` | ✅ `only:` / `except:` | ✅ `when:` |
| Dépendances | ✅ `needs:` | ✅ `dependencies:` | ✅ Implicite par stages |

### 3. Gestion des Secrets

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Stockage | GitHub Secrets | GitLab CI/CD Variables | Jenkins Credentials |
| Accès | `${{ secrets.NAME }}` | `$VARIABLE_NAME` | `credentials('id')` |
| Masquage | ✅ Automatique | ✅ Automatique | ✅ Automatique |

### 4. Artifacts et Rapports

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Artifacts | ✅ Actions upload-artifact | ✅ Artifacts intégrés | ✅ Plugins |
| Rétention | Configurable (jours) | Configurable (jours) | Configurable |
| Rapports | Via actions | Intégré | Via plugins (JUnit, HTML) |

### 5. Intégration Docker

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Build | ✅ Actions docker/build-push | ✅ Image docker:dind | ✅ Docker installé |
| Registry | ✅ Actions docker/login | ✅ Variables CI_REGISTRY | ✅ Credentials |
| Cache | ✅ Cache layers | ✅ Cache layers | ⚠️ Via plugins |

### 6. Tests E2E avec Playwright

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Installation | `npx playwright install` | `npx playwright install` | `npx playwright install` |
| Navigateurs | chromium, firefox, webkit | chromium, firefox, webkit | chromium, firefox, webkit |
| Services | Services en arrière-plan | Services Docker | Services en arrière-plan |
| Rapports | Artifacts | Artifacts | HTML Publisher Plugin |

### 7. Déploiement

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Environnements | ✅ Environments | ✅ Environments | ⚠️ Via plugins |
| Approbation | ✅ Review required | ✅ Manual deployment | ✅ Input step |
| Rollback | ⚠️ Via scripts | ⚠️ Via scripts | ⚠️ Via scripts |

### 8. Coûts et Ressources

| Aspect | GitHub Actions | GitLab CI | Jenkins |
|--------|---------------|-----------|---------|
| Hébergement | Cloud (payant) | Cloud/Self-hosted | Self-hosted |
| Minutes gratuites | 2000/min/mois (public) | 400 min/mois (free) | Illimité (self-hosted) |
| Scalabilité | ✅ Auto-scaling | ✅ Auto-scaling | ⚠️ Manuel |

## Métriques de Performance (à mesurer)

Pour une comparaison complète, mesurer :

1. **Temps d'exécution total** : Temps de bout en bout du pipeline
2. **Temps par stage** : Lint, Tests, Build, E2E, Docker
3. **Utilisation des ressources** : CPU, RAM, Disque
4. **Coûts** : Coûts d'exécution (si applicable)
5. **Taux de succès** : Pourcentage de pipelines réussis
6. **Temps de récupération** : En cas d'échec

## Commandes pour Exécuter les Tests

### GitHub Actions
```bash
# Déclenchement automatique sur push/PR
git push origin main

# Déclenchement manuel
gh workflow run "BMI App CI/CD"
```

### GitLab CI
```bash
# Déclenchement automatique sur push/merge request
git push origin main

# Déclenchement manuel via l'interface GitLab
# Ou via API
```

### Jenkins
```bash
# Déclenchement automatique via webhook
git push origin main

# Déclenchement manuel
# Via l'interface Jenkins ou CLI
jenkins-cli build BMI-App-Pipeline
```

## Configuration Requise

### GitHub Actions
- Repository GitHub
- Secrets configurés (DOCKER_USERNAME, DOCKER_PASSWORD)

### GitLab CI
- Projet GitLab
- Runner configuré (shared ou spécifique)
- Variables CI/CD configurées (CI_REGISTRY_USER, CI_REGISTRY_PASSWORD)

### Jenkins
- Instance Jenkins installée
- Plugins installés :
  - Pipeline
  - Docker Pipeline
  - HTML Publisher
  - JUnit
- Credentials configurés (docker-registry-credentials)
- Node.js et Docker installés sur l'agent

## Conclusion

Les trois plateformes permettent d'exécuter les mêmes tests et étapes. Le choix dépend de :
- **Budget** : GitHub Actions (payant), GitLab CI (gratuit limité), Jenkins (gratuit self-hosted)
- **Complexité** : GitHub Actions/GitLab CI (simple), Jenkins (plus complexe)
- **Intégration** : GitHub Actions (intégré GitHub), GitLab CI (intégré GitLab), Jenkins (indépendant)
- **Contrôle** : Jenkins (contrôle total), GitLab CI (self-hosted possible), GitHub Actions (cloud uniquement)

