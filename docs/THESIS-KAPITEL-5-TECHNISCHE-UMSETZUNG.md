5. Technische Umsetzung

5.1 Beschreibung der Beispielanwendung

Als Evaluierungsgrundlage dient eine BMI-Rechner-Webanwendung, die einen realistischen, aber überschaubaren Anwendungsfall darstellt. Diese Anwendung wurde bewusst gewählt, da sie typische Anforderungen moderner Web-Anwendungen abdeckt: Authentifizierung, Datenbankoperationen, API-Integration, Frontend-Interaktionen und verschiedene Test-Typen, ohne domänenspezifische Besonderheiten einzuführen (Clark, 2022). Die Anwendung besteht aus einem React-basierten Frontend und einem Express.js-basierten Backend mit SQLite-Datenbank. Dieser Technologie-Stack wurde gewählt, da er weit verbreitet ist und typische Webanwendungsarchitekturen repräsentiert (Humble & Farley, 2010).

Die Anwendung implementiert Benutzerauthentifizierung (Registrierung, Login), BMI-Berechnung und -Speicherung, Statistiken mit Visualisierungen sowie Benutzerprofilverwaltung. Diese Funktionalitäten wurden gewählt, da sie verschiedene Test-Typen erfordern: Unit-Tests für Frontend-Komponenten, Integrationstests für Backend-APIs, Datenbanktests und End-to-End-Tests mit Playwright, was eine umfassende Evaluierung der CI/CD-Plattformen ermöglicht (Humble & Farley, 2010).

5.1.1 Frontend

Das Frontend basiert auf React 19.1.1 mit React Router für die Navigation. React wurde gewählt, da es zu den am weitesten verbreiteten Frontend-Frameworks zählt und moderne Entwicklungspraktiken unterstützt (JetBrains, 2025). Die Anwendung ist als Single-Page-Application (SPA) konzipiert und nutzt moderne React-Features (Hooks, Context API). Sie besteht aus sieben Hauptseiten: Login, Registrierung, Dashboard, BMI-Rechner, Statistiken, Programme und Profil. Diese Seitenstruktur wurde gewählt, um verschiedene Navigations- und Interaktionsszenarien abzudecken.

Build-Tool: Vite wurde gewählt, da es schnelle Entwicklung und optimierte Produktions-Builds ermöglicht (Laster, 2021). Test-Framework: Vitest mit Testing Library. Vitest wurde gewählt, da es kompatibel mit Vite ist und schnelle Test-Ausführung ermöglicht. Testing Library wurde gewählt, da es eine benutzerorientierte Test-Strategie ermöglicht (Chapman, 2022). Testabdeckung: 97,1% mit 61 Tests, die alle Hauptkomponenten, Benutzerinteraktionen und Fehlerbehandlung abdecken. Diese hohe Testabdeckung wurde angestrebt, um eine umfassende Qualitätssicherung zu gewährleisten (Humble & Farley, 2010).

5.1.2 Backend

Das Backend basiert auf Express.js 5.1.0 und Node.js 20. Express.js wurde gewählt, da es zu den am weitesten verbreiteten Node.js-Frameworks zählt und RESTful API-Design unterstützt (Clark, 2022). Architektur: RESTful API mit klarer Trennung von Routen, Middleware und Datenbanklogik. Diese Architektur wurde gewählt, da sie Wartbarkeit und Testbarkeit fördert (Humble & Farley, 2010). Datenbank: SQLite mit drei Tabellen (users, bmi_records, weight_goals). SQLite wurde gewählt, da es eine einfache Einrichtung und Wartung ermöglicht, während gleichzeitig typische Datenbankoperationen abgedeckt werden (Clark, 2022).

Authentifizierung: JSON Web Tokens (JWT) mit bcrypt für Passwort-Hashing. JWT wurde gewählt, da es ein weit verbreiteter Standard für Token-basierte Authentifizierung ist (Clark, 2022). API-Endpunkte: authRoutes, bmiRoutes, statsRoutes, testRoutes. Diese Struktur wurde gewählt, um eine klare Organisation und Testbarkeit zu gewährleisten.

