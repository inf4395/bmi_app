# Anleitung zur Bearbeitung der einzelnen Kapitel

Dieses Dokument gibt Ihnen eine detaillierte Anleitung, wie Sie jedes Kapitel Ihrer Thesis bearbeiten sollten.

## Kapitel 1: Einleitung ✅

**Status:** Vollständig ausgearbeitet in `THESIS-KAPITEL-1-EINLEITUNG.md`

**Inhalt:**
- Motivation (Warum ist das Thema wichtig?)
- Problemstellung (Welche Lücken gibt es in der Forschung?)
- Forschungsfragen und Zielsetzung (Was soll erreicht werden?)
- Vorgehensweise (Wie wird vorgegangen?)
- Abgrenzung (Was wird NICHT behandelt?)
- Struktur der Arbeit (Überblick über alle Kapitel)

**Ihre Aufgabe:** 
- Lesen Sie das ausgearbeitete Kapitel
- Passen Sie es ggf. an Ihre spezifischen Anforderungen an
- Stellen Sie sicher, dass es zu Ihrer Hochschule/Universität passt

---

## Kapitel 2: Methodisches Vorgehen

### 2.1 Forschungsdesign und Untersuchungsansatz

**Was schreiben:**
- Beschreiben Sie den gewählten Forschungsansatz (empirisch, vergleichend, praxisorientiert)
- Erklären Sie, warum dieser Ansatz für Ihre Fragestellung geeignet ist
- Beschreiben Sie das Design der Studie (Fallstudie, Experiment, Vergleichsstudie)

**Ihre Materialien:**
- Nutzen Sie `EVALUATION-FRAMEWORK.md` als Grundlage
- Beschreiben Sie, dass Sie eine praxisorientierte Vergleichsstudie durchführen
- Erklären Sie die Wahl der drei Plattformen

**Tipp:** 
- Erwähnen Sie, dass Sie eine reale Anwendung (BMI-App) als Testfall verwenden
- Begründen Sie, warum dies besser ist als theoretische Vergleiche

### 2.2 Vorgehensweise bei der Datenerhebung

**Was schreiben:**
- Beschreiben Sie, wie Sie die Daten sammeln
- Erklären Sie die Messverfahren für quantitative Daten (Zeiten, Metriken)
- Beschreiben Sie die Methoden für qualitative Daten (Bewertungen, Erfahrungen)

**Ihre Materialien:**
- Nutzen Sie `scripts/measure-performance.sh` und `scripts/analyze-results.py`
- Dokumentieren Sie, wie Sie Build-Zeiten messen
- Beschreiben Sie, wie Sie den Konfigurationsaufwand erfassen

**Konkrete Schritte:**
1. Beschreiben Sie die Messung der Build- und Testzeiten (10 Durchläufe, Mittelwert)
2. Erklären Sie, wie Sie den Konfigurationsaufwand messen (Zeit, Schritte, Fehler)
3. Beschreiben Sie die Bewertungskriterien für qualitative Aspekte

### 2.3 Definition der Vergleichskriterien

**Was schreiben:**
- Listen Sie die 5 Hauptkriterien auf:
  1. Setup-Aufwand und Konfiguration
  2. Funktionsumfang und Erweiterbarkeit
  3. Performance (Build- und Testzeiten)
  4. Benutzerfreundlichkeit und Dokumentation
  5. KI-Unterstützung
- Erklären Sie jedes Kriterium detailliert
- Begründen Sie, warum diese Kriterien relevant sind

**Ihre Materialien:**
- Nutzen Sie `EVALUATION-FRAMEWORK.md` als Vorlage
- Erstellen Sie eine Tabelle mit den Kriterien und Unterkriterien

**Beispiel-Struktur:**
```
1. Setup-Aufwand
   - Initiale Konfigurationszeit
   - Anzahl der Konfigurationsschritte
   - Komplexität der Syntax
   - Benötigte Dokumentation
   
2. Funktionsumfang
   - Build-Funktionen
   - Test-Funktionen
   - Deployment-Funktionen
   - Erweiterbarkeit
   
[...]
```

