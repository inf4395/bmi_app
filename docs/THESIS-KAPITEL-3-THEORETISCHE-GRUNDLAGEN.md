3. Theoretische Grundlagen und Stand der Forschung

3.1 Continuous Integration (CI)

Continuous Integration (CI) bezeichnet eine Softwareentwicklungspraxis, bei der Entwickler ihre Codeänderungen häufig in ein gemeinsames Repository integrieren. Jede Integration wird automatisch durch Builds und Tests überprüft, um Fehler frühzeitig zu erkennen (Humble & Farley, 2010). CI basiert auf dem Prinzip, dass häufige Integrationen die Komplexität der Fehlerbehebung reduzieren und die Softwarequalität verbessern.

Die Kernprinzipien von CI umfassen die automatisierte Build-Erstellung bei jeder Codeänderung, die Ausführung automatisierter Tests zur Fehlererkennung, die schnelle Rückmeldung an Entwickler über den Status der Integration sowie die Minimierung von Integrationsproblemen durch häufige, kleine Commits (Wolf, 2014). Diese Praktiken ermöglichen es Entwicklungsteams, Fehler früh im Entwicklungszyklus zu identifizieren, bevor sie sich zu größeren Problemen entwickeln.

CI-Pipelines automatisieren den Prozess der Codeintegration durch definierte Workflows, die typischerweise Code-Checkout, Dependency-Installation, Kompilierung, Testausführung und Build-Erstellung umfassen. Die Automatisierung reduziert manuelle Fehler und ermöglicht konsistente, reproduzierbare Builds (Clark, 2022). Moderne CI-Systeme unterstützen parallele Ausführung von Tests, Caching-Mechanismen zur Beschleunigung von Builds und Integration mit Versionskontrollsystemen.

Die Vorteile von CI manifestieren sich in reduzierten Integrationsproblemen durch häufige Integrationen, früher Fehlererkennung durch automatisierte Tests, verbesserter Codequalität durch kontinuierliche Überprüfung, schnellerer Feedback-Zyklen für Entwickler sowie erhöhter Teamproduktivität durch Automatisierung repetitiver Aufgaben (Humble & Farley, 2010; Wolf, 2014).

3.2 Continuous Delivery (CD) und DevOps

Continuous Delivery (CD) erweitert CI um die Fähigkeit, Software jederzeit in eine produktionsreife Umgebung deployen zu können. CD stellt sicher, dass jede Codeänderung, die alle Tests besteht, automatisch für das Deployment vorbereitet wird (Humble & Farley, 2010). Der Unterschied zwischen Continuous Delivery und Continuous Deployment liegt darin, dass bei Continuous Delivery das Deployment manuell ausgelöst wird, während Continuous Deployment vollständig automatisiert ist.

Die Prinzipien von Continuous Delivery umfassen die Automatisierung des gesamten Release-Prozesses, die Verwendung von Deployment-Pipelines zur strukturierten Freigabe, die Sicherstellung, dass jeder Build deploybar ist, sowie die Fähigkeit, schnell und zuverlässig in Produktion zu deployen (Humble & Farley, 2010). Diese Praktiken ermöglichen es Organisationen, Software häufiger und mit geringerem Risiko auszuliefern.

DevOps verbindet Softwareentwicklung (Development) und IT-Betrieb (Operations) zu einem integrierten Ansatz. DevOps zielt darauf ab, die Zusammenarbeit zwischen Entwicklungsteams und Operations-Teams zu verbessern, um Software schneller und zuverlässiger bereitzustellen (Singh, 2021). CI/CD-Pipelines sind ein zentrales Element von DevOps, da sie die Automatisierung und Integration zwischen Entwicklung und Betrieb ermöglichen.

Die DevOps-Praktiken umfassen die Automatisierung von Build-, Test- und Deployment-Prozessen, die Verwendung von Infrastructure as Code zur konsistenten Umgebungsbereitstellung, kontinuierliches Monitoring und Logging zur Überwachung von Anwendungen in Produktion sowie die Kultur der kontinuierlichen Verbesserung und Zusammenarbeit (Singh, 2021). Diese Praktiken tragen dazu bei, die Zeit zwischen Codeänderungen und Produktions-Deployment zu verkürzen.

Die Integration von CI/CD in DevOps-Workflows ermöglicht es Teams, Software häufiger zu deployen, die Qualität durch automatisierte Tests zu verbessern, Risiken durch inkrementelle Releases zu reduzieren und schneller auf Marktanforderungen zu reagieren (Clark, 2022). Aktuelle Studien zeigen, dass Organisationen mit etablierten DevOps-Praktiken signifikant bessere Ergebnisse in Bezug auf Deployment-Frequenz, Lead-Time und Fehlerrate erzielen (JetBrains, 2025).

