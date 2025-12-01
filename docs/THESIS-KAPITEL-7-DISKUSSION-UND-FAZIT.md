7. Diskussion und Fazit

7.1 Beantwortung der Forschungsfragen

Die vorliegende Arbeit hat die drei führenden CI/CD-Plattformen GitHub Actions, GitLab CI und Jenkins systematisch evaluiert. Im Folgenden werden die Forschungsfragen aus Kapitel 1.3 beantwortet, basierend auf den Ergebnissen der praktischen Evaluierung.

Hauptforschungsfrage: Wie unterscheiden sich die CI/CD-Plattformen GitHub Actions, GitLab CI und Jenkins hinsichtlich ihrer Eignung für die Automatisierung von Softwareentwicklungsprozessen, und welche Plattform eignet sich am besten für verschiedene Anwendungsszenarien?

Die Evaluierung zeigt, dass sich die drei Plattformen erheblich in ihren Stärken und Schwächen unterscheiden, was ihre Eignung für verschiedene Anwendungsszenarien beeinflusst. Keine Plattform ist in allen Kriterien führend, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht. GitHub Actions eignet sich am besten für Cloud-basierte Projekte mit GitHub-Integration, insbesondere für Teams, die niedrigen Konfigurationsaufwand und umfassende KI-Unterstützung schätzen. GitLab CI ist optimal für Teams, die eine vollständige DevOps-Lösung benötigen, die Versionskontrolle, Issue-Tracking, Code-Review und CI/CD umfasst. Jenkins eignet sich am besten für Teams mit komplexen Anforderungen, die maximale Flexibilität und vollständige Kontrolle über ihre CI/CD-Infrastruktur benötigen.

Teilforschungsfrage 1: Setup und Konfiguration. Welche Plattform erfordert den geringsten Aufwand für die initiale Einrichtung und Konfiguration einer CI/CD-Pipeline? Wie unterscheidet sich der Konfigurationsaufwand mit und ohne KI-Unterstützung?

GitHub Actions erfordert den geringsten initialen Konfigurationsaufwand mit etwa 45 bis 60 Minuten bis zur ersten erfolgreichen Pipeline-Ausführung. Die YAML-Syntax ist intuitiv und gut dokumentiert, und die Verwendung von vorgefertigten Actions aus dem Marketplace reduziert den Konfigurationsaufwand erheblich. Die umfassende KI-Unterstützung durch GitHub Copilot kann den Konfigurationsaufwand zusätzlich reduzieren, insbesondere für Einsteiger. GitLab CI erfordert einen moderaten Konfigurationsaufwand von etwa 50 bis 70 Minuten, mit ähnlicher YAML-Syntax wie GitHub Actions, jedoch mit plattformspezifischen Unterschieden. Jenkins erfordert den höchsten Konfigurationsaufwand von etwa 90 bis 120 Minuten, da die Groovy-Syntax mehr Programmierkenntnisse erfordert und die Konfiguration komplexer ist. Die KI-Unterstützung ist bei Jenkins am begrenztesten, was den Konfigurationsaufwand zusätzlich erhöht.

Teilforschungsfrage 2: Funktionalität und Erweiterbarkeit. Welche Funktionsunterschiede bestehen zwischen den drei Plattformen? Wie flexibel und erweiterbar sind die einzelnen Plattformen?

Alle drei Plattformen bieten umfassende Funktionalität für Builds, Tests und Deployments. GitHub Actions bietet gute Funktionalität mit vorgefertigten Actions, jedoch mit begrenzter Erweiterbarkeit im Vergleich zu Jenkins. Die Marketplace-Bibliothek ist umfangreich, jedoch weniger flexibel als Plugin-Systeme. GitLab CI bietet umfassende Funktionalität mit guter Integration in die DevOps-Plattform und flexible Runner-Konfigurationen. Jenkins bietet die größte Erweiterbarkeit durch umfangreiche Plugin-Ökologie mit über 1800 verfügbaren Plugins, jedoch mit höherer Komplexität. Die Flexibilität variiert erheblich: GitHub Actions ist am einfachsten zu verwenden, jedoch am wenigsten erweiterbar. GitLab CI bietet ausgewogene Funktionalität und Erweiterbarkeit. Jenkins bietet maximale Erweiterbarkeit, jedoch mit höherer Komplexität und Wartungsaufwand.