Test-Framework: Jest mit Supertest. Jest wurde gewählt, da es zu den am weitesten verbreiteten Node.js-Test-Frameworks zählt und umfassende Test-Funktionalitäten bietet (Clark, 2022). Supertest wurde gewählt, da es HTTP-Assertionen für API-Tests ermöglicht. Testabdeckung: 77 Tests, einschließlich 18 Performance-Tests (Load, Stress, Scalability, Metriken), die alle API-Endpunkte, Authentifizierung, Validierung, Sicherheit und Performance abdecken. Diese umfassende Testabdeckung wurde implementiert, um realistische CI/CD-Szenarien abzubilden (Humble & Farley, 2010).

5.1.3 Testkonzept und Qualitätssicherung

Die Testabdeckung umfasst Unit-Tests (Frontend-Komponenten), Integrationstests (Backend-APIs), Datenbanktests und End-to-End-Tests mit Playwright (Chromium, Firefox, WebKit). Diese mehrschichtige Teststrategie wurde gewählt, da sie unterschiedliche Ebenen der Anwendung abdeckt und zu einer ganzheitlichen Absicherung der Softwarequalität beiträgt (Singh, 2021). Playwright wurde gewählt, da es browserübergreifende Tests ermöglicht und zu den modernsten E2E-Test-Frameworks zählt (Clark, 2022). Die Tests decken alle kritischen Pfade und Edge-Cases ab, um eine umfassende Qualitätssicherung zu gewährleisten (Humble & Farley, 2010).

5.2 Einrichtung der CI/CD-Pipelines

Die CI/CD-Pipelines für die drei Plattformen wurden so konfiguriert, dass sie identische Aufgaben ausführen. Diese funktionale Äquivalenz wurde gewählt, um eine faire Vergleichsbasis zu gewährleisten (Clark, 2022). Alle Pipelines durchlaufen die gleichen Stages: Lint (Backend/Frontend parallel), Test (Backend/Frontend parallel), Build (Frontend), E2E-Tests (Playwright, 3 Browser) und Deploy (Simulation). Diese Stages wurden gewählt, da sie typische CI/CD-Szenarien abdecken und eine umfassende Evaluierung der Plattformfunktionalitäten ermöglichen (Humble & Farley, 2010).

Um eine faire Vergleichsbasis zu gewährleisten, wurden die Docker-Build-Stages in allen drei Pipelines deaktiviert, da Docker-in-Docker auf dem verwendeten GitLab CI Shared Runner nicht verfügbar war. Diese Entscheidung wurde getroffen, um eine vollständig faire Vergleichsbasis zu gewährleisten, nicht eine Limitation der Plattformen selbst (Clark, 2022). Die Deploy-Stages wurden als identische Simulationen implementiert (Echo-Befehle), um Infrastruktur-Abhängigkeiten zu eliminieren und den Fokus auf die Konfiguration, Ausführung und Bewertung der CI/CD-Pipelines selbst zu legen (Humble & Farley, 2010).

Die Pipelines werden bei jedem Push auf main/develop sowie bei Pull Requests ausgelöst. Diese Trigger-Konfiguration wurde gewählt, da sie typische CI/CD-Szenarien abbildet (Clark, 2022). Parallele Ausführung wird für Lint- und Test-Jobs genutzt, um die Gesamtausführungszeit zu reduzieren. Diese Entscheidung wurde getroffen, da parallele Ausführung ein wichtiger Performance-Faktor in CI/CD-Pipelines ist (Singh, 2021).

5.2.1 Pipeline in GitHub Actions

Konfiguration: YAML-Datei im `.github/workflows/` Verzeichnis. Diese Struktur wurde gewählt, da sie der GitHub Actions Konvention entspricht (Laster, 2021). Syntax: GitHub Actions mit Jobs, Steps und Actions. Jobs: backend-lint, frontend-lint, backend-test, frontend-test, build-frontend, e2e-tests, deploy-staging/production. Diese Job-Struktur wurde gewählt, um eine klare Organisation und parallele Ausführung zu ermöglichen.

