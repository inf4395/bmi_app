# Guide des Tests - BMI App

Ce document explique comment exécuter les différents types de tests de l'application BMI.

## 📋 Types de Tests

### 1. Unit Tests (Backend)
Tests unitaires pour les fonctions individuelles.

**Localisation:** `backend/tests/`

**Exécution:**
```bash
cd backend
npm test
```

**Tests disponibles:**
- `calculateBMI.test.js` - Tests de la fonction de calcul BMI
- `auth.test.js` - Tests d'authentification
- `stats.test.js` - Tests de statistiques

### 2. Integration Tests (Backend)
Tests d'intégration pour les routes API.

**Localisation:** `backend/tests/`

**Exécution:**
```bash
cd backend
npm test
```

**Tests disponibles:**
- `bmi.test.js` - Tests des routes BMI (POST, GET, PUT, DELETE)
- `auth.test.js` - Tests des routes d'authentification
- `stats.test.js` - Tests des routes de statistiques

### 3. Unit Tests (Frontend)
Tests unitaires pour les composants React.

**Localisation:** `frontend/src/**/__tests__/`

**Exécution:**
```bash
cd frontend
npm test
```

**Tests disponibles:**
- `AuthContext.test.jsx` - Tests du contexte d'authentification
- `Login.test.jsx` - Tests de la page de connexion
- `Register.test.jsx` - Tests de la page d'inscription
- `Navigation.test.jsx` - Tests du composant de navigation
- `ProtectedRoute.test.jsx` - Tests de la route protégée

### 4. E2E Tests (End-to-End)
Tests end-to-end avec Playwright.

**Localisation:** `e2e/`

**Exécution:**
```bash
# Installer Playwright (première fois seulement)
npx playwright install

# Lancer tous les tests E2E
npm run test:e2e

# Lancer avec interface graphique
npm run test:e2e:ui

# Lancer en mode visible (headed)
npm run test:e2e:headed
```

**Tests disponibles:**
- `auth.spec.js` - Tests du flux d'authentification (inscription, connexion)
- `bmi-flow.spec.js` - Tests du flux BMI (calcul, statistiques, programmes)
- `navigation.spec.js` - Tests de navigation entre les pages

## 🚀 Exécution Complète

Pour exécuter tous les tests:

```bash
# Backend tests
cd backend && npm test && cd ..

# Frontend tests
cd frontend && npm test && cd ..

# E2E tests (nécessite que les serveurs soient démarrés)
npm run test:e2e
```

## 📊 Couverture de Code

Pour voir la couverture de code:

```bash
# Backend
cd backend
npm test -- --coverage

# Frontend
cd frontend
npm test -- --coverage
```

## 🔧 Configuration CI/CD

Les tests sont automatiquement exécutés dans:
- **GitHub Actions** (`.github/workflows/ci.yml`)
- **GitLab CI** (`.gitlab-ci.yml`)
- **Jenkins** (`Jenkinsfile`)

## 📝 Notes

- Les tests E2E nécessitent que les serveurs backend et frontend soient démarrés
- Playwright démarre automatiquement les serveurs si configuré dans `playwright.config.js`
- Les tests utilisent des bases de données de test séparées