### 2.4 Messverfahren und Auswertungskonzept

**Was schreiben:**
- Beschreiben Sie, wie Sie jede Metrik messen
- Erklären Sie die statistischen Methoden (Mittelwert, Median, Standardabweichung)
- Beschreiben Sie, wie Sie die Ergebnisse visualisieren (Tabellen, Grafiken)

**Ihre Materialien:**
- Nutzen Sie `scripts/analyze-results.py` als Referenz
- Beschreiben Sie die Python-Skripte zur Datenanalyse
- Erklären Sie die Generierung von Vergleichsgrafiken

**Konkrete Punkte:**
- Automatisierte Zeitmessung über CI/CD-Logs
- Manuelle Erfassung des Konfigurationsaufwands
- Bewertungsskalen für qualitative Kriterien (z.B. 1-5)
- Vergleichstabellen und Grafiken

### 2.5 Validität und Grenzen der Methodik

**Was schreiben:**
- Diskutieren Sie die Validität Ihrer Ergebnisse
- Erklären Sie, welche Faktoren die Ergebnisse beeinflussen können
- Beschreiben Sie die Grenzen Ihrer Methodik

**Wichtige Punkte:**
- Die Ergebnisse gelten für die spezifische Anwendung (BMI-App)
- Unterschiedliche Infrastrukturen können andere Ergebnisse liefern
- Subjektive Bewertungen enthalten persönliche Präferenzen
- Zeitpunkt der Evaluierung (Plattformen entwickeln sich weiter)

---

## Kapitel 3: Theoretische Grundlagen und Stand der Forschung

### 3.1 Continuous Integration (CI)

**Was schreiben:**
- Definition von Continuous Integration
- Historische Entwicklung
- Grundprinzipien (häufige Integration, automatisierte Tests, schnelles Feedback)
- Vorteile und Herausforderungen

**Quellen:**
- Wissenschaftliche Artikel zu CI
- Bücher über DevOps und CI/CD
- Offizielle Dokumentationen

**Tipp:** 
- Beginnen Sie mit der Definition von Martin Fowler oder anderen bekannten Autoren
- Erklären Sie die "Integration Hell" und wie CI diese löst

### 3.2 Continuous Delivery (CD) und DevOps

**Was schreiben:**
- Definition von Continuous Delivery vs. Continuous Deployment
- Zusammenhang mit DevOps
- CD-Pipeline-Konzepte
- Best Practices

**Wichtige Konzepte:**
- Deployment-Pipeline
- Automatisierung von Deployment-Schritten
- Rollback-Strategien
- Blue-Green Deployment, Canary Releases

### 3.3 Nutzen und Herausforderungen von CI/CD

**Was schreiben:**
- Vorteile: Qualität, Geschwindigkeit, Risikoreduzierung
- Herausforderungen: Komplexität, Wartung, Kosten
- ROI von CI/CD

**Quellen:**
- Studien über die Auswirkungen von CI/CD
- Fallstudien von Unternehmen
- Metriken (z.B. DORA-Metriken)

### 3.4 Automatisierung und Qualitätssicherung

**Was schreiben:**
- Rolle der Automatisierung in CI/CD
- Verschiedene Testarten (Unit, Integration, E2E)
- Code-Qualität (Linting, Code Review)
- Testabdeckung

**Bezug zu Ihrer Arbeit:**
- Erwähnen Sie, dass Sie verschiedene Testarten in Ihrer Pipeline verwenden
- Verweisen Sie auf Ihre Test-Implementierung

### 3.5 Stand der Forschung zu CI/CD-Plattformen

**Was schreiben:**
- Literaturrecherche zu Vergleichsstudien
- Aktuelle Trends in CI/CD-Plattformen
- Forschung zu GitHub Actions, GitLab CI, Jenkins
- Lücken in der aktuellen Forschung (führt zu Ihrer Problemstellung)

