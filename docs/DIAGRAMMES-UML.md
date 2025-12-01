# Diagrammes UML - Application BMI

Ce document récapitule tous les diagrammes UML disponibles pour l'application BMI et les pipelines CI/CD.

## 📊 Vue d'ensemble

### Diagrammes d'Architecture
1. **Architecture de l'Application** - Structure complète frontend/backend/database
2. **Flux d'Authentification** - Séquence d'authentification utilisateur
3. **Flux de Calcul BMI** - Séquence de calcul et enregistrement BMI

### Diagrammes CI/CD
4. **Structure des Pipelines** - Comparaison GitHub Actions, GitLab CI, Jenkins
5. **Exécution du Pipeline** - Séquence d'exécution complète

## 📁 Fichiers disponibles

### Architecture de l'Application

#### Format PlantUML
- `uml-application-architecture.puml` - Diagramme de composants complet

#### Format Mermaid
- `uml-application-architecture.mermaid` - Visualisation GitHub/GitLab
- `uml-sequence-authentication.mermaid` - Flux d'authentification
- `uml-sequence-bmi-calculation.mermaid` - Flux de calcul BMI

### Pipelines CI/CD

#### Format PlantUML
- `uml-pipeline-structure.puml` - Structure comparative des pipelines

#### Format Mermaid
- `uml-pipeline-structure.mermaid` - Visualisation GitHub/GitLab
- `uml-sequence-pipeline-execution.mermaid` - Exécution du pipeline

## 🎯 Utilisation dans la thèse

### Pour l'architecture de l'application
- **Diagramme de composants** : Illustrer la séparation frontend/backend/database
- **Diagrammes de séquence** : Expliquer les flux d'authentification et de calcul BMI
- **Relations** : Montrer les interactions entre les modules

### Pour la comparaison CI/CD
- **Structure des pipelines** : Comparer visuellement les 3 plateformes
- **Exécution** : Expliquer le flux d'exécution étape par étape
- **Différences** : Mettre en évidence les différences (Docker Build désactivé sur GitLab)

## 🔍 Détails des diagrammes

### 1. Architecture de l'Application

**Composants principaux :**
- **Frontend** : React Router, AuthContext, Pages (Login, Register, Dashboard, BMI, Statistics, Programs, Profile)
- **Backend** : Express Server, Routes (Auth, BMI, Stats), Middleware (JWT), Utils
- **Database** : SQLite avec 4 tables (users, bmi_records, weight_goals, user_programs)

**Relations :**
- Frontend ↔ Backend : Communication HTTP/REST API
- Backend ↔ Database : Requêtes SQL
- Users → BMI Records : Relation 1-N (user_id)

### 2. Flux d'Authentification

**Étapes :**
1. Utilisateur saisit email/password
2. LoginPage appelle AuthContext
3. AuthContext envoie requête POST /api/auth/login
4. Backend vérifie les credentials dans la database
5. Backend génère un JWT token
6. Token stocké dans LocalStorage
7. Redirection vers /dashboard

### 3. Flux de Calcul BMI

**Étapes :**
1. Utilisateur saisit height/weight
2. BmiCalculator valide les inputs
3. Récupération du token JWT depuis AuthContext
4. Envoi POST /api/bmi avec token
5. Backend vérifie le token (AuthMiddleware)
6. Calcul du BMI (calculateBMI)
7. Enregistrement dans la database
8. Affichage du résultat

### 4. Structure des Pipelines CI/CD

**Stages communs :**
1. **Lint** : Backend + Frontend (parallèle)
2. **Test** : Backend + Frontend (parallèle)
3. **Build** : Build frontend
4. **E2E** : Tests end-to-end (3 navigateurs)
5. **Docker** : Build images (GitHub Actions ✅, GitLab CI ❌, Jenkins ✅)
6. **Deploy** : Staging + Production (simulation)

**Différences notables :**
- GitLab CI : Docker Build désactivé (Docker-in-Docker non disponible)
- GitLab CI & Jenkins : Déploiement manuel
- GitHub Actions : Déploiement automatique (simulation)

### 5. Exécution du Pipeline

**Séquence :**
1. Developer push code → Git Repository
2. Trigger pipeline → CI/CD Platform
3. Lint jobs (parallèle)
4. Test jobs (parallèle) + Coverage
5. Build frontend
6. E2E tests (start servers + run tests)
7. Docker build (si activé)
8. Deploy (simulation)

## 📝 Notes pour la thèse

### Points à mentionner
1. **Architecture modulaire** : Séparation claire frontend/backend/database
2. **Authentification JWT** : Token-based authentication pour la sécurité
3. **Pipelines équivalents** : Même structure sur les 3 plateformes (sauf Docker Build)
4. **Tests complets** : Unit, Integration, E2E, Performance, Security, Accessibility
5. **Déploiement simulé** : Pas de déploiement réel pour la comparaison

### Comparaison CI/CD
- **GitHub Actions** : Configuration YAML, intégration native
- **GitLab CI** : Configuration YAML, Docker-in-Docker non disponible
- **Jenkins** : Configuration Groovy (Jenkinsfile), plus flexible mais plus complexe

## 🛠️ Outils de visualisation

Voir `README-UML.md` pour les instructions détaillées de visualisation.

### Quick Start
1. **VS Code** : Installer extension PlantUML ou Mermaid
2. **En ligne** : 
   - PlantUML : http://www.plantuml.com/plantuml/uml/
   - Mermaid : https://mermaid.live/
3. **GitHub/GitLab** : Les fichiers `.mermaid` sont rendus automatiquement dans Markdown