Teilforschungsfrage 3: Performance. Welche Plattform bietet die schnellsten Build- und Testzeiten? Wie stabil und zuverlässig sind die Pipelines unter verschiedenen Bedingungen?

Die Performance-Unterschiede sind erheblich, mit Jenkins als schnellster Plattform (218 Sekunden Gesamtausführungszeit), gefolgt von GitHub Actions (297 Sekunden) und GitLab CI (492 Sekunden). Diese Unterschiede sind hauptsächlich auf Infrastruktur-Unterschiede, Runner-Konfiguration und Warteschlangen-Zeiten zurückzuführen, nicht auf Plattform-Limitationen. Jenkins zeigte die beste Performance in dieser Evaluierung, was auf optimierte Runner-Konfiguration und geringe Warteschlangen-Zeiten zurückgeführt werden kann. GitHub Actions zeigte ausgewogene Performance mit guter Integration und Artifact-Management. GitLab CI zeigte längere Ausführungszeiten, was jedoch durch die umfassende DevOps-Integration kompensiert wird. Die Stabilität variiert: GitHub Actions zeigte die höchste Erfolgsrate mit klaren Fehlermeldungen, GitLab CI zeigte moderate Erfolgsraten, und Jenkins zeigte niedrigere Erfolgsraten aufgrund komplexerer Konfiguration. Alle Plattformen bieten gute Performance mit paralleler Job-Ausführung und Caching-Mechanismen.

Teilforschungsfrage 4: Benutzerfreundlichkeit. Welche Plattform ist am benutzerfreundlichsten in Bezug auf Konfiguration, Monitoring und Fehlerbehebung? Wie gut ist die Dokumentation und Community-Unterstützung?

GitHub Actions erhält die beste Bewertung für Benutzerfreundlichkeit mit klarer Weboberfläche, guter Integration und umfassender Dokumentation. Die Fehlermeldungen sind klar und visuell hervorgehoben, was die Fehlerbehebung erleichtert. Die Dokumentation ist umfassend und leicht zugänglich, mit vielen Beispielen und Best Practices. GitLab CI erhält eine gute Bewertung mit umfassender DevOps-Integration, jedoch mit komplexerer Oberfläche. Die Dokumentation ist gut, jedoch weniger umfangreich als bei GitHub Actions. Jenkins erhält eine moderate Bewertung mit steilerer Lernkurve und weniger intuitiver Oberfläche, jedoch mit umfangreichen Anpassungsmöglichkeiten. Die Dokumentation ist umfangreich, jedoch weniger strukturiert als bei den anderen Plattformen. Die Community-Unterstützung ist bei allen drei Plattformen gut, mit aktiven Foren und Diskussionen.

Teilforschungsfrage 5: KI-Unterstützung. Welche KI-Funktionen bieten die Plattformen zur Unterstützung bei der Pipeline-Konfiguration? Wie effektiv ist die KI-Unterstützung bei der Reduzierung des Konfigurationsaufwands?

GitHub Actions erhält die beste Bewertung für KI-Unterstützung mit GitHub Copilot, das umfassende KI-Unterstützung für Konfiguration und Fehlerbehandlung bietet. Copilot kann Workflow-YAML-Dateien basierend auf natürlicher Sprache generieren und Vorschläge für Actions und Konfigurationen machen. Diese KI-Unterstützung reduziert den Konfigurationsaufwand erheblich, insbesondere für Einsteiger. GitLab CI erhält eine moderate Bewertung mit begrenzten KI-Funktionen. Jenkins erhält eine niedrige Bewertung mit hauptsächlich Plugin-basierter KI-Unterstützung. Die KI-Unterstützung wird zunehmend wichtig, da sie den Konfigurationsaufwand erheblich reduzieren kann und die Plattform für Einsteiger zugänglicher macht.

7.2 Kritische Reflexion der Ergebnisse

