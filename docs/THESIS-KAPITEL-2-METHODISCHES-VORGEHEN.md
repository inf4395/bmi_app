2. Methodisches Vorgehen

2.1 Forschungsdesign und Untersuchungsansatz

Die Arbeit folgt einem praxisorientierten, vergleichenden Evaluierungsansatz, der quantitative und qualitative Methoden kombiniert (Humble & Farley, 2010). Drei CI/CD-Plattformen werden unter identischen Bedingungen evaluiert: gleiche Anwendung (BMI-Rechner), identische Tests und Pipeline-Stages. Kontrollierte Variablen sind Codebasis, Testsuite und Hardware-Umgebung.

Der Ansatz gliedert sich in vier Phasen: (1) Vorbereitung mit Entwicklung der Beispielanwendung und Definition der Evaluierungskriterien, (2) Konfiguration identischer Pipelines auf allen drei Plattformen mit Dokumentation des Zeitaufwands, (3) Datenerhebung durch mindestens 10 Pipeline-Durchläufe pro Plattform mit automatisierter Metriken-Erfassung, (4) Analyse mit statistischer Auswertung und vergleichender Bewertung (Clark, 2022; Singh, 2021).

2.2 Vorgehensweise bei der Datenerhebung

Quantitative Metriken umfassen Build- und Testzeiten (Gesamtzeit, Zeit pro Stage, parallele vs. sequenzielle Ausführung), Erfolgs- und Fehlerraten sowie Ressourcennutzung (CPU, RAM, Netzwerk). Der Konfigurationsaufwand wird durch Zeitmessung (initial bis erste erfolgreiche Ausführung), Komplexitätsmetriken (Zeilen Code, Anzahl Jobs/Stages, Abhängigkeiten) und Lernaufwand (konsultierte Dokumentationsseiten, Fehler, Iterationen) erfasst. Die Erfassung erfolgt automatisiert über Pipeline-APIs und Logs sowie script-basiert (z.B. `scripts/analyze-results.py`) mit mindestens 10 Durchläufen für statistische Auswertung.

Qualitative Bewertung erfolgt auf einer 5-Punkte-Skala für Konfigurationssyntax, Benutzeroberfläche, Fehlermeldungen, Dokumentation und Community-Support. Die KI-Unterstützung wird durch Vergleich des Konfigurationsaufwands mit und ohne KI sowie Bewertung der Qualität KI-generierter Konfigurationen erfasst (Chapman, 2022).

Für jede Plattform wird ein Protokoll geführt: initiale Konfiguration (Zeit, Dokumentationsseiten, Fehler), Pipeline-Ausführungen (10+ Durchläufe, Metriken, Anomalien) und qualitative Bewertung (Notizen, Screenshots, Vergleich).

Die BMI-Rechner-Webanwendung dient als Evaluierungsgrundlage mit React-Frontend, Node.js/Express.js Backend und SQLite-Datenbank. Die Testabdeckung umfasst sieben Backend-Testsuites (Unit, Integration, Performance, Security), acht Frontend-Komponententests sowie E2E-Tests mit Playwright (Chromium, Firefox, WebKit).

2.3 Definition der Vergleichskriterien

Die fünf Vergleichskriterien basieren auf der CI/CD-Literatur (Humble & Farley, 2010; Clark, 2022; Singh, 2021):

Kriterium 1: Setup-Aufwand und Konfiguration. Erfasst werden initiale Einrichtungszeit (null bis erste erfolgreiche Ausführung), Konfigurationskomplexität (Zeilen Code, Jobs/Stages, Abhängigkeiten), Lernkurve (Dokumentationsseiten, Vorkenntnisse) und Wartungsaufwand. Bewertung: niedrigerer Aufwand = besser.

Kriterium 2: Funktionalität und Erweiterbarkeit. Subkriterien: Build-Funktionalität (parallele Builds, Caching, Matrix-Builds), Test-Integration (Frameworks, Coverage-Reports, Parallelisierung), Deployment-Features (automatisch/manuell, Rollback, Multi-Environment) und Erweiterbarkeit (Plugins/Actions, Custom Scripts, API). Bewertung: höhere Funktionalität = besser.

Kriterium 3: Performance. Subkriterien: Build- und Testzeiten (Gesamtzeit, Zeit pro Stage, Parallelisierung), Stabilität (Erfolgsrate, Fehlerrate, Reproduzierbarkeit), Ressourcennutzung (CPU, RAM, Netzwerk) und Skalierbarkeit. Messung: automatisierte Erfassung über Pipeline-Logs (10+ Durchläufe), Berechnung von Mittelwert, Median, Standardabweichung. Bewertung: schnellere Zeiten = besser.

Kriterium 4: Benutzerfreundlichkeit. Subkriterien: Konfigurationssyntax (Lesbarkeit, Intuitivität, YAML vs. Groovy), Benutzeroberfläche (Visualisierung, Navigation, Logs), Fehlerbehandlung (Klarheit, Debugging-Tools), Dokumentation (Qualität, Vollständigkeit, Beispiele) und Community-Support. Bewertung: höhere Benutzerfreundlichkeit = besser.

Kriterium 5: KI-Unterstützung. Subkriterien: Verfügbarkeit (GitHub Copilot, GitLab AI, Jenkins Plugins), Konfigurationsunterstützung (Auto-Vervollständigung, Fehlererkennung, Code-Generierung), Optimierung (Performance-Vorschläge, Log-Analyse) und Effektivität (Zeitersparnis, Qualität). Bewertung: bessere KI-Unterstützung = besser.