3.3 Nutzen und Herausforderungen von CI/CD in der Softwareentwicklung

Der Nutzen von CI/CD in der Softwareentwicklung manifestiert sich in mehreren Dimensionen. Qualitätsverbesserung wird durch automatisierte Tests erreicht, die Fehler frühzeitig erkennen und die Codequalität kontinuierlich überwachen (Humble & Farley, 2010). Entwicklungsgeschwindigkeit steigt durch Automatisierung repetitiver Aufgaben und schnelle Feedback-Zyklen, die es Entwicklern ermöglichen, Probleme sofort zu beheben (Wolf, 2014).

Risikoreduzierung erfolgt durch häufige, kleine Releases, die das Risiko großer, fehleranfälliger Deployments minimieren. Die Fähigkeit, schnell auf Probleme zu reagieren und bei Bedarf Rollbacks durchzuführen, erhöht die Stabilität von Produktionssystemen (Clark, 2022). Kosteneinsparungen ergeben sich durch frühzeitige Fehlererkennung, die die Kosten der Fehlerbehebung erheblich reduziert, sowie durch effizientere Nutzung von Entwicklerressourcen durch Automatisierung.

Teamzusammenarbeit wird verbessert durch transparente Build- und Test-Status, die allen Teammitgliedern sichtbar sind, sowie durch standardisierte Prozesse, die Konsistenz über verschiedene Entwickler hinweg gewährleisten (Singh, 2021). Aktuelle Studien belegen, dass Teams mit etablierten CI/CD-Praktiken signifikant bessere Ergebnisse in Bezug auf Deployment-Frequenz, Lead-Time und Fehlerrate erzielen (JetBrains, 2025).

Herausforderungen bei der Einführung von CI/CD umfassen die initiale Einrichtungszeit und Komplexität, die erforderlich ist, um CI/CD-Pipelines zu konfigurieren und zu warten. Die Notwendigkeit, umfassende Testsuites zu entwickeln und zu pflegen, stellt eine weitere Herausforderung dar (Wolf, 2014). Kulturelle Veränderungen erfordern Anpassungen in der Arbeitsweise von Entwicklungsteams, die möglicherweise Widerstand gegen neue Prozesse zeigen.

Technische Herausforderungen umfassen die Komplexität der Konfiguration von Pipelines, die Notwendigkeit, verschiedene Tools und Plattformen zu integrieren, sowie die Anforderungen an Infrastruktur und Ressourcen für die Ausführung von Builds und Tests (Clark, 2022). Die Auswahl der richtigen CI/CD-Plattform ist entscheidend, da verschiedene Plattformen unterschiedliche Stärken, Komplexitätsgrade und Kostenstrukturen aufweisen (Singh, 2021).

3.4 Automatisierung und Qualitätssicherung

Automatisierung ist das zentrale Element von CI/CD-Pipelines und umfasst die Automatisierung von Build-Prozessen, Testausführung, Code-Analyse, Deployment und Monitoring. Automatisierte Builds stellen sicher, dass Code konsistent kompiliert und für Tests vorbereitet wird, unabhängig von der lokalen Entwicklungsumgebung (Humble & Farley, 2010). Dies eliminiert das Problem von "es funktioniert auf meinem Rechner" und gewährleistet Reproduzierbarkeit.

Die Automatisierung von Tests umfasst Unit-Tests, Integrationstests, End-to-End-Tests sowie Performance- und Sicherheitstests. Automatisierte Tests werden bei jeder Codeänderung ausgeführt, um Regressionen frühzeitig zu erkennen (Wolf, 2014). Die Testautomatisierung ermöglicht es Teams, umfangreiche Testsuites schnell auszuführen und Vertrauen in Codeänderungen zu gewinnen.

Code-Analyse-Tools werden automatisch in CI/CD-Pipelines integriert, um Codequalität, Sicherheitslücken und Code-Smells zu identifizieren. Statische Code-Analyse, Linting und Security-Scanning tragen dazu bei, Probleme zu identifizieren, bevor Code in Produktion gelangt (Clark, 2022). Diese Tools helfen dabei, Coding-Standards durchzusetzen und die Wartbarkeit von Code zu verbessern.

