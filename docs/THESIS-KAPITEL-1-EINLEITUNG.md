1. Einleitung

1.1 Motivation

Moderne Softwareentwicklung basiert auf agilen Methoden und automatisierten Workflows. Continuous Integration (CI) und Continuous Delivery/Deployment (CD) haben sich als zentrale Praktiken etabliert, die kontinuierliche Integration, Tests und Auslieferung von Codeänderungen ermöglichen (Humble & Farley, 2010; Wolf, 2014). CI/CD-Pipelines verbessern Softwarequalität, verkürzen Entwicklungszyklen und optimieren die Teamzusammenarbeit durch Automatisierung (Clark, 2022). Aktuelle Studien belegen signifikante Verbesserungen in Qualität und Geschwindigkeit (JetBrains, 2025).

Die Plattformauswahl beeinflusst Effizienz, Kosten, Wartbarkeit und Skalierbarkeit erheblich. Mit wachsender Anzahl verfügbarer Lösungen wird die Entscheidung zunehmend komplexer (Singh, 2021). Über 80% der Entwicklerteams nutzen CI/CD-Tools, wobei die Plattformauswahl eine zentrale Herausforderung darstellt (JetBrains, 2023).

GitHub Actions, GitLab CI und Jenkins zählen zu den führenden Plattformen mit unterschiedlichen Stärken. GitHub Actions bietet native Integration für GitHub-Repositories mit modernen Workflow-Definitionen (Laster, 2021; Chapman, 2022), GitLab CI ist in die DevOps-Plattform integriert, während Jenkins als Open-Source-Lösung durch hohe Flexibilität überzeugt (Clark, 2022).

Die Integration künstlicher Intelligenz (KI) in CI/CD-Tools gewinnt an Bedeutung. KI-Funktionen unterstützen Pipeline-Konfiguration, Fehlerdiagnose und Build-Optimierung (Chapman, 2022). Diese Entwicklung macht aktuelle Evaluierungen notwendig, da traditionelle Vergleichsstudien KI-Möglichkeiten noch nicht umfassend berücksichtigen.

Vor diesem Hintergrund besteht Bedarf an einer systematischen, praxisorientierten Evaluierung der drei führenden Plattformen, um Entwicklungsteams bei der Plattformauswahl zu unterstützen (JetBrains, 2025).

1.2 Problemstellung

Trotz wachsender Bedeutung von CI/CD-Pipelines fehlt es an aktuellen, praxisorientierten Vergleichsstudien, die GitHub Actions, GitLab CI und Jenkins systematisch evaluieren. Die Literatur konzentriert sich auf einzelne Plattformen oder bietet oberflächliche Vergleiche ohne detaillierte technische Analyse. Während Laster (2021) und Chapman (2022) umfassende Einführungen zu GitHub Actions bieten, fehlen vergleichende Studien auf gemeinsamer Basis.

Die meisten Vergleichsstudien sind theoretisch und verzichten auf praktische Implementierungen mit realen Anwendungen. Dies erschwert die Quantifizierung tatsächlicher Unterschiede bei Konfigurationsaufwand, Performance, Benutzerfreundlichkeit und Wartbarkeit. Humble und Farley (2010) betonen die Bedeutung von Continuous Delivery, liefern jedoch keine Plattform-Vergleiche. Ähnlich bieten Wolf (2014) und Clark (2022) wertvolle Einblicke in CI/CD-Praktiken, aber keine systematische Plattform-Evaluierung.

Vergleichskriterien werden in bestehenden Studien oft nicht klar definiert oder sind unzureichend. Eine systematische Evaluierung sollte folgende Dimensionen berücksichtigen: Setup-Aufwand (Zeit und Expertise für Pipeline-Konfiguration), Funktionalität (Features und Erweiterungsmöglichkeiten), Performance (Build- und Testzeiten), Benutzerfreundlichkeit (Intuitivität von Konfiguration und Nutzung) sowie KI-Unterstützung (verfügbare KI-Funktionen und deren Nutzen).

Die CI/CD-Landschaft entwickelt sich rasant mit kontinuierlichen Updates und neuen Features (JetBrains, 2025), was ältere Vergleichsstudien schnell veraltet macht. Die Integration von KI in CI/CD-Tools ist eine relativ neue Entwicklung, die in bisherigen Studien kaum berücksichtigt wurde. Chapman (2022) diskutiert KI-Funktionen in GitHub Actions, jedoch fehlen vergleichende Studien zur systematischen Evaluierung der KI-Unterstützung verschiedener Plattformen.

Zudem fehlen standardisierte Methoden zur Messung und Bewertung von CI/CD-Plattformen. Ohne klare Metriken sind objektive Vergleiche und fundierte Entscheidungen schwierig. Singh (2021) betont die Bedeutung von Metriken in DevOps-Prozessen, liefert jedoch keine spezifischen Evaluierungsrahmen für CI/CD-Plattformen.

