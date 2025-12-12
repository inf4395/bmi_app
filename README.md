# BMI-Rechner Anwendung

Eine moderne Web-Anwendung zur Berechnung und Verwaltung des Body Mass Index (BMI) mit Benutzerauthentifizierung, Statistiken und Programmen.

##  Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [API-Dokumentation](#api-dokumentation)
- [Projektstruktur](#projektstruktur)
- [Tests](#tests)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Entwicklung](#entwicklung)
- [Lizenz](#lizenz)

##  Überblick

Die BMI-Rechner Anwendung ist eine Full-Stack Web-Anwendung, die es Benutzern ermöglicht:

- **BMI berechnen**: Berechnung des Body Mass Index basierend auf Gewicht und Größe
- **Daten speichern**: Automatische Speicherung aller BMI-Berechnungen
- **Statistiken anzeigen**: Visualisierung der BMI-Verlauf mit Diagrammen
- **Programme verwalten**: Erstellung und Verwaltung von Gewichtsprogrammen
- **Profil verwalten**: Aktualisierung persönlicher Informationen

Die Anwendung besteht aus einem React-Frontend und einem Express.js-Backend mit SQLite-Datenbank.

## ✨ Features

### Authentifizierung
- ✅ Benutzerregistrierung mit E-Mail und Passwort
- ✅ Anmeldung mit JWT-basierter Authentifizierung
- ✅ Geschützte Routen für authentifizierte Benutzer
- ✅ Automatische Token-Verwaltung im localStorage

### BMI-Funktionalität
- ✅ BMI-Berechnung mit Validierung
- ✅ Kategorisierung (Untergewicht, Normalgewicht, Übergewicht, Adipositas)
- ✅ Speicherung aller Berechnungen in der Datenbank
- ✅ Historie der BMI-Berechnungen
- ✅ Aktualisierung bestehender Einträge

### Statistiken
- ✅ Übersicht der BMI-Statistiken
- ✅ Detaillierte Statistiken mit Diagrammen
- ✅ Visualisierung des BMI-Verlaufs über die Zeit

### Programme
- ✅ Erstellung von Gewichtsprogrammen
- ✅ Verwaltung von Programmen
- ✅ Verfolgung von Zielen

### Benutzerprofil
- ✅ Anzeige persönlicher Informationen
- ✅ Aktualisierung des Profils
- ✅ Verwaltung von Größe, Geschlecht und Geburtsdatum

## 🛠 Technologie-Stack

### Frontend
- **React 19.1.1** - UI-Bibliothek
- **Vite 7.1.7** - Build-Tool und Dev-Server
- **React Router DOM 7.0.2** - Routing
- **Recharts 2.12.7** - Diagramm-Bibliothek
- **Vitest** - Unit-Testing
- **ESLint** - Code-Linting

### Backend
- **Node.js** - Laufzeitumgebung
- **Express.js 5.1.0** - Web-Framework
- **SQLite 5.1.7** - Datenbank
- **JWT (jsonwebtoken)** - Authentifizierung
- **bcryptjs** - Passwort-Hashing
- **Jest** - Testing-Framework
- **Supertest** - API-Testing

### DevOps & Tools
- **Docker** - Containerisierung
- **Docker Compose** - Multi-Container-Orchestrierung
- **GitHub Actions** - CI/CD-Pipeline (Cloud)
- **GitLab CI** - CI/CD-Pipeline (Cloud/Self-hosted)
- **Jenkins** - CI/CD-Pipeline (Self-hosted)
- **Playwright** - End-to-End-Tests
- **Nginx** - Reverse Proxy (Production)

## 📦 Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie folgende Software installiert haben:

- **Node.js** (Version 18 oder höher)
- **npm** (Version 9 oder höher)
- **Docker** (optional, für Containerisierung)
- **Docker Compose** (optional, für Multi-Container-Setup)

## 🚀 Installation

### 1. Repository klonen

```bash
git clone <repository-url>
cd bmi_app
```

### 2. Backend installieren

```bash
cd backend
npm install
```

### 3. Frontend installieren

```bash
cd ../frontend
npm install
```

### 4. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env` Datei im Frontend-Verzeichnis:

```env
VITE_API_URL=http://localhost:3000/api
```

Für das Backend können Sie optional eine `.env` Datei erstellen:

```env
PORT=3000
JWT_SECRET=your-secret-key-here
```

## 💻 Verwendung

### Entwicklungsumgebung

#### Backend starten

```bash
cd backend
npm run dev
```

Das Backend läuft auf `http://localhost:3000`

#### Frontend starten

```bash
cd frontend
npm run dev
```

Das Frontend läuft auf `http://localhost:5173`

### Produktionsumgebung

#### Mit Docker Compose

```bash
# Alle Services bauen und starten
docker-compose build
docker-compose up -d

# Services stoppen
docker-compose down
```

Die Anwendung ist dann verfügbar unter:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

#### Manueller Build

```bash
# Frontend bauen
cd frontend
npm run build

# Backend starten
cd ../backend
npm start
```

## 📚 API-Dokumentation

### Authentifizierung

#### Registrierung
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "password": "sicheresPasswort123"
}
```

#### Anmeldung
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "max@example.com",
  "password": "sicheresPasswort123"
}
```

**Antwort:**
```json
{
  "user": {
    "id": 1,
    "name": "Max Mustermann",
    "email": "max@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Aktueller Benutzer
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### BMI-Endpunkte

#### BMI berechnen
```http
POST /api/bmi
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "age": 30,
  "height": 180,
  "weight": 75
}
```

**Antwort:**
```json
{
  "id": 1,
  "name": "Max Mustermann",
  "email": "max@example.com",
  "bmi": "23.1",
  "status": "Normalgewicht"
}
```

#### BMI-Historie abrufen
```http
GET /api/history?limit=10
Authorization: Bearer <token>
```

#### BMI-Eintrag aktualisieren
```http
PUT /api/bmi/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "height": 180,
  "weight": 73
}
```

### Statistiken

#### Zusammenfassung
```http
GET /api/stats/summary
Authorization: Bearer <token>
```

#### Detaillierte Statistiken
```http
GET /api/stats/detailed
Authorization: Bearer <token>
```

### Health Check

```http
GET /api/health
```

**Antwort:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## 📁 Projektstruktur

```
bmi_app/
├── backend/                 # Backend-Anwendung
│   ├── db.js               # Datenbank-Initialisierung
│   ├── server.js           # Express-Server
│   ├── middleware/         # Middleware (Auth)
│   ├── routes/             # API-Routen
│   │   ├── authRoutes.js
│   │   ├── bmiRoutes.js
│   │   ├── statsRoutes.js
│   │   └── testRoutes.js
│   ├── utils/              # Hilfsfunktionen
│   │   └── calculateBMI.js
│   ├── tests/              # Backend-Tests
│   └── package.json
│
├── frontend/               # Frontend-Anwendung
│   ├── src/
│   │   ├── components/    # React-Komponenten
│   │   ├── pages/         # Seiten-Komponenten
│   │   ├── context/       # React Context (Auth)
│   │   └── assets/        # Statische Assets
│   ├── public/            # Öffentliche Dateien
│   ├── dist/              # Build-Ausgabe
│   └── package.json
│
├── e2e/                   # End-to-End-Tests
│   ├── auth.spec.js
│   ├── bmi-flow.spec.js
│   └── navigation.spec.js
│
├── docs/                  # Dokumentation
│   ├── ARCHITEKTUR-UML.puml
│   └── ...
│
├── scripts/               # Utility-Skripte
├── docker-compose.yml     # Docker Compose Konfiguration
├── .github/               # GitHub Actions Workflows
│   └── workflows/
│       └── ci.yml        # GitHub Actions CI/CD
├── .gitlab-ci.yml        # GitLab CI/CD Pipeline
├── Jenkinsfile          # Jenkins CI/CD Pipeline
└── README.md            # Diese Datei
```

## 🧪 Tests

### Backend-Tests ausführen

```bash
cd backend
npm test
```

### Frontend-Tests ausführen

```bash
cd frontend
npm test
```

### End-to-End-Tests ausführen

```bash
# Alle E2E-Tests
npm run test:e2e