Die Ergebnisse der Evaluierung müssen kritisch reflektiert werden, da verschiedene Faktoren die Ergebnisse beeinflusst haben können. Die Performance-Unterschiede zwischen den Plattformen sind erheblich, jedoch sind diese Unterschiede hauptsächlich auf Infrastruktur-Unterschiede zurückzuführen, nicht auf Plattform-Limitationen. Jenkins zeigte die schnellste Gesamtausführungszeit, was auf optimierte Runner-Konfiguration zurückgeführt werden kann. GitLab CI zeigte längere Ausführungszeiten, was möglicherweise auf Shared Runner-Konfiguration und Warteschlangen-Zeiten zurückzuführen ist. Diese Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Performance hat, was bei der Plattformauswahl berücksichtigt werden muss.

Die Konfigurationsaufwand-Unterschiede sind signifikant und zeigen klare Präferenzen für verschiedene Anwendungsszenarien. GitHub Actions erfordert den geringsten Aufwand, was die Plattform für Einsteiger und Teams mit begrenzten Ressourcen attraktiv macht. Jenkins erfordert den höchsten Aufwand, was jedoch durch maximale Flexibilität und Erweiterbarkeit kompensiert wird. Diese Unterschiede müssen im Kontext der Team-Erfahrung und Projekt-Anforderungen betrachtet werden.

Die Erfolgsraten variieren zwischen den Plattformen, was auf verschiedene Faktoren zurückgeführt werden kann: Konfigurationskomplexität, Fehlerbehandlung und Infrastruktur-Stabilität. GitHub Actions zeigte die höchste Erfolgsrate, was auf klarere Fehlermeldungen und bessere Fehlerbehandlung zurückgeführt werden kann. Jenkins zeigte niedrigere Erfolgsraten, was auf komplexere Konfiguration und höhere Wartungsanforderungen zurückgeführt werden kann. Diese Unterschiede müssen bei der Plattformauswahl berücksichtigt werden, insbesondere für Teams mit begrenzten Ressourcen für Wartung und Fehlerbehebung.

Die KI-Unterstützung zeigt signifikante Unterschiede zwischen den Plattformen, wobei GitHub Actions als führend hervorgeht. Diese Unterschiede werden wahrscheinlich in Zukunft zunehmen, da KI-Funktionen kontinuierlich weiterentwickelt werden. Die KI-Unterstützung kann den Konfigurationsaufwand erheblich reduzieren, was die Plattformauswahl beeinflussen kann, insbesondere für Einsteiger.

Die Evaluierung zeigt, dass keine Plattform in allen Kriterien führend ist, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht. Die optimale Plattformauswahl hängt von spezifischen Faktoren ab: Projekt-Anforderungen, Team-Erfahrung, Infrastruktur-Anforderungen, Budget und langfristige Ziele. Diese Faktoren müssen bei der Plattformauswahl berücksichtigt werden, um die optimale Lösung für das spezifische Anwendungsszenario zu finden.

7.3 Limitationen der Untersuchung

Die vorliegende Evaluierung unterliegt verschiedenen Limitationen, die bei der Interpretation der Ergebnisse berücksichtigt werden müssen. Diese Limitationen wurden bereits in Kapitel 2.5 diskutiert und werden hier im Kontext der Ergebnisse kritisch reflektiert.

Zeitliche Begrenzung: Die Evaluierung erfolgte zu einem bestimmten Zeitpunkt und spiegelt den Stand der Plattformen zum Untersuchungszeitpunkt wider. CI/CD-Plattformen entwickeln sich kontinuierlich weiter, mit regelmäßigen Updates und neuen Features. Die Ergebnisse können sich durch Plattform-Updates unterscheiden, insbesondere im Bereich der KI-Unterstützung, die sich schnell entwickelt. Die zeitliche Begrenzung bedeutet, dass zukünftige Verbesserungen nicht berücksichtigt werden können, was die Langzeit-Gültigkeit der Ergebnisse beeinflussen kann.

Umfang der Evaluierung: Die Evaluierung beschränkt sich auf Standard-Funktionalitäten und eine Webanwendung als Evaluierungsgrundlage. Spezialisierte Anwendungen wie mobile Apps, Embedded Systems oder Enterprise-Anwendungen wurden nicht betrachtet. Die Ergebnisse sind primär auf ähnliche Webanwendungen übertragbar, jedoch können sich die Ergebnisse für andere Anwendungstypen unterscheiden. Die Evaluierung fokussiert sich auf Standard-Pipeline-Konfigurationen, während spezialisierte Konfigurationen und erweiterte Features nicht umfassend untersucht wurden.