Diese Arbeit adressiert diese Lücken durch eine praxisorientierte Evaluierungsmethodik und deren Anwendung auf die drei führenden CI/CD-Plattformen anhand einer realen Webanwendung.

1.3 Forschungsfragen und Zielsetzung

Forschungsfragen

Hauptforschungsfrage: Wie unterscheiden sich die CI/CD-Plattformen GitHub Actions, GitLab CI und Jenkins hinsichtlich ihrer Eignung für die Automatisierung von Softwareentwicklungsprozessen, und welche Plattform eignet sich am besten für verschiedene Anwendungsszenarien?

Teilforschungsfragen: (1) Setup und Konfiguration: Welche Plattform erfordert den geringsten Aufwand für die initiale Einrichtung und Konfiguration einer CI/CD-Pipeline? Wie unterscheidet sich der Konfigurationsaufwand mit und ohne KI-Unterstützung? (2) Funktionalität und Erweiterbarkeit: Welche Funktionsunterschiede bestehen zwischen den drei Plattformen? Wie flexibel und erweiterbar sind die einzelnen Plattformen? (3) Performance: Welche Plattform bietet die schnellsten Build- und Testzeiten? Wie stabil und zuverlässig sind die Pipelines unter verschiedenen Bedingungen? (4) Benutzerfreundlichkeit: Welche Plattform ist am benutzerfreundlichsten in Bezug auf Konfiguration, Monitoring und Fehlerbehebung? Wie gut ist die Dokumentation und Community-Unterstützung? (5) KI-Unterstützung: Welche KI-Funktionen bieten die Plattformen zur Unterstützung bei der Pipeline-Konfiguration? Wie effektiv ist die KI-Unterstützung bei der Reduzierung des Konfigurationsaufwands?

Zielsetzung

Hauptziel: Die systematische und praxisorientierte Evaluierung der drei führenden CI/CD-Plattformen GitHub Actions, GitLab CI und Jenkins anhand einer realen Webanwendung, um Entwicklungsteams und Entscheidungsträgern eine fundierte Basis für die Auswahl einer geeigneten CI/CD-Plattform zu bieten.

Spezifische Ziele: (1) Entwicklung einer Evaluierungsmethodik mit Definition klarer Vergleichskriterien, standardisierter Messverfahren für Performance, Aufwand und Benutzerfreundlichkeit sowie Erstellung eines praktischen Evaluierungsrahmens. (2) Praktische Implementierung durch Entwicklung einer Beispielanwendung (BMI-Rechner-Webanwendung), Konfiguration identischer CI/CD-Pipelines auf allen drei Plattformen und Durchführung umfassender Tests (Unit, Integration, E2E, Performance, Security, Accessibility). (3) Durchführung der Evaluierung mit Messung und Vergleich von Build- und Testzeiten, Analyse des Konfigurationsaufwands mit und ohne KI-Unterstützung, Bewertung der Benutzerfreundlichkeit und Dokumentation sowie Untersuchung der verfügbaren KI-Funktionen. (4) Ergebnispräsentation durch Quantifizierung der Unterschiede zwischen den Plattformen, Identifikation von Stärken und Schwächen jeder Plattform sowie Ableitung von Empfehlungen für verschiedene Anwendungsszenarien. (5) Beitrag zur Forschung durch Bereitstellung aktueller, praxisorientierter Erkenntnisse zur CI/CD-Plattform-Evaluierung, Entwicklung einer wiederverwendbaren Evaluierungsmethodik sowie Dokumentation der praktischen Erfahrungen bei der Konfiguration und Nutzung der Plattformen.

1.4 Vorgehensweise

Die Arbeit folgt einem systematischen, praxisorientierten Ansatz, der theoretische Grundlagen mit praktischer Implementierung und Evaluation verbindet.

Phase 1: Literaturrecherche und theoretische Grundlagen. Umfassende Literaturrecherche zum aktuellen Stand der Forschung durch Analyse wissenschaftlicher Publikationen zu CI/CD (Humble & Farley, 2010; Wolf, 2014), Untersuchung bestehender Vergleichsstudien zu CI/CD-Plattformen, Recherche aktueller Entwicklungen und Trends (Developer Ecosystem Survey 2023, State of CI/CD Survey 2025; JetBrains, 2023, 2025) sowie Analyse offizieller Dokumentationen und spezialisierter Literatur (Laster, 2021; Chapman, 2022).