**Quellen:**
- Wissenschaftliche Datenbanken (Google Scholar, IEEE Xplore, ACM Digital Library)
- Suchbegriffe: "CI/CD platform comparison", "GitHub Actions evaluation", "Jenkins vs GitLab CI"
- Aktuelle Artikel (letzte 3-5 Jahre)

**Tipp:**
- Erstellen Sie eine Tabelle mit bestehenden Vergleichsstudien
- Identifizieren Sie Lücken, die Ihre Arbeit adressiert

### 3.6 Zwischenfazit

**Was schreiben:**
- Zusammenfassung der wichtigsten Erkenntnisse
- Übergang zu Kapitel 4 (Stand der Technik)

---

## Kapitel 4: Stand der Technik: CI/CD-Plattformen im Vergleich

### 4.1 Überblick über aktuelle CI/CD-Lösungen

**Was schreiben:**
- Überblick über die CI/CD-Landschaft
- Kategorisierung (Cloud-basiert, Self-hosted, Hybrid)
- Marktanteile und Verbreitung
- Auswahlkriterien für die drei untersuchten Plattformen

### 4.2 GitHub Actions

**Was schreiben:**
- Geschichte und Entwicklung
- Architektur (Workflows, Jobs, Steps, Runners)
- Hauptfunktionen
- Preismodell
- Stärken und Schwächen

**Ihre Materialien:**
- Nutzen Sie Ihre Erfahrungen mit `.github/workflows/ci.yml`
- Screenshots der GitHub Actions UI
- Beschreiben Sie die Konfiguration

### 4.3 GitLab CI

**Was schreiben:**
- Geschichte und Entwicklung
- Architektur (Pipelines, Stages, Jobs, Runners)
- Hauptfunktionen
- Preismodell
- Stärken und Schwächen

**Ihre Materialien:**
- Nutzen Sie Ihre Erfahrungen mit `.gitlab-ci.yml`
- Screenshots der GitLab CI UI
- Beschreiben Sie die Konfiguration

### 4.4 Jenkins

**Was schreiben:**
- Geschichte und Entwicklung
- Architektur (Pipelines, Nodes, Agents, Plugins)
- Hauptfunktionen
- Preismodell (Open Source)
- Stärken und Schwächen

**Ihre Materialien:**
- Nutzen Sie Ihre Erfahrungen mit `Jenkinsfile`
- Screenshots der Jenkins UI
- Beschreiben Sie die Konfiguration

### 4.5 Vergleich der Plattformen

**Was schreiben:**
- Systematischer Vergleich anhand der definierten Kriterien
- Tabellen für jeden Vergleichspunkt
- Grafische Darstellungen wo sinnvoll

#### 4.5.1 Architektur und Infrastruktur

**Vergleich:**
- Runner-Konzept (Self-hosted vs. Cloud)
- Skalierbarkeit
- Infrastruktur-Anforderungen
- Verfügbarkeit und Uptime

#### 4.5.2 Funktionsumfang und Erweiterbarkeit

**Vergleich:**
- Verfügbare Features
- Plugin/Extension-Systeme
- API-Verfügbarkeit
- Integration mit anderen Tools

**Ihre Materialien:**
- Nutzen Sie `PIPELINE-COMPARISON.md`
- Erstellen Sie Vergleichstabellen

#### 4.5.3 Benutzerfreundlichkeit und Dokumentation

**Vergleich:**
- UI/UX
- Qualität der Dokumentation
- Beispiele und Tutorials
- Community-Support

#### 4.5.4 Performance und Stabilität

**Vergleich:**
- Typische Build-Zeiten (aus Literatur)
- Stabilität und Zuverlässigkeit
- Ressourcenverbrauch

**Hinweis:** 
- Hier noch keine eigenen Messungen, nur Literatur
- Eigene Messungen kommen in Kapitel 6

#### 4.5.5 KI-Unterstützung

**Vergleich:**
- Verfügbare KI-Funktionen
- GitHub Copilot für Actions
- GitLab AI-Features
- Jenkins Plugins mit KI