Die Automatisierung von Deployment-Prozessen reduziert manuelle Fehler und ermöglicht konsistente, reproduzierbare Deployments. Deployment-Automatisierung umfasst typischerweise die Vorbereitung von Umgebungen, die Ausführung von Migrations-Skripten, die Bereitstellung von Anwendungen und die Verifizierung erfolgreicher Deployments (Humble & Farley, 2010). Automatisierte Rollback-Mechanismen ermöglichen es Teams, schnell auf Probleme zu reagieren.

Qualitätssicherung in CI/CD-Pipelines erfolgt durch mehrschichtige Teststrategien, die verschiedene Ebenen der Anwendung abdecken. Unit-Tests überprüfen einzelne Komponenten, Integrationstests validieren die Interaktion zwischen Komponenten, End-to-End-Tests verifizieren vollständige Benutzer-Workflows, und Performance-Tests stellen sicher, dass Anwendungen unter Last funktionieren (Singh, 2021). Diese mehrschichtige Herangehensweise gewährleistet umfassende Qualitätssicherung.

Die kontinuierliche Überwachung und Metriken-Erfassung ermöglicht es Teams, die Qualität von Code und Prozessen kontinuierlich zu verbessern. Metriken wie Testabdeckung, Build-Zeiten, Deployment-Frequenz und Fehlerraten liefern Einblicke in die Effektivität von CI/CD-Praktiken (Clark, 2022). Diese Daten ermöglichen datengetriebene Entscheidungen zur Verbesserung von Entwicklungsprozessen.

3.5 Stand der Forschung zu CI/CD-Plattformen (GitHub Actions, GitLab CI/CD, Jenkins)

Die Forschung zu CI/CD-Plattformen konzentriert sich hauptsächlich auf einzelne Plattformen oder allgemeine CI/CD-Praktiken, während vergleichende Studien zwischen verschiedenen Plattformen weniger verbreitet sind. GitHub Actions hat sich als native CI/CD-Lösung für GitHub-Repositories etabliert und bietet eine einfache Integration mit dem Versionskontrollsystem (Laster, 2021). Die Plattform zeichnet sich durch moderne YAML-basierte Workflow-Definitionen und eine umfangreiche Marketplace-Bibliothek von Actions aus (Chapman, 2022).

Die Forschung zu GitHub Actions betont die Benutzerfreundlichkeit der Plattform, insbesondere für Teams, die bereits GitHub verwenden. Die native Integration eliminiert die Notwendigkeit externer CI/CD-Systeme und vereinfacht die Konfiguration (Laster, 2021). Aktuelle Entwicklungen umfassen die Integration von KI-Funktionen wie GitHub Copilot, die Entwicklern bei der Pipeline-Konfiguration unterstützen (Chapman, 2022).

GitLab CI/CD ist als integrierter Bestandteil der GitLab-DevOps-Plattform konzipiert und bietet eine umfassende Lösung für den gesamten Softwareentwicklungslebenszyklus. Die Forschung zu GitLab CI/CD hebt die Vorteile der Integration verschiedener DevOps-Tools in einer einzigen Plattform hervor (Clark, 2022). Die Plattform unterstützt erweiterte Features wie Multi-Runner-Konfigurationen, parallele Pipeline-Ausführung und umfassende Monitoring-Funktionen.

Jenkins als Open-Source-Lösung hat eine lange Geschichte in der CI/CD-Landschaft und zeichnet sich durch hohe Flexibilität und Erweiterbarkeit aus. Die Forschung zu Jenkins betont die umfangreiche Plugin-Ökologie, die es ermöglicht, die Plattform an spezifische Anforderungen anzupassen (Clark, 2022). Jenkins erfordert jedoch typischerweise mehr Konfigurationsaufwand und Wartung als cloud-basierte Lösungen.

Vergleichende Studien zwischen CI/CD-Plattformen sind begrenzt und konzentrieren sich häufig auf spezifische Aspekte wie Performance oder Benutzerfreundlichkeit. Die meisten Studien sind theoretisch und verzichten auf praktische Implementierungen mit realen Anwendungen. Dies erschwert die Quantifizierung tatsächlicher Unterschiede zwischen Plattformen (Singh, 2021).

Aktuelle Trends in der CI/CD-Forschung umfassen die Integration von KI-Funktionen zur Unterstützung bei der Pipeline-Konfiguration und -Optimierung, die Verbesserung von Performance durch Caching und parallele Ausführung, sowie die Entwicklung von Metriken zur Bewertung der Effektivität von CI/CD-Praktiken (JetBrains, 2025). Die State of CI/CD Survey 2025 zeigt, dass Teams zunehmend nach objektiven Kriterien für die Plattformauswahl suchen, was den Bedarf an vergleichenden Evaluierungen unterstreicht.

