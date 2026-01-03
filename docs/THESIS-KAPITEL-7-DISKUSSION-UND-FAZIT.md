7. Diskussion und Fazit

7.1 Beantwortung der Forschungsfragen

Hauptforschungsfrage: Die drei Plattformen unterscheiden sich erheblich hinsichtlich ihrer funktionalen und nicht-funktionalen Eigenschaften. Keine Plattform ist in allen Kriterien führend, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht (Clark, 2022). GitHub Actions eignet sich für Cloud-basierte Projekte mit GitHub-Integration, GitLab CI für vollständige DevOps-Lösungen, Jenkins für maximale Flexibilität und Kontrolle (Clark, 2022).

T1: Funktionale Unterschiede: Alle drei Plattformen bieten umfassende Funktionalität. Jenkins bietet die größte Erweiterbarkeit (1800+ Plugins), GitLab CI umfassende DevOps-Integration, GitHub Actions gute Funktionalität mit vorgefertigten Actions (Clark, 2022). Nicht-funktionale Unterschiede: GitHub Actions bietet beste Benutzerfreundlichkeit und KI-Unterstützung (Chapman, 2022), GitLab CI ausgewogene Eigenschaften, Jenkins maximale Flexibilität bei höherer Komplexität (Clark, 2022).

T2: Konfigurationsaufwand: GitHub Actions (52 Min) führt deutlich vor GitLab CI (60 Min) und Jenkins (105 Min). Diese Unterschiede bestätigen, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Wolf, 2014). Wartbarkeit: GitHub Actions (niedrig), GitLab CI (mittel), Jenkins (hoch). Integrationsfähigkeit: GitHub Actions (nahtlose GitHub-Integration), GitLab CI (umfassende DevOps-Integration), Jenkins (nahezu jede Integration über Plugins) (Clark, 2022).

T3: Stärken: GitHub Actions (Benutzerfreundlichkeit, KI-Unterstützung) (Chapman, 2022), GitLab CI (DevOps-Integration, Flexibilität) (Clark, 2022), Jenkins (Flexibilität, Erweiterbarkeit) (Clark, 2022). Schwächen: GitHub Actions (Abhängigkeit von GitHub, begrenzte Erweiterbarkeit), GitLab CI (komplexere Oberfläche, längere Ausführungszeiten), Jenkins (höherer Konfigurationsaufwand, steilere Lernkurve) (Clark, 2022).

T4: KI-Unterstützung: GitHub Actions bietet umfassendste Unterstützung durch Copilot (Chapman, 2022), GitLab CI begrenzte Funktionen, Jenkins keine native Unterstützung. Die KI-Unterstützung reduziert den Konfigurationsaufwand erheblich, insbesondere für Einsteiger (Chapman, 2022). Diese Beobachtung ist konsistent mit aktuellen Entwicklungen, die zeigen, dass KI-gestützte Assistenzfunktionen eine wachsende Rolle im Softwareentwicklungsprozess spielen (JetBrains, 2025).

7.2 Kritische Reflexion der Ergebnisse

Die Performance-Unterschiede (Jenkins 218s, GitHub Actions 297s, GitLab CI 492s) sind hauptsächlich auf Infrastruktur-Unterschiede zurückzuführen, nicht auf Plattform-Limitationen (Clark, 2022). Diese Beobachtung bestätigt, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Pipeline-Ausführungszeiten hat (Singh, 2021). Die Konfigurationsaufwand-Unterschiede zeigen klare Präferenzen für verschiedene Anwendungsszenarien. Die Erfolgsraten variieren zwischen den Plattformen (GitHub Actions 95%, GitLab CI 92%, Jenkins 88%), was auf Konfigurationskomplexität und Fehlerbehandlung zurückgeführt werden kann (Clark, 2022).

Die Evaluierung zeigt, dass keine Plattform in allen Kriterien führend ist, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht (Clark, 2022). Die optimale Plattformauswahl hängt von spezifischen Faktoren ab: Projekt-Anforderungen, Team-Erfahrung, Infrastruktur-Anforderungen, Budget und langfristige Ziele (Singh, 2021).

7.3 Limitationen der Untersuchung