**Ihre Materialien:**
- Dokumentieren Sie Ihre Erfahrungen mit KI-Unterstützung
- Vergleichen Sie Konfigurationszeit mit/ohne KI

### 4.6 Zwischenfazit

**Was schreiben:**
- Zusammenfassung der theoretischen Unterschiede
- Übergang zu praktischer Implementierung (Kapitel 5)

---

## Kapitel 5: Technische Umsetzung

### 5.1 Beschreibung der Beispielanwendung

**Was schreiben:**
- Überblick über die BMI-App
- Technologie-Stack
- Architektur (Frontend/Backend/Database)
- Funktionalitäten

**Ihre Materialien:**
- Nutzen Sie `docs/uml-application-architecture.puml` für Diagramme
- Beschreiben Sie die Struktur der Anwendung
- Erklären Sie, warum diese App als Testfall geeignet ist

#### 5.1.1 Frontend

**Was schreiben:**
- Technologie: React, Vite
- Struktur der Komponenten
- Routing
- State Management
- Tests (Unit, E2E)

**Ihre Materialien:**
- Liste der Hauptkomponenten
- Beschreibung der Test-Strategie
- Screenshots der UI

#### 5.1.2 Backend

**Was schreiben:**
- Technologie: Node.js, Express.js
- API-Struktur
- Datenbank: SQLite
- Authentifizierung (JWT)
- Tests (Unit, Integration)

**Ihre Materialien:**
- API-Endpunkte dokumentieren
- Datenbankschema beschreiben
- Test-Abdeckung angeben

### 5.2 Einrichtung der CI/CD-Pipelines

**Was schreiben:**
- Beschreibung der Pipeline-Struktur
- Gemeinsame Stages (Lint, Test, Build, E2E, Docker, Deploy)
- Plattform-spezifische Besonderheiten

#### 5.2.1 Pipeline in GitHub Actions

**Was schreiben:**
- Beschreibung der `.github/workflows/ci.yml`
- Erklärung der Jobs und deren Abhängigkeiten
- Besonderheiten (Actions, Artifacts, Secrets)
- Screenshots der Pipeline-Ausführung

**Ihre Materialien:**
- Vollständige YAML-Datei im Anhang
- Screenshots der GitHub Actions UI
- Beschreibung der Herausforderungen

#### 5.2.2 Pipeline in GitLab CI

**Was schreiben:**
- Beschreibung der `.gitlab-ci.yml`
- Erklärung der Stages und Jobs
- Besonderheiten (Cache, Artifacts, Variables)
- Warum Docker Build deaktiviert wurde

**Ihre Materialien:**
- Vollständige YAML-Datei im Anhang
- Screenshots der GitLab CI UI
- Beschreibung der Herausforderungen (Docker-in-Docker)

#### 5.2.3 Pipeline in Jenkins

**Was schreiben:**
- Beschreibung des `Jenkinsfile`
- Erklärung der Pipeline-Struktur (Declarative Pipeline)
- Besonderheiten (Groovy-Syntax, Plugins, Credentials)
- Setup-Prozess

**Ihre Materialien:**
- Vollständiges Jenkinsfile im Anhang
- Screenshots der Jenkins UI
- Beschreibung der Herausforderungen

**Tipp:**
- Dokumentieren Sie die Zeit, die Sie für die Konfiguration benötigt haben
- Notieren Sie Fehler und deren Lösungen
- Erstellen Sie Vergleichstabellen der Konfigurationsdateien

---

## Kapitel 6: Evaluation und Ergebnisse

### 6.1 Messergebnisse der drei Plattformen

**Was schreiben:**
- Präsentation aller quantitativen Daten
- Tabellen und Grafiken
- Statistische Auswertung

#### 6.1.1 Build- und Testzeiten

**Was schreiben:**
- Durchschnittliche Zeiten für jeden Stage
- Vergleichstabellen
- Grafiken (Balkendiagramme, Boxplots)
- Statistische Analyse (Mittelwert, Median, Standardabweichung)

