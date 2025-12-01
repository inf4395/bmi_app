# Praktischer Leitfaden: KI-Unterstützung testen

## Übersicht

Dieser Leitfaden beschreibt, wie Sie die KI-Unterstützung in den drei CI/CD-Plattformen praktisch testen und dokumentieren können. Die Tests sollten messbar und reproduzierbar sein.

## Vorbereitung

### Benötigte Tools

1. **GitHub Copilot** (für GitHub Actions)
   - VS Code mit GitHub Copilot Extension
   - Oder GitHub Web Editor
   - Subscription erforderlich (kostenlos für Studenten)

2. **GitLab AI** (für GitLab CI)
   - GitLab Ultimate/Premium Account (falls verfügbar)
   - Oder externe KI-Tools (ChatGPT, Claude)

3. **Externe KI-Tools** (für Jenkins)
   - ChatGPT (OpenAI)
   - Claude (Anthropic)
   - Oder andere KI-Chat-Tools

## Test-Szenario 1: Pipeline-Konfiguration ohne KI

### Ziel
Basis-Messung für Vergleich

### Vorgehen

1. **Neues Repository erstellen** (oder Branch)
2. **Zeit messen**: Start-Stoppuhr starten
3. **Pipeline manuell konfigurieren**:
   - Dokumentation lesen
   - YAML/Groovy-Datei schreiben
   - Fehler beheben
   - Pipeline testen
4. **Zeit stoppen** und dokumentieren
5. **Fehler zählen**: Anzahl der Iterationen und Fehler notieren

### Zu dokumentieren
- Gesamtzeit (Minuten)
- Anzahl der Fehler
- Anzahl der Dokumentationsseiten konsultiert
- Anzahl der Iterationen bis zur funktionierenden Pipeline

## Test-Szenario 2: Pipeline-Konfiguration mit KI

### GitHub Actions mit Copilot

#### Setup
1. VS Code öffnen
2. GitHub Copilot Extension installieren und aktivieren
3. Neues Repository/Branch erstellen

#### Test 1: Code-Generierung aus Kommentar

**Schritt 1:** Neue Datei erstellen `.github/workflows/test-copilot.yml`

**Schritt 2:** Kommentar schreiben:
```yaml
# Create a GitHub Actions workflow that:
# - Runs on push to main branch
# - Installs Node.js 20
# - Runs npm ci and npm test in backend directory
# - Uploads test results as artifacts
```

**Schritt 3:** Copilot-Vorschläge akzeptieren/ablehnen

**Schritt 4:** Zeit messen und dokumentieren

**Zu dokumentieren:**
- Zeit bis zur ersten funktionierenden Pipeline
- Qualität des generierten Codes (1-5)
- Anzahl der Anpassungen nötig
- Funktioniert die Pipeline ohne Fehler?

#### Test 2: Auto-Vervollständigung

**Schritt 1:** Beginne mit:
```yaml
name: CI
on:
  push:
```

**Schritt 2:** Beobachte Copilot-Vorschläge

**Schritt 3:** Dokumentiere:
- Relevanz der Vorschläge (1-5)
- Geschwindigkeit der Vorschläge
- Korrektheit der Syntax

#### Test 3: Fehlerkorrektur

**Schritt 1:** Erstelle absichtlich Fehler:
```yaml
name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      # Fehler: fehlende working-directory
```

**Schritt 2:** Frage Copilot Chat: "Warum schlägt dieser Workflow fehl?"

**Schritt 3:** Dokumentiere:
- Erkennt Copilot den Fehler?
- Bietet es Lösungsvorschläge?
- Wie hilfreich sind die Vorschläge?

#### Test 4: Code-Erklärung

**Schritt 1:** Markiere einen Abschnitt der bestehenden Pipeline

**Schritt 2:** Frage Copilot Chat: "Erkläre mir diesen Workflow-Abschnitt"

**Schritt 3:** Dokumentiere:
- Klarheit der Erklärung (1-5)
- Vollständigkeit (1-5)
- Korrektheit (1-5)

### GitLab CI mit KI

#### Option A: GitLab AI (falls verfügbar)

**Test 1:** Code Suggestions
- Beginne mit `.gitlab-ci.yml`
- Beobachte AI-Vorschläge
- Dokumentiere Qualität und Relevanz

**Test 2:** Explain This Code
- Markiere Pipeline-Abschnitt
- Nutze "Explain" Feature
- Dokumentiere Qualität

