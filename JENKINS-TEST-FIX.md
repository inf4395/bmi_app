# Correction des rapports de tests JUnit pour Jenkins

## Problème
Jenkins ne trouve pas les fichiers de résultats de tests JUnit (`test-results.xml`).

## Solution

### Backend (Jest)
1. **Installer jest-junit** :
   ```bash
   cd backend
   npm install --save-dev jest-junit
   ```

2. **Configuration mise à jour** : `backend/jest.config.js` a été mis à jour pour générer `test-results.xml`

### Frontend (Vitest)
1. **Vitest a un reporter JUnit intégré** - pas besoin d'installer de package supplémentaire

2. **Configuration mise à jour** : `frontend/vite.config.js` a été mis à jour pour générer `test-results.xml`

## Installation des dépendances

Après avoir mis à jour les fichiers, exécutez :

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## Vérification

Après avoir installé les dépendances, vous pouvez tester localement :

```bash
# Backend
cd backend
npm test
# Vérifiez que test-results.xml est créé

# Frontend
cd frontend
npm test
# Vérifiez que test-results.xml est créé
```

## Fichiers générés

- **Backend** : `backend/test-results.xml`
- **Frontend** : `frontend/test-results.xml`

Ces fichiers seront automatiquement détectés par Jenkins lors de l'exécution du pipeline.