**Ihre Materialien:**
- Nutzen Sie `scripts/analyze-results.py` für die Analyse
- Führen Sie 10 Durchläufe pro Plattform durch
- Dokumentieren Sie die Ergebnisse in `results/performance/`

**Beispiel-Tabelle:**
| Stage | GitHub Actions | GitLab CI | Jenkins |
|-------|----------------|-----------|---------|
| Lint Backend | X min | Y min | Z min |
| Lint Frontend | X min | Y min | Z min |
| Tests Backend | X min | Y min | Z min |
| Tests Frontend | X min | Y min | Z min |
| Build | X min | Y min | Z min |
| E2E Tests | X min | Y min | Z min |
| **Gesamt** | **X min** | **Y min** | **Z min** |

#### 6.1.2 Erfolgs- und Fehlerraten

**Was schreiben:**
- Anzahl erfolgreicher vs. fehlgeschlagener Pipeline-Ausführungen
- Häufigste Fehlerursachen
- Stabilität der Pipelines

**Ihre Materialien:**
- Dokumentieren Sie alle Fehler während der Evaluierung
- Kategorisieren Sie die Fehler (Konfiguration, Infrastruktur, Tests)

#### 6.1.3 Aufwand bei Konfiguration und Wartung

**Was schreiben:**
- Zeit für initiale Konfiguration
- Anzahl der Konfigurationsschritte
- Zeit mit/ohne KI-Unterstützung
- Wartungsaufwand

**Ihre Materialien:**
- Dokumentieren Sie die Zeit für jede Plattform
- Erstellen Sie eine Tabelle mit/ohne KI
- Beschreiben Sie die Erfahrungen

**Beispiel-Tabelle:**
| Plattform | Ohne KI | Mit KI | Zeitersparnis |
|-----------|---------|--------|---------------|
| GitHub Actions | X min | Y min | Z% |
| GitLab CI | X min | Y min | Z% |
| Jenkins | X min | Y min | Z% |

### 6.2 Analyse und Diskussion der Ergebnisse

**Was schreiben:**
- Interpretation der Ergebnisse
- Erklärung von Unterschieden
- Identifikation von Mustern
- Diskussion überraschender Ergebnisse

**Wichtige Punkte:**
- Warum ist Plattform X schneller?
- Welche Faktoren beeinflussen die Performance?
- Welche Plattform ist am einfachsten zu konfigurieren?
- Wie hilfreich ist KI-Unterstützung?

### 6.3 Bewertung anhand der definierten Kriterien

**Was schreiben:**
- Systematische Bewertung jeder Plattform anhand der 5 Kriterien
- Vergleichstabellen
- Gewichtung der Kriterien (optional)
- Gesamtbewertung

**Struktur:**
1. Setup-Aufwand: GitHub Actions X/5, GitLab CI Y/5, Jenkins Z/5
2. Funktionsumfang: ...
3. Performance: ...
4. Benutzerfreundlichkeit: ...
5. KI-Unterstützung: ...

### 6.4 Zusammenfassung der Erkenntnisse

**Was schreiben:**
- Zusammenfassung der wichtigsten Ergebnisse
- Stärken und Schwächen jeder Plattform
- Übergang zu Diskussion (Kapitel 7)

---

## Kapitel 7: Diskussion und Fazit

### 7.1 Beantwortung der Forschungsfragen

**Was schreiben:**
- Gehen Sie jede Forschungsfrage durch
- Beantworten Sie sie basierend auf Ihren Ergebnissen
- Verweisen Sie auf relevante Abschnitte

**Struktur:**
- Hauptforschungsfrage: [Antwort]
- Teilforschungsfrage 1: [Antwort]
- Teilforschungsfrage 2: [Antwort]
- ...

### 7.2 Kritische Reflexion der Ergebnisse

**Was schreiben:**
- Diskutieren Sie die Bedeutung der Ergebnisse
- Vergleichen Sie mit Literatur
- Erklären Sie Abweichungen
- Diskutieren Sie praktische Implikationen

### 7.3 Limitationen der Untersuchung