#### Option B: Externe KI-Tools (ChatGPT/Claude)

**Test 1: Pipeline-Generierung**

**Prompt:**
```
Erstelle eine GitLab CI Pipeline (.gitlab-ci.yml) für eine Node.js-Anwendung mit:
- Lint-Stage für Backend und Frontend (parallel)
- Test-Stage für Backend und Frontend (parallel)
- Build-Stage für Frontend
- E2E-Tests mit Playwright
- Deploy-Stage (simuliert)

Verwende Node.js 20 und Docker-Images.
```

**Schritt 2:** Code in `.gitlab-ci.yml` einfügen

**Schritt 3:** Testen und anpassen

**Schritt 4:** Dokumentiere:
- Zeit bis zur funktionierenden Pipeline
- Qualität des generierten Codes
- Anzahl der Anpassungen

**Test 2: Fehlerbehebung**

**Schritt 1:** Stelle Pipeline-Fehler in ChatGPT/Claude vor

**Schritt 2:** Frage: "Warum schlägt diese GitLab CI Pipeline fehl?"

**Schritt 3:** Dokumentiere Qualität der Antworten

### Jenkins mit KI

#### Externe KI-Tools verwenden

**Test 1: Jenkinsfile-Generierung**

**Prompt an ChatGPT/Claude:**
```
Erstelle ein Jenkinsfile für eine Declarative Pipeline mit:
- Lint-Stage (Backend und Frontend parallel)
- Test-Stage (Backend und Frontend parallel)
- Build-Stage für Frontend
- E2E-Tests-Stage
- Docker-Build-Stage (optional)
- Deploy-Stage (simuliert)

Verwende Node.js 20 und Groovy-Syntax.
```

**Schritt 2:** Code in `Jenkinsfile` einfügen

**Schritt 3:** In Jenkins testen

**Schritt 4:** Dokumentiere:
- Zeit bis zur funktionierenden Pipeline
- Qualität des Groovy-Codes
- Anzahl der Anpassungen

**Test 2: Code-Erklärung**

**Schritt 1:** Stelle Jenkinsfile-Abschnitt in KI-Tool vor

**Schritt 2:** Frage: "Erkläre mir diesen Jenkinsfile-Abschnitt"

**Schritt 3:** Dokumentiere Qualität der Erklärung

## Vergleichsmessung

### Tabelle für Dokumentation

| Plattform | KI-Tool | Zeit ohne KI | Zeit mit KI | Zeitersparnis | Fehler ohne KI | Fehler mit KI | Qualität Code (1-5) |
|-----------|---------|--------------|-------------|---------------|----------------|---------------|---------------------|
| GitHub Actions | Copilot | X min | Y min | Z% | N | M | X |
| GitLab CI | ChatGPT | X min | Y min | Z% | N | M | X |
| Jenkins | Claude | X min | Y min | Z% | N | M | X |

### Qualitative Bewertung (1-5 Skala)

| Kriterium | GitHub Actions | GitLab CI | Jenkins |
|-----------|----------------|-----------|---------|
| Verfügbarkeit | | | |
| Code-Generierung | | | |
| Auto-Vervollständigung | | | |
| Fehlererkennung | | | |
| Code-Erklärung | | | |
| Benutzerfreundlichkeit | | | |

## Praktisches Beispiel: Test mit GitHub Copilot

### Beispiel 1: Einfache Pipeline generieren

1. **VS Code öffnen** mit Copilot aktiviert
2. **Neue Datei**: `.github/workflows/copilot-test.yml`
3. **Kommentar eingeben**:
```yaml
# GitHub Actions workflow for Node.js app
# Runs tests on push to main
# Uses Node.js 20
# Tests backend and frontend
```

4. **Copilot-Vorschläge beobachten**
5. **Code akzeptieren/anpassen**
6. **Pipeline testen**

### Beispiel 2: Bestehende Pipeline verbessern

1. **Bestehende Pipeline öffnen**
2. **Kommentar hinzufügen**:
```yaml
# Add caching for npm dependencies to speed up builds
```

3. **Copilot-Vorschläge beobachten**
4. **Implementierung prüfen**

### Beispiel 3: Fehler beheben

1. **Pipeline mit Fehler erstellen**
2. **Copilot Chat öffnen** (Strg+I in VS Code)
3. **Frage stellen**: "Warum schlägt dieser Workflow fehl?"
4. **Lösungsvorschläge prüfen**

