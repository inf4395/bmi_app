# CI/CD Configuration - BMI App

Ce document décrit la configuration CI/CD pour les 3 plateformes : GitLab CI, GitHub Actions et Jenkins.

## 📋 Vue d'ensemble

Le pipeline CI/CD comprend les étapes suivantes :

1. **Install** - Installation des dépendances
2. **Lint** - Vérification du code (ESLint)
3. **Test** - Tests unitaires et d'intégration
4. **Build** - Build du frontend
5. **E2E** - Tests end-to-end avec Playwright
6. **Docker** - Build des images Docker
7. **Deploy** - Déploiement (staging/production)

## 🔵 GitLab CI

### Configuration
Fichier : `.gitlab-ci.yml`

### Variables d'environnement requises
Dans GitLab : Settings → CI/CD → Variables

- `CI_REGISTRY_USER` - Nom d'utilisateur du registre Docker
- `CI_REGISTRY_PASSWORD` - Mot de passe du registre Docker
- `JWT_SECRET` - Secret JWT pour la production (optionnel)

### Exécution
Le pipeline s'exécute automatiquement sur :
- Push vers `main` ou `develop`
- Merge requests vers `main` ou `develop`

### Commandes manuelles
```bash
# Lancer le pipeline manuellement
git push origin main
```

## 🟢 GitHub Actions

### Configuration
Fichier : `.github/workflows/ci.yml`

### Secrets requis
Dans GitHub : Settings → Secrets and variables → Actions

- `DOCKER_USERNAME` - Nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` - Mot de passe Docker Hub
- `JWT_SECRET` - Secret JWT pour la production (optionnel)

### Exécution
Le workflow s'exécute automatiquement sur :
- Push vers `main`, `develop` ou `feature/*`
- Pull requests vers `main` ou `develop`
- Déclenchement manuel (workflow_dispatch)

### Commandes manuelles
```bash
# Via l'interface GitHub
Actions → BMI App CI/CD → Run workflow
```

## 🟠 Jenkins

### Configuration
Fichier : `Jenkinsfile`

### Prérequis
1. Installer les plugins suivants dans Jenkins :
   - Pipeline
   - HTML Publisher
   - JUnit
   - Docker Pipeline

2. Configurer les credentials :
   - `docker-registry-credentials` - Credentials Docker (optionnel)

### Création du pipeline
1. New Item → Pipeline
2. Dans "Pipeline", sélectionner "Pipeline script from SCM"
3. SCM : Git
4. Repository URL : URL de votre repo
5. Script Path : `Jenkinsfile`

### Exécution
Le pipeline s'exécute automatiquement sur :
- Push vers `main` ou `develop`
- Déclenchement manuel

## 🐳 Docker Compose

### Fichiers disponibles

- `docker-compose.yml` - Configuration de développement
- `docker-compose.staging.yml` - Configuration staging
- `docker-compose.prod.yml` - Configuration production

### Utilisation

```bash
# Développement
docker-compose up --build

# Staging
docker-compose -f docker-compose.staging.yml up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Rapports et Artifacts

### GitLab CI
- Rapports de tests : `backend/test-results.xml`, `frontend/test-results.xml`
- Coverage : `backend/coverage/`, `frontend/coverage/`
- E2E : `playwright-report/`

### GitHub Actions
- Artifacts téléchargeables dans l'onglet Actions
- Coverage reports
- E2E test reports

### Jenkins
- Rapports HTML dans l'interface Jenkins
- Artifacts archivés
- Console logs

## 🔐 Sécurité

### Variables sensibles
Ne jamais commiter :
- Secrets JWT
- Mots de passe
- Clés API
- Credentials Docker

Utiliser les variables d'environnement/secrets de chaque plateforme.

## 🚀 Déploiement

### Staging
- Déploiement automatique sur `develop`
- URL : `https://staging.bmi-app.example.com`

### Production
- Déploiement manuel sur `main`
- URL : `https://bmi-app.example.com`
- Confirmation requise avant déploiement

## 📝 Notes

- Les tests E2E nécessitent que les serveurs backend et frontend soient démarrés
- Le build Docker est uniquement effectué sur `main` et `develop`
- Le déploiement en production nécessite une confirmation manuelle

