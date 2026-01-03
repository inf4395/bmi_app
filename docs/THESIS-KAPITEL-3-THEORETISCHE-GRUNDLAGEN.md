3. Theoretische Grundlagen und Stand der Forschung

3.1 Continuous Integration (CI)

Continuous Integration (CI) bezeichnet eine Softwareentwicklungspraxis, bei der Codeänderungen regelmäßig in ein gemeinsames Repository integriert und automatisiert durch Builds und Tests überprüft werden (Humble & Farley, 2010). CI-Pipelines automatisieren diesen Prozess durch definierte Workflows mit Code-Checkout, Dependency-Installation, Kompilierung, Testausführung und Build-Erstellung (Clark, 2022).

Die Vorteile umfassen frühe Fehlererkennung, verbesserte Codequalität, kürzere Feedback-Zyklen und erhöhte Teamproduktivität (Humble & Farley, 2010; Wolf, 2014).

3.2 Continuous Delivery (CD) im Kontext von DevOps

Continuous Delivery erweitert CI um die Fähigkeit, Software jederzeit in einen produktionsreifen Zustand überführen zu können (Humble & Farley, 2010). Der Unterschied zu Continuous Deployment liegt darin, dass bei CD das Deployment manuell ausgelöst wird, während Continuous Deployment vollständig automatisiert ist.

DevOps verbindet Softwareentwicklung und IT-Betrieb zu einem integrierten Ansatz. CI/CD-Pipelines bilden ein zentrales technisches Bindeglied, da sie die Automatisierung und Standardisierung der Übergänge zwischen Entwicklung und Betrieb ermöglichen (Singh, 2021).

3.3 Nutzen und Herausforderungen von CI/CD

Der Nutzen von CI/CD manifestiert sich in Qualitätsverbesserung durch automatisierte Tests, Steigerung der Entwicklungsgeschwindigkeit, Risikoreduzierung durch häufige Releases sowie verbesserter Teamzusammenarbeit (Humble & Farley, 2010; Wolf, 2014).

Herausforderungen umfassen initialen Einrichtungsaufwand, technische Komplexität der Pipeline-Konfiguration sowie die Auswahl einer geeigneten CI/CD-Plattform (Clark, 2022; Singh, 2021).

3.4 Automatisierung und Qualitätssicherung

Automatisierung umfasst Build-Prozesse, Testausführung, Code-Analyse, Deployment und Monitoring. Qualitätssicherung erfolgt durch mehrschichtige Teststrategien (Unit-, Integration-, E2E-, Performance-Tests) und kontinuierliche Metriken-Erfassung (Singh, 2021; Clark, 2022).

3.5 Stand der Forschung zu CI/CD-Plattformen

Die Forschung zu CI/CD-Plattformen konzentriert sich hauptsächlich auf einzelne Plattformen oder allgemeine Praktiken. Systematische vergleichende Evaluationen unterschiedlicher Plattformen unter kontrollierten Bedingungen liegen nur eingeschränkt vor (Clark, 2022).

Clark (2022) analysiert GitHub Actions, GitLab CI und Jenkins anhand praktischer Einsatzszenarien, verfolgt jedoch einen deskriptiven Ansatz ohne standardisierte, quantitativ fundierte Vergleichsmethodiken. Die Übertragung von Metriken auf den direkten Vergleich konkreter CI/CD-Plattformen wird in der Literatur nur vereinzelt vorgenommen (Singh, 2021).

Empirische Industrieerhebungen (JetBrains, 2023; JetBrains, 2025) liefern quantitative Daten zur Praxisrelevanz einzelner Werkzeuge, ersetzen jedoch keine kontrollierten, vergleichenden Evaluierungen unter einheitlichen Bedingungen.

Diese identifizierte Forschungslücke bildet den Ausgangspunkt der vorliegenden Arbeit.

3.6 Zwischenfazit

CI/CD ist als Konzept umfassend erforscht, während vergleichende Analysen konkreter Plattformen bislang nur fragmentarisch vorliegen. Insbesondere fehlen systematische Untersuchungen, die funktionale und nicht-funktionale Eigenschaften verschiedener Plattformen anhand einheitlicher Kriterien und reproduzierbarer Messverfahren bewerten. Diese Forschungslücke bildet die Grundlage für die nachfolgende empirische Evaluation.

Literaturverzeichnis (Kapitel 3)

Chapman, J. (2022). GitHub Actions: Automate your workflow. Packt Publishing.

Clark, M. (2022). Modern CI/CD with GitHub Actions, GitLab CI, and Jenkins. O'Reilly Media.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

JetBrains. (2023). The State of Developer Ecosystem 2023. JetBrains.

JetBrains. (2025). The State of Developer Ecosystem 2025. JetBrains.

Singh, A. (2021). DevOps Metrics: Measuring What Matters. Apress.

Wolf, K. (2014). Continuous Integration: Improving Software Quality and Reducing Risk. Addison-Wesley Professional.