Infrastruktur-Abhängigkeit: Die Performance-Ergebnisse sind stark von der Infrastruktur-Konfiguration abhängig. Die Evaluierung erfolgte auf Standard-Runnern (GitHub Actions: ubuntu-latest, GitLab CI: Shared Runner, Jenkins: lokale Installation). Spezielle Konfigurationen wie Self-Hosted Runner, Kubernetes-Cluster oder Cloud-Infrastrukturen wurden nicht berücksichtigt. Die Performance-Unterschiede können sich erheblich unterscheiden, wenn andere Infrastruktur-Konfigurationen verwendet werden. Diese Infrastruktur-Abhängigkeit bedeutet, dass die Performance-Ergebnisse nicht direkt auf andere Umgebungen übertragbar sind.

Subjektivität bei qualitativen Bewertungen: Obwohl strukturierte Kriterien und Bewertungsverfahren verwendet wurden, enthalten qualitative Bewertungen subjektive Elemente. Die Bewertung der Benutzerfreundlichkeit, Dokumentation und KI-Unterstützung basiert auf persönlichen Erfahrungen und Beobachtungen, die von anderen Evaluatoren unterschiedlich bewertet werden können. Diese Subjektivität wurde durch strukturierte Kriterien und Dokumentation kontrolliert, kann jedoch nicht vollständig eliminiert werden.

Begrenzte Anzahl von Pipeline-Durchläufen: Die Evaluierung basiert auf repräsentativen Pipeline-Ausführungen, jedoch nicht auf umfangreichen statistischen Analysen mit vielen Durchläufen. Die Performance-Ergebnisse können variieren, und die dargestellten Zeiten repräsentieren typische Ausführungszeiten unter den gegebenen Bedingungen. Umfangreichere statistische Analysen könnten zusätzliche Erkenntnisse liefern, insbesondere bezüglich der Variabilität und Stabilität der Performance.

Deployment-Simulation: Das Deployment wurde nur simuliert, nicht tatsächlich durchgeführt. Dies bedeutet, dass Aspekte wie tatsächliche Deployment-Zeiten, Rollback-Funktionalität und Multi-Environment-Deployments nicht umfassend untersucht wurden. Diese Limitation beeinflusst die Bewertung der Deployment-Funktionalität, die ein wichtiger Aspekt von CI/CD-Plattformen ist.

Docker-in-Docker-Limitationen: Die Docker-Build-Jobs waren in GitLab CI deaktiviert, da Docker-in-Docker auf dem verwendeten Shared Runner nicht verfügbar war. Diese Limitation stellt eine Einschränkung der Testumgebung dar, nicht der Plattform selbst, beeinflusst jedoch die Vergleichbarkeit der Ergebnisse. In anderen Umgebungen mit Docker-in-Docker-Unterstützung könnten sich die Ergebnisse unterscheiden.

Praktische Schwierigkeiten während der Projektumsetzung: Während der praktischen Umsetzung der Evaluierung wurden verschiedene technische und konfigurative Herausforderungen angetroffen, die die Komplexität der Plattform-Evaluierung verdeutlichen. Diese Schwierigkeiten bieten wertvolle Erkenntnisse über die praktische Nutzung der Plattformen und sollten bei der Interpretation der Ergebnisse berücksichtigt werden.

Konfigurationssyntax und Parsing-Fehler: Bei der Konfiguration von GitLab CI traten wiederholt Syntax-Fehler auf, insbesondere bei der Definition von Script-Blöcken und Deployment-Jobs. Die YAML-Syntax von GitLab CI erfordert präzise Formatierung, und Fehler in der Indentation oder bei der Verwendung von speziellen Zeichen führten zu Pipeline-Fehlern. Die Fehlermeldungen waren nicht immer eindeutig, was die Fehlerbehebung erschwerte. Ähnliche Herausforderungen traten bei Jenkins auf, wo die Groovy-Syntax komplexer ist und mehr Programmierkenntnisse erfordert. Die Fehlerbehebung erforderte mehrere Iterationen und detaillierte Dokumentationsrecherche.