Phase 2: Entwicklung der Evaluierungsmethodik. Entwicklung eines strukturierten Evaluierungsrahmens mit Definition der Vergleichskriterien (Setup-Aufwand, Funktionalität, Performance, Benutzerfreundlichkeit, KI-Unterstützung), Entwicklung von Messverfahren (Metriken für Build-Zeiten, Test-Zeiten, Konfigurationsaufwand) sowie Erstellung von Evaluierungsprotokollen (standardisierte Testverfahren).

Phase 3: Entwicklung der Beispielanwendung. Entwicklung einer vollständigen Webanwendung als Evaluierungsgrundlage mit React-basiertem Frontend (Single-Page-Application), Node.js/Express.js REST-API Backend mit SQLite-Datenbank, Funktionalität (BMI-Rechner mit Authentifizierung, Statistiken und Programmvorschlägen) sowie umfassender Testabdeckung (Unit, Integration, E2E, Performance, Security, Accessibility). Die Anwendung wurde mit visuellen Verbesserungen erweitert: benutzerdefiniertes SVG-Favicon, Bilder in Dashboard und Programmen, Achsenbeschriftungen in Statistiken-Diagrammen und integriertes YouTube-Workout-Video. Die Testabdeckung umfasst 77 Backend-Tests (einschließlich 18 umfassender Performance-Tests) und 61 Frontend-Tests mit 97,1% Coverage.

Phase 4: Konfiguration der CI/CD-Pipelines. Konfiguration identischer CI/CD-Pipelines für alle drei Plattformen: GitHub Actions (YAML-Dateien im Repository), GitLab CI (`.gitlab-ci.yml`), Jenkins (Jenkinsfile in Groovy). Pipeline-Stages: Linting (parallel), Testing (parallel), Build, E2E-Tests (mehrere Browser), Deployment (Simulation). Die Docker-Build-Stages wurden in allen drei Plattformen deaktiviert, um eine faire Vergleichsbasis zu gewährleisten, da Docker-in-Docker auf dem verwendeten GitLab CI Shared Runner nicht verfügbar war. Die Deploy-Stages sind in allen drei Plattformen als identische automatische Simulationen implementiert, die nur Echo-Befehle ausführen, um eine faire Vergleichsbasis zu gewährleisten.

Phase 5: Durchführung der Evaluierung. Evaluierung in drei Schritten: (1) Quantitative Messungen mit automatisierter Erfassung von Build- und Testzeiten (Clark, 2022; Singh, 2021), Messung des Konfigurationsaufwands (Zeit, Anzahl der Schritte) sowie Erfassung von Erfolgs- und Fehlerraten. Zusätzlich werden umfassende Performance-Tests durchgeführt: Load-Testing, Stress-Testing, Scalability-Testing und detaillierte Performance-Metriken (Durchsatz, Latenz P50/P95/P99). Weiterhin werden zusätzliche Metriken erfasst: Code-Qualität (Coverage, Komplexität, Sicherheitslücken), Ressourcennutzung (CPU, RAM, Netzwerk, Storage) und Entwicklererfahrung (Feedback-Zeit, Debugging-Qualität, Fehlerbehebungszeit). (2) Qualitative Bewertung der Benutzerfreundlichkeit (Dokumentation, Intuitivität), Features und Erweiterungsmöglichkeiten sowie KI-Unterstützung (Chapman, 2022). (3) Praktischer Test mit Vergleich des Konfigurationsaufwands mit und ohne KI-Unterstützung sowie Dokumentation der Erfahrungen.

Phase 6: Analyse und Auswertung. Systematische Datenanalyse durch statistische Auswertung der Performance-Metriken, vergleichende Analyse anhand definierter Kriterien, Identifikation von Mustern und Trends sowie Ableitung von Erkenntnissen und Empfehlungen.

Phase 7: Dokumentation und Präsentation. Strukturierte Ergebnisdokumentation durch Vergleichstabellen und Grafiken, Dokumentation der Konfigurationsdateien, Screenshots der Pipelines und Ergebnisse sowie Handlungsempfehlungen.

1.5 Abgrenzung

Inhaltliche Abgrenzung: Die Evaluierung beschränkt sich auf GitHub Actions, GitLab CI und Jenkins. Andere Lösungen (CircleCI, Travis CI, Azure DevOps, Bamboo, TeamCity) werden nicht berücksichtigt. Die Evaluierung erfolgt anhand einer Webanwendung (BMI-Rechner). Ergebnisse sind primär auf ähnliche Webanwendungen übertragbar. Spezialisierte Anwendungen (mobile Apps, Embedded Systems, Enterprise-Anwendungen) werden nicht betrachtet. Umfassende Tests (Unit, Integration, E2E, Performance, Security, Accessibility) werden durchgeführt. Spezialisierte Tests (Load-Tests mit sehr hoher Last, Penetration-Tests, Compliance-Tests) entfallen. Deployment wird nur simuliert. Kein tatsächliches Deployment in produktive Umgebungen. Fokus liegt auf Pipeline-Konfiguration und -Ausführung.