Alle Kriterien werden gleichgewichtet, da je nach Anwendungsszenario unterschiedliche Aspekte priorisiert werden können.

2.4 Messverfahren und Auswertungskonzept

Die Performance-Messung erfasst Pipeline-Gesamtzeit (Trigger bis Abschluss), Stage-spezifische Zeiten (Lint, Test, Build, E2E, Docker) und statistische Kennwerte (Mittelwert μ, Median M, Standardabweichung σ, Min/Max) über mindestens 10 Durchläufe. Die Konfigurationsaufwand-Messung umfasst Zeitmessung (Start bis erste erfolgreiche Ausführung), Komplexitätsmetriken (Zeilen Code, Jobs/Stages, Abhängigkeiten, Verschachtelungstiefe) und Lernaufwand (Dokumentationsseiten, Fehler, Iterationen). Erfolgs- und Fehlerraten werden prozentual berechnet, Fehler nach Konfiguration, Infrastruktur und Tests kategorisiert.

Qualitative Bewertung erfolgt auf einer 5-Punkte-Skala (1=sehr schlecht bis 5=sehr gut) für Konfigurationssyntax, Benutzeroberfläche, Fehlermeldungen, Dokumentation und Community-Support. Die Dokumentationsanalyse erfasst Vollständigkeit, Aktualität, Beispiele und Struktur.

Die Auswertung umfasst deskriptive Statistik (Tabellen, Grafiken, Vergleichstabellen), vergleichende Analyse (Plattform-Vergleich, Stärken/Schwächen, Ranking), Korrelationsanalyse (Konfigurationsaufwand-Performance, Komplexität-Wartbarkeit, Dokumentation-Lernaufwand) und qualitative Synthese (Erfahrungen, Muster, Best Practices).

Automatisierte Analyse erfolgt über Python-Script (`scripts/analyze-results.py`), JSON-Datenspeicherung und automatische Generierung von Tabellen/Grafiken. Manuelle Analyse umfasst strukturierte Notizen, Screenshots und Vergleichsmatrizen. Reproduzierbarkeit wird durch dokumentierte Konfigurationsdateien, strukturierte Messprotokolle, automatisierte Scripts und dokumentierte Umgebungsvariablen gewährleistet.

2.5 Validität und Grenzen der Methodik

Interne Validität: Kontrollierte Variablen sind identische Codebasis, Testsuite und Pipeline-Stages für alle Plattformen sowie definierter Messzeitraum. Störfaktoren werden kontrolliert: Infrastruktur-Unterschiede (verschiedene Runner-Umgebungen) durch Dokumentation und Fokus auf relative Unterschiede, Netzwerk-Latenz durch mehrfache Messungen und Mittelwertbildung, Cache-Effekte durch Dokumentation und Vergleich mit/ohne Cache.

Externe Validität: Die Evaluierung erfolgt anhand einer Webanwendung (BMI-Rechner) mit repräsentativem Technologie-Stack (React, Node.js, SQLite). Ergebnisse sind primär auf ähnliche Webanwendungen übertragbar. Mittelgroße Projektgröße und Einzelperson-Evaluierung begrenzen die Übertragbarkeit auf sehr große/kleine Projekte und Team-Dynamiken. Plattform-spezifische Erkenntnisse sind allgemein gültig, Performance-Unterschiede variieren je nach Infrastruktur.

Reliabilität: Reproduzierbarkeit durch dokumentierte und versionierte Konfigurationsdateien, strukturierte Messprotokolle und automatisierte Scripts. Konsistenz durch standardisierte Messverfahren, strukturierte Bewertungskriterien und mehrfache Messungen. Subjektivität bei qualitativen Bewertungen wird durch strukturierte Kriterien und Dokumentation kontrolliert, Plattform-Updates durch Versions- und Zeitstempel-Dokumentation.

Konstruktvalidität: Alle Vergleichskriterien sind klar definiert mit messbaren Indikatoren und transparenten Bewertungsverfahren. Vereinfachung komplexer Konzepte wird durch mehrere Subkriterien kontrolliert, Messbarkeit qualitativer Aspekte durch Kombination quantitativer und qualitativer Methoden.

Methodische Grenzen: Zeitliche Begrenzung (Evaluierung zu bestimmtem Zeitpunkt, kontinuierliche Plattform-Entwicklung), Umfang (Fokus auf Standard-Funktionalitäten), Infrastruktur-Abhängigkeit (Standard-Runner-Konfigurationen), Subjektivität (strukturierte Kriterien, Dokumentation, Transparenz) und KI-Unterstützung (zeitlich begrenzte Gültigkeit aufgrund schneller Entwicklung).

Maßnahmen zur Validitätssicherung: Transparenz (vollständige Dokumentation, Offenlegung von Annahmen, verfügbare Daten), Triangulation (Kombination quantitativer/qualitativer Methoden, mehrere Datenquellen, mehrfache Messungen) und kritische Reflexion (Bewusstsein über Grenzen, Diskussion von Limitationen, vorsichtige Interpretation).

Ethische Aspekte: Verwendung öffentlich verfügbarer Plattformen, keine Manipulation von Metriken, transparente Darstellung, respektvoller Umgang mit Plattform-Limitationen.

Literaturverzeichnis (Kapitel 2)

Chapman, E. (2022). Mastering GitHub Actions. 1st Edition. Apress.

Clark, T. (2022). CI/CD Unleashed – Turbocharging Software Deployment for Quicker Delivery. Wiley.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley.

Singh, N. (2021). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. Packt Publishing.

Wolf, E. (2014). Continuous Delivery – Der pragmatische Einstieg. 2. Auflage. dpunkt.verlag.