Docker-in-Docker-Konfiguration: Die Einrichtung von Docker-in-Docker in GitLab CI stellte eine erhebliche Herausforderung dar. Trotz korrekter Konfiguration der Services und Variablen funktionierte Docker-in-Docker auf dem verwendeten Shared Runner nicht zuverlässig. Die Fehlermeldungen waren unklar und deuteten auf Netzwerk- oder Konfigurationsprobleme hin, die nicht ohne weiteres lösbar waren. Dies führte zur Deaktivierung der Docker-Build-Jobs in GitLab CI, was die Vergleichbarkeit der Ergebnisse beeinflusste. In Jenkins traten ähnliche Herausforderungen auf, wo Docker-Builds optional gemacht werden mussten, um Pipeline-Fehler zu vermeiden.

Test-Konfiguration und Kompatibilität: Die Konfiguration der Tests für alle drei Plattformen erforderte erhebliche Anpassungen. Bei den Frontend-Tests musste ResizeObserver gemockt werden, da Recharts diese Browser-API verwendet, die in der Test-Umgebung nicht verfügbar ist. Die Backend-Tests erforderten Anpassungen für SQLite-Concurrency-Probleme, was zur Verwendung von in-memory-Datenbanken und serieller Test-Ausführung führte. Die Konfiguration von JUnit-XML-Reports für Jenkins erforderte zusätzliche Abhängigkeiten und Konfigurationsanpassungen, die nicht in der ursprünglichen Test-Setup enthalten waren.

Infrastruktur- und Runner-Verfügbarkeit: Die Verfügbarkeit und Konfiguration der Runner variierte erheblich zwischen den Plattformen. GitLab CI Shared Runner zeigten gelegentlich Verfügbarkeitsprobleme und längere Warteschlangen-Zeiten, was die Pipeline-Ausführungszeiten beeinflusste. Jenkins erforderte eine lokale Installation und Konfiguration, was zusätzlichen Aufwand bedeutete. Die Konfiguration von Jenkins-Agents und die Einrichtung der notwendigen Tools (Node.js, Docker) erforderte mehrere Iterationen und Troubleshooting.

Plugin- und Dependency-Management: Bei Jenkins traten Herausforderungen bei der Konfiguration von Plugins auf. Einige Plugins wie publishHTML waren nicht verfügbar oder erforderten zusätzliche Konfiguration, was zu Anpassungen der Pipeline-Konfiguration führte. Die Verwaltung von Credentials für Docker-Registry erforderte sorgfältige Konfiguration und Fehlerbehandlung, um Pipeline-Fehler zu vermeiden. Die Abhängigkeitsverwaltung mit npm ci führte gelegentlich zu Problemen, wenn package-lock.json-Dateien nicht synchronisiert waren.

Dokumentation und Community-Support: Während die Dokumentation für alle drei Plattformen umfassend ist, waren spezifische Konfigurationsprobleme nicht immer gut dokumentiert. Die Suche nach Lösungen erforderte häufig die Konsultation mehrerer Quellen: offizielle Dokumentation, Community-Foren, Stack Overflow und GitHub Issues. Die Qualität und Aktualität der Dokumentation variierte zwischen den Plattformen, wobei GitHub Actions die klarste und aktuellste Dokumentation bot.

Diese praktischen Schwierigkeiten verdeutlichen, dass die Evaluierung von CI/CD-Plattformen nicht nur theoretische Kenntnisse erfordert, sondern auch praktische Erfahrung mit Troubleshooting und Problemlösung. Die Herausforderungen zeigen auch, dass die Plattformauswahl nicht nur auf Features und Performance basieren sollte, sondern auch auf der Qualität der Dokumentation, der Community-Unterstützung und der Einfachheit der Fehlerbehebung. Diese Erkenntnisse sind wertvoll für Entwicklungsteams, die ähnliche Evaluierungen durchführen oder eine Plattform auswählen.

7.4 Ausblick auf zukünftige Entwicklungen

Die CI/CD-Landschaft entwickelt sich kontinuierlich weiter, mit neuen Trends und Entwicklungen, die die Plattformauswahl beeinflussen können. Im Folgenden werden zukünftige Entwicklungen diskutiert, die für die CI/CD-Plattform-Evaluierung relevant sind.