## Dokumentation für die Thesis

### Was dokumentieren?

1. **Quantitative Metriken:**
   - Zeitersparnis in Prozent
   - Reduzierung der Fehlerrate
   - Anzahl der Iterationen

2. **Qualitative Bewertungen:**
   - Code-Qualität (1-5)
   - Benutzerfreundlichkeit (1-5)
   - Hilfreiche Vorschläge (1-5)

3. **Beispiele:**
   - Vorher/Nachher Code-Vergleiche
   - Screenshots von Copilot-Vorschlägen
   - Beispiel-Konversationen mit KI-Tools

### Format für Thesis

**Beispiel-Absatz für Kapitel 6:**

"Die Evaluierung der KI-Unterstützung erfolgte durch praktische Tests mit GitHub Copilot für GitHub Actions, ChatGPT für GitLab CI und Claude für Jenkins. Bei GitHub Actions reduzierte die Nutzung von Copilot den Konfigurationsaufwand von 52 Minuten auf 35 Minuten, was einer Zeitersparnis von 33 Prozent entspricht. Die Fehlerrate reduzierte sich von 3 auf 1 Fehler, und die Qualität des generierten Codes wurde mit 4.5 von 5 bewertet. Copilot bot relevante Auto-Vervollständigungen und hilfreiche Fehlerkorrekturen. Bei GitLab CI und Jenkins, wo externe KI-Tools verwendet wurden, war die Integration weniger nahtlos, jedoch boten ChatGPT und Claude gute Code-Generierung und Erklärungen, wenn auch mit mehr manuellen Anpassungen."

## Checkliste für praktische Tests

- [ ] GitHub Copilot installiert und aktiviert
- [ ] Test-Repository/Branch erstellt
- [ ] Basis-Messung ohne KI durchgeführt
- [ ] Test mit GitHub Copilot durchgeführt
- [ ] Test mit ChatGPT/Claude für GitLab CI durchgeführt
- [ ] Test mit ChatGPT/Claude für Jenkins durchgeführt
- [ ] Alle Metriken dokumentiert
- [ ] Screenshots/Vergleiche erstellt
- [ ] Ergebnisse in Thesis integriert

## Tipps für erfolgreiche Tests

1. **Konsistente Aufgaben**: Verwende die gleiche Pipeline-Anforderung für alle Tests
2. **Realistische Szenarien**: Teste mit echten, praktischen Anforderungen
3. **Dokumentation**: Dokumentiere jeden Schritt detailliert
4. **Screenshots**: Mache Screenshots von KI-Vorschlägen
5. **Vergleichbarkeit**: Stelle sicher, dass die Tests fair und vergleichbar sind

## Beispiel-Prompts für KI-Tools

### Für ChatGPT/Claude (GitLab CI):

```
Ich entwickle eine Webanwendung mit React-Frontend und Node.js-Backend. 
Erstelle eine GitLab CI Pipeline (.gitlab-ci.yml) mit folgenden Anforderungen:

1. Lint-Stage: Backend und Frontend parallel linten
2. Test-Stage: Backend und Frontend parallel testen
3. Build-Stage: Frontend bauen
4. E2E-Tests: Playwright-Tests mit Chromium, Firefox und WebKit
5. Deploy-Stage: Simulation (nur echo)

Verwende Node.js 20, Docker-Images und GitLab CI Best Practices.
```

### Für ChatGPT/Claude (Jenkins):

```
Erstelle ein Jenkinsfile für eine Declarative Pipeline mit folgenden Stages:

1. Lint: Backend und Frontend parallel
2. Test: Backend und Frontend parallel  
3. Build: Frontend bauen
4. E2E Tests: Playwright-Tests
5. Docker Build: Optional, nur auf main/develop
6. Deploy: Simulation

Verwende Node.js 20, Groovy-Syntax und Jenkins Best Practices.
```

## Auswertung und Integration in Thesis

Nach den Tests sollten Sie:

1. **Metriken zusammenfassen** in Tabellen
2. **Vergleiche erstellen** (mit/sans KI)
3. **Qualitative Bewertungen** dokumentieren
4. **Beispiele** in Thesis integrieren
5. **Erkenntnisse** in Kapitel 6 und 7 diskutieren

Die praktischen Tests liefern konkrete Daten für die Evaluierung der KI-Unterstützung und machen Ihre Thesis überzeugender.