Die Forschung zu Metriken in DevOps-Prozessen betont die Bedeutung von quantifizierbaren Metriken für die Bewertung von CI/CD-Effektivität (Singh, 2021). Metriken wie Deployment-Frequenz, Lead-Time, Mean Time to Recovery (MTTR) und Change Failure Rate werden als wichtige Indikatoren für DevOps-Maturität identifiziert. Diese Metriken können auch zur Bewertung von CI/CD-Plattformen verwendet werden.

3.6 Zwischenfazit

Die theoretischen Grundlagen von CI/CD zeigen, dass Continuous Integration und Continuous Delivery etablierte Praktiken sind, die signifikante Vorteile für die Softwareentwicklung bieten. CI ermöglicht frühe Fehlererkennung und verbesserte Codequalität durch automatisierte Builds und Tests (Humble & Farley, 2010; Wolf, 2014). CD erweitert diese Praktiken um die Fähigkeit, Software jederzeit deployen zu können, was die Geschwindigkeit und Zuverlässigkeit von Releases verbessert (Humble & Farley, 2010).

Die Integration von CI/CD in DevOps-Workflows ermöglicht es Organisationen, Software häufiger zu deployen, Qualität zu verbessern und Risiken zu reduzieren (Singh, 2021; Clark, 2022). Aktuelle Studien belegen signifikante Verbesserungen in Qualität und Geschwindigkeit durch CI/CD-Praktiken (JetBrains, 2025). Die Automatisierung von Build-, Test- und Deployment-Prozessen ist zentral für die Effektivität von CI/CD-Pipelines.

Die Herausforderungen bei der Einführung von CI/CD umfassen initiale Einrichtungszeit, kulturelle Veränderungen und technische Komplexität. Die Auswahl der richtigen CI/CD-Plattform ist entscheidend, da verschiedene Plattformen unterschiedliche Stärken, Komplexitätsgrade und Kostenstrukturen aufweisen (Singh, 2021). Die Forschung zu CI/CD-Plattformen konzentriert sich hauptsächlich auf einzelne Plattformen, während vergleichende Studien zwischen verschiedenen Plattformen weniger verbreitet sind.

GitHub Actions, GitLab CI/CD und Jenkins repräsentieren unterschiedliche Ansätze zur CI/CD-Automatisierung: GitHub Actions bietet native Integration für GitHub-Repositories (Laster, 2021; Chapman, 2022), GitLab CI/CD ist in eine umfassende DevOps-Plattform integriert (Clark, 2022), und Jenkins bietet hohe Flexibilität durch seine Open-Source-Natur und umfangreiche Plugin-Ökologie (Clark, 2022).

Aktuelle Trends umfassen die Integration von KI-Funktionen, Performance-Verbesserungen und die Entwicklung von Metriken zur Bewertung der CI/CD-Effektivität (JetBrains, 2025; Chapman, 2022). Der Bedarf an objektiven Kriterien für die Plattformauswahl unterstreicht die Notwendigkeit vergleichender Evaluierungen, die praktische Implementierungen mit realen Anwendungen umfassen.

Die vorliegende Arbeit adressiert die identifizierte Lücke durch eine systematische, praxisorientierte Evaluierung der drei führenden CI/CD-Plattformen anhand einer realen Webanwendung. Diese Evaluierung ermöglicht es, tatsächliche Unterschiede zwischen den Plattformen zu quantifizieren und Entwicklungsteams bei der Plattformauswahl zu unterstützen.

Literaturverzeichnis (Kapitel 3)

Chapman, E. (2022). Mastering GitHub Actions. 1st Edition. Apress.

Clark, T. (2022). CI/CD Unleashed – Turbocharging Software Deployment for Quicker Delivery. Wiley.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley.

JetBrains. (2023). Developer Ecosystem Survey 2023. Verfügbar unter: https://www.jetbrains.com/lp/devecosystem-2023/ [Zugriff am 06. November 2025].

JetBrains. (2025). The State of CI/CD in 2025: Key Insights from the Latest JetBrains Survey. Verfügbar unter: https://blog.jetbrains.com/teamcity/2025/10/the-state-of-cicd/ [Zugriff am 06. November 2025].

Laster, B. (2021). Learning GitHub Actions: Automation and Integration of CI/CD with GitHub. O'Reilly Media.

Singh, N. (2021). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. Packt Publishing.

Wolf, E. (2014). Continuous Delivery – Der pragmatische Einstieg. 2. Auflage. dpunkt.verlag.