Technische Abgrenzung: Die Evaluierung erfolgt auf Standard-Runnern (GitHub Actions: ubuntu-latest, GitLab CI: Shared Runner, Jenkins: lokale Installation). Spezielle Konfigurationen (Self-Hosted Runner, Kubernetes-Cluster, Cloud-Infrastrukturen) entfallen. Docker-Builds sind in der Pipeline-Konfiguration enthalten. Docker-in-Docker wird nur dort berücksichtigt, wo von der Plattform unterstützt. Fokus liegt auf Standard-Funktionalitäten. Die Untersuchung der KI-Unterstützung beschränkt sich auf zum Zeitpunkt der Arbeit verfügbare KI-Funktionen. Zukünftige Verbesserungen können nicht berücksichtigt werden.

Methodische Abgrenzung: Die Evaluierung erfolgt zu einem bestimmten Zeitpunkt. Ergebnisse spiegeln den Stand zum Untersuchungszeitpunkt wider. Quantitative Metriken werden objektiv gemessen. Qualitative Bewertungen enthalten subjektive Elemente, die durch klare Kriterien und strukturierte Verfahren objektiviert werden. Die Evaluierung ist dokumentiert und reproduzierbar. Ergebnisse können sich durch Plattform-Updates oder Infrastrukturänderungen unterscheiden.

1.6 Struktur der Arbeit

Die Arbeit gliedert sich in elf Kapitel, die systematisch von theoretischen Grundlagen über praktische Implementierung bis zur Evaluation führen. Kapitel 1 (Einleitung) führt in das Thema ein, erläutert Motivation, Problemstellung, Forschungsfragen, Vorgehensweise und Abgrenzung. Kapitel 2 (Methodisches Vorgehen) beschreibt detailliert die Forschungsmethodik: Forschungsdesign, Datenerhebungsverfahren, Vergleichskriterien, Messverfahren und Validität. Kapitel 3 (Theoretische Grundlagen und Stand der Forschung) stellt die theoretischen Grundlagen von CI/CD dar, erläutert Nutzen und Herausforderungen sowie den Stand der Forschung zu CI/CD-Plattformen. Kapitel 4 (Stand der Technik: CI/CD-Plattformen im Vergleich) präsentiert und vergleicht GitHub Actions, GitLab CI und Jenkins detailliert: Architektur, Funktionsumfang, Benutzerfreundlichkeit, Performance und KI-Unterstützung. Kapitel 5 (Technische Umsetzung) beschreibt die Entwicklung der Beispielanwendung (Frontend und Backend) und die Konfiguration der CI/CD-Pipelines auf allen drei Plattformen sowie die Dokumentation technischer Entscheidungen und Herausforderungen. Kapitel 6 (Evaluation und Ergebnisse) präsentiert, analysiert und diskutiert die Messergebnisse sowie die Bewertung anhand definierter Kriterien. Kapitel 7 (Diskussion und Fazit) beantwortet die Forschungsfragen, reflektiert die Ergebnisse kritisch, diskutiert Limitationen und gibt einen Ausblick. Kapitel 8-11 (Verzeichnisse und Anhang) umfassen Literaturverzeichnis, Abbildungsverzeichnis, Tabellenverzeichnis sowie Anhang mit Screenshots, Konfigurationsdateien, Messergebnissen und Grafiken. Diese Struktur führt den Leser systematisch von den theoretischen Grundlagen über die praktische Umsetzung zu den Ergebnissen, bei gleichzeitiger Nachvollziehbarkeit der Methodik.

Literaturverzeichnis (Kapitel 1)

Chapman, E. (2022). Mastering GitHub Actions. 1st Edition. Apress.

Clark, T. (2022). CI/CD Unleashed – Turbocharging Software Deployment for Quicker Delivery. Wiley.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley.

JetBrains. (2023). Developer Ecosystem Survey 2023. Verfügbar unter: https://www.jetbrains.com/lp/devecosystem-2023/ [Zugriff am 06. November 2025].

JetBrains. (2025). The State of CI/CD in 2025: Key Insights from the Latest JetBrains Survey. Verfügbar unter: https://blog.jetbrains.com/teamcity/2025/10/the-state-of-cicd/ [Zugriff am 06. November 2025].

Laster, B. (2021). Learning GitHub Actions: Automation and Integration of CI/CD with GitHub. O'Reilly Media.

Singh, N. (2021). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. Packt Publishing.

Wolf, E. (2014). Continuous Delivery – Der pragmatische Einstieg. 2. Auflage. dpunkt.verlag.