KI-Integration: Die Integration von KI in CI/CD-Tools wird voraussichtlich weiter zunehmen, mit erweiterten Funktionen für Pipeline-Konfiguration, Fehlerdiagnose und Build-Optimierung. GitHub Copilot und ähnliche Tools werden wahrscheinlich weiterentwickelt, mit verbesserter Code-Generierung und Fehlererkennung. GitLab und Jenkins werden wahrscheinlich ihre KI-Funktionen erweitern, um mit GitHub Actions konkurrieren zu können. Diese Entwicklung könnte die Plattformauswahl beeinflussen, insbesondere für Teams, die KI-Unterstützung schätzen.

Cloud-native-Architekturen: Die zunehmende Verbreitung von Cloud-native-Architekturen und Container-Technologien wird wahrscheinlich die Anforderungen an CI/CD-Plattformen beeinflussen. Plattformen, die nahtlose Integration mit Cloud-Services und Container-Orchestrierung bieten, werden wahrscheinlich an Bedeutung gewinnen. GitHub Actions und GitLab CI sind bereits gut für Cloud-native-Architekturen positioniert, während Jenkins möglicherweise Anpassungen erfordert.

DevSecOps-Integration: Die Integration von Sicherheit in CI/CD-Pipelines (DevSecOps) wird voraussichtlich weiter zunehmen, mit erweiterten Sicherheits-Features und Compliance-Management. Plattformen, die umfassende Sicherheits-Features bieten, werden wahrscheinlich an Bedeutung gewinnen. GitLab CI bietet bereits erweiterte Sicherheits-Features in der Enterprise Edition, während GitHub Actions und Jenkins Sicherheits-Features über Actions und Plugins bieten.

Performance-Optimierung: Die kontinuierliche Optimierung der Performance wird wahrscheinlich weiterhin ein wichtiger Faktor sein, mit Fokus auf schnellere Build-Zeiten, besseres Caching und optimierte Runner-Konfigurationen. Plattformen, die kontinuierlich ihre Performance verbessern, werden wahrscheinlich wettbewerbsfähiger werden.

Kosten-Optimierung: Die Kosten-Optimierung wird wahrscheinlich weiterhin wichtig sein, insbesondere für Teams mit begrenzten Budgets. Plattformen, die kosteneffiziente Lösungen bieten, werden wahrscheinlich an Bedeutung gewinnen. Open-Source-Lösungen wie Jenkins und GitLab Community Edition werden wahrscheinlich weiterhin attraktiv sein, während Cloud-basierte Lösungen ihre Preismodelle optimieren müssen.

Standardisierung: Die zunehmende Standardisierung von CI/CD-Konfigurationen und -Prozessen wird wahrscheinlich die Plattformauswahl beeinflussen. Standards wie GitHub Actions Workflow-Syntax oder GitLab CI YAML-Syntax könnten sich weiter etablieren, was die Migration zwischen Plattformen erleichtern könnte.

Zukünftige Forschung: Zukünftige Forschung sollte sich auf langfristige Evaluierungen mit umfangreichen statistischen Analysen, Evaluierungen spezialisierter Anwendungstypen, Untersuchungen der KI-Unterstützung und deren Auswirkungen sowie Evaluierungen verschiedener Infrastruktur-Konfigurationen konzentrieren. Diese Forschung könnte zusätzliche Erkenntnisse liefern und die Validität der Ergebnisse verbessern.

Die vorliegende Evaluierung bietet eine solide Grundlage für die Plattformauswahl, jedoch müssen zukünftige Entwicklungen bei der Entscheidungsfindung berücksichtigt werden. Die kontinuierliche Weiterentwicklung der Plattformen bedeutet, dass regelmäßige Re-Evaluierungen notwendig sind, um aktuelle Erkenntnisse zu gewährleisten.

Literaturverzeichnis

Clark, M. (2022). Modern CI/CD with GitHub Actions, GitLab CI, and Jenkins. O'Reilly Media.

Chapman, J. (2022). GitHub Actions: Automate your workflow. Packt Publishing.

Laster, B. (2021). Learning GitHub Actions: Automation and integration of CI/CD with GitHub. O'Reilly Media.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

Wolf, K. (2014). Continuous Integration: Improving Software Quality and Reducing Risk. Addison-Wesley Professional.

Singh, A. (2021). DevOps Metrics: Measuring What Matters. Apress.

JetBrains. (2023). The State of Developer Ecosystem 2023. JetBrains.

JetBrains. (2025). The State of Developer Ecosystem 2025. JetBrains.