Die Pipeline nutzt vorgefertigte Actions aus dem Marketplace (actions/checkout@v4, actions/setup-node@v4, actions/upload-artifact@v4). Diese Actions wurden gewählt, da sie bewährte, getestete Lösungen darstellen und den Konfigurationsaufwand reduzieren (Chapman, 2022). Caching-Mechanismen für npm-Abhängigkeiten wurden implementiert, um Build-Zeiten zu reduzieren, da Caching ein wichtiger Performance-Faktor ist (Singh, 2021). Konfigurationsumfang: ~333 Zeilen YAML-Code. Diese Komplexität wurde dokumentiert, um den Konfigurationsaufwand zu quantifizieren (Clark, 2022).

5.2.2 Pipeline in GitLab CI

Konfiguration: `.gitlab-ci.yml` Datei im Repository-Root. Diese Struktur wurde gewählt, da sie der GitLab CI Konvention entspricht (Clark, 2022). Syntax: GitLab CI mit Stages, Jobs und Scripts. Stages: lint, test, build, e2e, deploy. Diese Stage-Struktur wurde gewählt, um eine klare Organisation und sequenzielle Abhängigkeiten zu ermöglichen. Basis-Image: node:20 für alle Jobs. Dieses Image wurde gewählt, da es die benötigte Node.js-Version bereitstellt und weit verbreitet ist.

Die Pipeline nutzt GitLab CI Caching-Mechanismen für npm-Abhängigkeiten, um Build-Zeiten zu reduzieren (Clark, 2022). Coverage-Reports werden automatisch in der GitLab-Weboberfläche angezeigt. Diese Funktion wurde genutzt, da sie Transparenz über die Testabdeckung bietet (Singh, 2021). Konfigurationsumfang: ~295 Zeilen YAML-Code. Diese Komplexität wurde dokumentiert, um den Konfigurationsaufwand zu quantifizieren (Clark, 2022).

5.2.3 Pipeline in Jenkins

Konfiguration: Jenkinsfile im Repository-Root in Groovy-Syntax. Diese Struktur wurde gewählt, da sie der Jenkins Pipeline-as-Code Konvention entspricht (Clark, 2022). Syntax: Declarative Pipeline. Diese Syntax wurde gewählt, da sie strukturiert und lesbar ist, während sie gleichzeitig Flexibilität bietet. Stages: Lint, Test, Build, E2E Tests, Deploy. Agent: any (läuft auf jedem verfügbaren Jenkins-Agent). Diese Konfiguration wurde gewählt, um Flexibilität bei der Agent-Auswahl zu ermöglichen.

Die Pipeline nutzt parallel-Blöcke für Lint- und Test-Jobs, um die Gesamtausführungszeit zu reduzieren (Singh, 2021). junit wird für Test-Report-Parsing verwendet, da es ein Standard-Format ist und Integration mit Jenkins ermöglicht (Clark, 2022). archiveArtifacts wird für Coverage-Reports verwendet, um Artefakte zu speichern und verfügbar zu machen. Prozess-Verwaltung für E2E-Tests erfolgt über PID-Dateien, um Server nach Test-Ausführung ordnungsgemäß zu beenden. Diese Methode wurde gewählt, da sie zuverlässige Prozess-Verwaltung ermöglicht (Clark, 2022). Konfigurationsumfang: ~293 Zeilen Groovy-Code. Diese Komplexität wurde dokumentiert, um den Konfigurationsaufwand zu quantifizieren (Clark, 2022).

Die drei Pipeline-Konfigurationen sind vollständig funktional äquivalent und führen exakt die gleichen Aufgaben aus. Die Konfigurationsdateien sind dokumentiert und versioniert, was Reproduzierbarkeit gewährleistet (Humble & Farley, 2010; Singh, 2021).

Literaturverzeichnis

Chapman, J. (2022). GitHub Actions: Automate your workflow. Packt Publishing.

Clark, M. (2022). Modern CI/CD with GitHub Actions, GitLab CI, and Jenkins. O'Reilly Media.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

JetBrains. (2025). The State of Developer Ecosystem 2025. JetBrains.

Laster, B. (2021). Learning GitHub Actions: Automation and integration of CI/CD with GitHub. O'Reilly Media.

Singh, A. (2021). DevOps Metrics: Measuring What Matters. Apress.
