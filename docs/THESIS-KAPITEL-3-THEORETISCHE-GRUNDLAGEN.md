3. Theoretische Grundlagen und Stand der Forschung

3.1 Continuous Integration (CI)

Continuous Integration (CI) bezeichnet eine Softwareentwicklungspraxis, bei der Codeänderungen regelmäßig in ein gemeinsames Repository integriert und automatisiert durch Builds und Tests überprüft werden (Humble & Farley, 2010). CI-Pipelines automatisieren diesen Prozess durch definierte Workflows mit Code-Checkout, Dependency-Installation, Kompilierung, Testausführung und Build-Erstellung (Clark, 2025).

Die Vorteile umfassen frühe Fehlererkennung, verbesserte Codequalität, kürzere Feedback-Zyklen und erhöhte Teamproduktivität (Humble & Farley, 2010; Clark, 2025).

3.2 Continuous Delivery (CD) im Kontext von DevOps

Continuous Delivery erweitert CI um die Fähigkeit, Software jederzeit in einen produktionsreifen Zustand überführen zu können (Humble & Farley, 2010). Der Unterschied zu Continuous Deployment liegt darin, dass bei CD das Deployment manuell ausgelöst wird, während Continuous Deployment vollständig automatisiert ist.

DevOps verbindet Softwareentwicklung und IT-Betrieb zu einem integrierten Ansatz. CI/CD-Pipelines bilden ein zentrales technisches Bindeglied, da sie die Automatisierung und Standardisierung der Übergänge zwischen Entwicklung und Betrieb ermöglichen (Forsgren et al., 2018).

3.3 Nutzen und Herausforderungen von CI/CD

Der Nutzen von CI/CD manifestiert sich in Qualitätsverbesserung durch automatisierte Tests, Steigerung der Entwicklungsgeschwindigkeit, Risikoreduzierung durch häufige Releases sowie verbesserter Teamzusammenarbeit (Humble & Farley, 2010; Clark, 2025).

Herausforderungen umfassen initialen Einrichtungsaufwand, technische Komplexität der Pipeline-Konfiguration sowie die Auswahl einer geeigneten CI/CD-Plattform (Shahin et al., 2017; Forsgren et al., 2018).

3.4 Automatisierung und Qualitätssicherung

Automatisierung umfasst Build-Prozesse, Testausführung, Code-Analyse, Deployment und Monitoring. Qualitätssicherung erfolgt durch mehrschichtige Teststrategien (Unit-, Integration-, E2E-, Performance-Tests) und kontinuierliche Metriken-Erfassung (Forsgren et al., 2018; Shahin et al., 2017).

3.5 Stand der Forschung zu CI/CD-Plattformen

Die Forschung zu CI/CD-Plattformen konzentriert sich hauptsächlich auf einzelne Plattformen oder allgemeine Praktiken. Systematische vergleichende Evaluationen unterschiedlicher Plattformen unter kontrollierten Bedingungen liegen nur eingeschränkt vor (Shahin et al., 2017).

Shahin et al. (2017) analysieren verschiedene CI/CD-Plattformen in einer systematischen Übersichtsarbeit, verfolgen jedoch einen deskriptiven Ansatz ohne standardisierte, quantitativ fundierte Vergleichsmethodiken. Die Übertragung von Metriken auf den direkten Vergleich konkreter CI/CD-Plattformen wird in der Literatur nur vereinzelt vorgenommen (Forsgren et al., 2018).

Empirische Industrieerhebungen (JetBrains, 2023; JetBrains, 2025) liefern quantitative Daten zur Praxisrelevanz einzelner Werkzeuge, ersetzen jedoch keine kontrollierten, vergleichenden Evaluierungen unter einheitlichen Bedingungen.

Diese identifizierte Forschungslücke bildet den Ausgangspunkt der vorliegenden Arbeit.

3.6 Zwischenfazit

CI/CD ist als Konzept umfassend erforscht, während vergleichende Analysen konkreter Plattformen bislang nur fragmentarisch vorliegen. Insbesondere fehlen systematische Untersuchungen, die funktionale und nicht-funktionale Eigenschaften verschiedener Plattformen anhand einheitlicher Kriterien und reproduzierbarer Messverfahren bewerten. Diese Forschungslücke bildet die Grundlage für die nachfolgende empirische Evaluation.

Literaturverzeichnis (Kapitel 3)

Clark, T. (2025). CI/CD Unleashed: Turbocharging Software Deployment for Quicker Delivery. Apress. https://doi.org/10.1007/979-8-8688-1209-5

Forsgren, N., Humble, J., & Kim, G. (2018). Accelerate: The Science of Lean Software and DevOps – Measuring and Improving Performance. IT Revolution Press.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

JetBrains. (2023). The State of Developer Ecosystem 2023. JetBrains s.r.o.

JetBrains. (2025). State of Developer Ecosystem Report 2025. JetBrains s.r.o. https://www.jetbrains.com/lp/devecosystem-2025/

Shahin, M., Babar, M. A., & Zhu, L. (2017). Continuous Integration, Delivery and Deployment: A Systematic Review on Approaches, Tools, Challenges and Practices. IEEE Access, 5, 3909–3943. https://doi.org/10.1109/ACCESS.2017.2685629

Singh, N. (2025). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. BPB Publications.