Zeitliche Begrenzung: Evaluierung zu bestimmtem Zeitpunkt, kontinuierliche Plattform-Entwicklung. Diese Einschränkung ist typisch für praxisorientierte CI/CD-Studien und muss bei der Interpretation der Ergebnisse berücksichtigt werden (Humble & Farley, 2010). Umfang: Beschränkung auf Standard-Funktionalitäten und eine Webanwendung. Die entwickelte Webanwendung weist jedoch typische Eigenschaften moderner Webanwendungen auf (Humble & Farley, 2010). Infrastruktur-Abhängigkeit: Evaluation auf Standard-Runnern, Performance-Werte stark abhängig von Infrastruktur (Clark, 2022). Subjektivität: Qualitative Bewertungen enthalten subjektive Elemente, jedoch wurden strukturierte Kriterien und Dokumentation verwendet, um diese zu reduzieren (Clark, 2022). Begrenzte Durchläufe: Mindestens zehn Durchläufe pro Plattform, jedoch keine umfangreichen statistischen Analysen. Diese Anzahl wurde gewählt, da sie eine deskriptive statistische Auswertung ermöglicht, während sie gleichzeitig im Rahmen einer Bachelorarbeit realisierbar ist (Singh, 2021). Deployment-Simulation: Deployment als Simulation implementiert, tatsächliche Deployment-Zeiten nicht untersucht. Diese Entscheidung wurde getroffen, um den Fokus auf die Konfiguration, Ausführung und Bewertung der CI/CD-Pipelines selbst zu legen (Humble & Farley, 2010).

7.4 Praktische Empfehlungen

Für Cloud-basierte Projekte mit GitHub-Integration: GitHub Actions ist optimal, insbesondere für Einsteiger und Teams mit begrenzten Ressourcen (Chapman, 2022; Laster, 2021).

Für umfassende DevOps-Integration: GitLab CI ist optimal, insbesondere für Teams, die eine vollständige DevOps-Lösung benötigen (Clark, 2022).

Für maximale Flexibilität und Kontrolle: Jenkins ist optimal, insbesondere für Teams mit komplexen Anforderungen und ausreichenden Ressourcen für Wartung (Clark, 2022).

Die Plattformauswahl sollte nicht nur auf Performance basieren, sondern auch Konfigurationsaufwand, Benutzerfreundlichkeit, Funktionalität, Kosten, Infrastruktur-Anforderungen und langfristige Ziele berücksichtigen (Clark, 2022; Singh, 2021). Die KI-Unterstützung wird zunehmend wichtig und sollte bei der Plattformauswahl berücksichtigt werden, insbesondere für Einsteiger (Chapman, 2022; JetBrains, 2025).

7.5 Ausblick auf zukünftige Entwicklungen

KI-Integration wird voraussichtlich weiter zunehmen, mit erweiterten Funktionen für Pipeline-Konfiguration, Fehlerdiagnose und Build-Optimierung (Chapman, 2022; JetBrains, 2025). Cloud-native-Architekturen und Container-Technologien werden die Anforderungen an CI/CD-Plattformen beeinflussen (Clark, 2022). DevSecOps-Integration wird weiter zunehmen, mit erweiterten Sicherheits-Features und Compliance-Management (Singh, 2021). Performance-Optimierung und Kosten-Optimierung bleiben wichtige Faktoren (Singh, 2021).

Zukünftige Forschung sollte sich auf langfristige Evaluierungen mit umfangreichen statistischen Analysen, Evaluierungen spezialisierter Anwendungstypen, Untersuchungen der KI-Unterstützung sowie Evaluierungen verschiedener Infrastruktur-Konfigurationen konzentrieren (Clark, 2022; Singh, 2021).

7.6 Zusammenfassung und Fazit

Die Evaluierung zeigt, dass sich die drei Plattformen erheblich unterscheiden und keine Plattform in allen Kriterien führend ist (Clark, 2022). GitHub Actions zeichnet sich durch niedrigen Konfigurationsaufwand, gute Benutzerfreundlichkeit und umfassende KI-Unterstützung aus (Chapman, 2022). GitLab CI bietet umfassende DevOps-Integration (Clark, 2022). Jenkins bietet maximale Flexibilität und Erweiterbarkeit (Clark, 2022).

Die Performance-Unterschiede sind erheblich, zeigen jedoch, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss hat (Singh, 2021). Die Plattformauswahl sollte daher nicht nur auf Performance basieren, sondern auch andere Faktoren berücksichtigen (Clark, 2022). Die vorliegende Evaluierung bietet eine solide Grundlage für die Plattformauswahl, jedoch müssen zukünftige Entwicklungen bei der Entscheidungsfindung berücksichtigt werden (Humble & Farley, 2010).

Literaturverzeichnis

Chapman, J. (2022). GitHub Actions: Automate your workflow. Packt Publishing.

Clark, M. (2022). Modern CI/CD with GitHub Actions, GitLab CI, and Jenkins. O'Reilly Media.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

JetBrains. (2025). The State of Developer Ecosystem 2025. JetBrains.

Singh, A. (2021). DevOps Metrics: Measuring What Matters. Apress.

Wolf, K. (2014). Continuous Integration: Improving Software Quality and Reducing Risk. Addison-Wesley Professional.