**Was schreiben:**
- Zeitliche Limitationen
- Anwendungsbezogene Limitationen (nur eine App)
- Infrastruktur-Limitationen
- Subjektivität bei qualitativen Bewertungen

### 7.4 Ausblick auf zukünftige Entwicklungen

**Was schreiben:**
- Trends in CI/CD
- Entwicklung der untersuchten Plattformen
- Zukünftige Forschung
- Empfehlungen für weitere Studien

---

## Kapitel 8-11: Verzeichnisse und Anhang

### Kapitel 8: Literaturverzeichnis

**Was tun:**
- Alle zitierten Quellen auflisten
- Format gemäß Ihrer Hochschule (z.B. APA, IEEE, Harvard)
- Wissenschaftliche Artikel, Bücher, Dokumentationen

**Tipp:**
- Verwenden Sie ein Literaturverwaltungsprogramm (Zotero, Mendeley, Citavi)
- Zitieren Sie während des Schreibens, nicht am Ende

### Kapitel 9: Abbildungsverzeichnis

**Was tun:**
- Alle Abbildungen nummerieren (Abb. 1, Abb. 2, ...)
- Liste mit Titel und Seitenzahl erstellen

**Ihre Abbildungen:**
- UML-Diagramme
- Screenshots der Pipelines
- Vergleichsgrafiken
- UI-Screenshots

### Kapitel 10: Tabellenverzeichnis

**Was tun:**
- Alle Tabellen nummerieren (Tab. 1, Tab. 2, ...)
- Liste mit Titel und Seitenzahl erstellen

**Ihre Tabellen:**
- Vergleichstabellen der Plattformen
- Performance-Metriken
- Konfigurationsvergleiche

### Kapitel 11: Anhang

**Was aufnehmen:**

#### A. Screenshots der Anwendung und Pipelines
- Screenshots der BMI-App
- Screenshots der Pipeline-Ausführungen
- Screenshots der UI aller drei Plattformen

#### B. YAML-Konfigurationen
- Vollständige `.github/workflows/ci.yml`
- Vollständige `.gitlab-ci.yml`
- Vollständiges `Jenkinsfile`

#### C. Messergebnisse
- Rohdaten der Performance-Messungen
- JSON-Dateien aus `results/performance/`
- Logs der Pipeline-Ausführungen

#### D. Tabellen und Grafiken
- Alle Vergleichstabellen
- Alle Grafiken in hoher Auflösung
- Python-Skripte zur Analyse

---

## Allgemeine Tipps

### Zeitplanung
- **Kapitel 1-3:** Theoretischer Teil (4-6 Wochen)
- **Kapitel 4:** Stand der Technik (2-3 Wochen)
- **Kapitel 5:** Technische Umsetzung (3-4 Wochen, parallel zur Implementierung)
- **Kapitel 6:** Evaluation (2-3 Wochen, parallel zur Datenerhebung)
- **Kapitel 7:** Diskussion und Fazit (1-2 Wochen)
- **Kapitel 8-11:** Verzeichnisse und Anhang (1 Woche)

### Schreibtipps
- Schreiben Sie regelmäßig, nicht alles am Ende
- Dokumentieren Sie während der Arbeit, nicht danach
- Verwenden Sie klare, präzise Sprache
- Zitieren Sie korrekt und konsistent
- Lassen Sie andere Personen Korrektur lesen

### Qualitätssicherung
- Rechtschreibung und Grammatik prüfen
- Konsistenz in Formatierung und Stil
- Alle Quellen korrekt zitieren
- Alle Abbildungen und Tabellen beschriften
- Logische Struktur und roter Faden

### Tools
- **Schreiben:** LaTeX (Overleaf) oder Word
- **Literatur:** Zotero, Mendeley
- **Diagramme:** PlantUML, Mermaid, Draw.io
- **Datenanalyse:** Python (pandas, matplotlib)
- **Versionierung:** Git für alle Dateien

Viel Erfolg bei Ihrer Thesis! 🎓