# Mit UI
npm run test:e2e:ui

# Im Headed-Modus
npm run test:e2e:headed
```

### Alle Tests ausführen

```bash
npm run test:all
```

### Test-Coverage

Die Test-Coverage-Berichte werden automatisch generiert:
- Backend: `backend/coverage/`
- Frontend: `frontend/coverage/`

## 🐳 Docker

### Docker-Images bauen

```bash
# Backend
cd backend
docker build -t bmi-backend .

# Frontend
cd frontend
docker build -t bmi-frontend .
```

### Docker Compose Umgebungen

Die Anwendung unterstützt verschiedene Docker Compose-Konfigurationen:

- **docker-compose.yml** - Standard-Konfiguration
- **docker-compose.dev.yml** - Entwicklungsumgebung
- **docker-compose.staging.yml** - Staging-Umgebung
- **docker-compose.prod.yml** - Produktionsumgebung

```bash
# Entwicklungsumgebung
docker-compose -f docker-compose.dev.yml up

# Staging-Umgebung
docker-compose -f docker-compose.staging.yml up

# Produktionsumgebung
docker-compose -f docker-compose.prod.yml up
```

## 🔄 CI/CD

Die Anwendung unterstützt drei CI/CD-Plattformen für Continuous Integration und Continuous Deployment:

- **GitHub Actions** - Cloud-basierte CI/CD-Lösung
- **GitLab CI** - Integrierte CI/CD-Pipeline
- **Jenkins** - Self-hosted CI/CD-Server

### Pipeline-Stages

Alle drei Plattformen führen die folgenden Schritte aus:

1. **Lint-Stage**: Code-Linting für Frontend und Backend
2. **Test-Stage**: Unit-Tests für Frontend und Backend
3. **Build-Stage**: Build der Frontend-Anwendung
4. **E2E-Test-Stage**: End-to-End-Tests mit Playwright
5. **Deploy-Stage**: Deployment auf den Zielserver

### GitHub Actions

**Konfigurationsdatei**: `.github/workflows/ci.yml`

- Automatische Ausführung bei Push und Pull Requests
- Unterstützt manuelle Auslösung (workflow_dispatch)
- Integriert mit GitHub Secrets für sichere Credentials

### GitLab CI

**Konfigurationsdatei**: `.gitlab-ci.yml`

- Automatische Ausführung bei Push und Merge Requests
- Nutzt GitLab CI/CD-Variablen für Konfiguration
- Unterstützt Docker-Registry-Integration

### Jenkins

**Konfigurationsdatei**: `Jenkinsfile`

- Self-hosted Lösung mit vollständiger Kontrolle
- Unterstützt komplexe Pipeline-Konfigurationen
- Erweiterte Plugin-Unterstützung

### Weitere Informationen

Detaillierte Informationen zu allen drei Plattformen finden Sie in:
- `README-CICD.md` - Umfassende CI/CD-Dokumentation
- `README-CICD-COMPARISON.md` - Vergleich der CI/CD-Plattformen
- `JENKINS-SETUP.md` - Jenkins-Setup-Anleitung

## 🔧 Entwicklung

### Code-Stil

Die Anwendung verwendet ESLint für Code-Linting:

```bash
# Frontend linten
cd frontend
npm run lint
```

### Datenbank-Schema

Die SQLite-Datenbank enthält folgende Tabellen:

- **users**: Benutzerinformationen
- **bmi_records**: BMI-Berechnungen
- **weight_goals**: Gewichtsziele
- **user_programs**: Benutzerprogramme

Die Datenbank wird automatisch beim ersten Start des Backends initialisiert.

### Hot Module Replacement (HMR)

Das Frontend unterstützt Hot Module Replacement während der Entwicklung für schnelle Iterationen.

### API-Entwicklung

Das Backend unterstützt automatisches Neuladen mit `nodemon` im Entwicklungsmodus:

```bash
cd backend
npm run dev
```

## 📊 Architektur

Die Anwendung folgt einer klaren Trennung zwischen Frontend und Backend:

- **Frontend**: React-basierte Single-Page-Application (SPA)
- **Backend**: RESTful API mit Express.js
- **Datenbank**: SQLite für Datenspeicherung
- **Authentifizierung**: JWT-basierte Authentifizierung

Detaillierte Architekturdiagramme finden Sie in `docs/ARCHITEKTUR-UML.puml`.

## 🔒 Sicherheit

- ✅ Passwörter werden mit bcrypt gehasht
- ✅ JWT-Tokens für Authentifizierung
- ✅ CORS-Konfiguration für sichere Cross-Origin-Requests
- ✅ Eingabevalidierung auf Backend-Seite
- ✅ Geschützte Routen mit Middleware

## 📝 Weitere Dokumentation

- `docs/ARCHITEKTUR-UML.puml` - Architekturdiagramme
- `docs/ARCHITEKTUR-DIAGRAMM.md` - Architektur-Beschreibung
- `README-CICD.md` - CI/CD-Dokumentation
- `README-TESTS.md` - Test-Dokumentation
- `README-DOCKER-SECRETS.md` - Docker Secrets Management

## 🤝 Beitragen

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📄 Lizenz

Dieses Projekt ist Teil einer Bachelorarbeit und dient zu Bildungszwecken.

## 👤 Autor

Entwickelt im Rahmen einer Bachelorarbeit.

## 🙏 Danksagungen

- React-Team für das großartige Framework
- Express.js-Community für die umfassende Dokumentation
- Alle Open-Source-Contributors der verwendeten Bibliotheken

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: 2025

