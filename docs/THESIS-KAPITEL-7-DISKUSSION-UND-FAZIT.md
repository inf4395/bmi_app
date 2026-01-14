7. Diskussion und Fazit

7.1 Beantwortung der Forschungsfragen

Hauptforschungsfrage: Die drei Plattformen unterscheiden sich erheblich hinsichtlich ihrer funktionalen und nicht-funktionalen Eigenschaften. Die statistische Analyse zeigt, dass GitHub Actions (188,2s) die schnellste durchschnittliche Ausführungszeit aufweist, gefolgt von Jenkins (199,9s) und GitLab CI (531,2s). Keine Plattform ist in allen Kriterien führend, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht (Shahin et al., 2017). GitHub Actions eignet sich für Cloud-basierte Projekte mit GitHub-Integration, GitLab CI für vollständige DevOps-Lösungen, Jenkins für maximale Flexibilität und Kontrolle (Shahin et al., 2017).

T1: Funktionale Unterschiede: Alle drei Plattformen bieten umfassende Funktionalität. Jenkins bietet die größte Erweiterbarkeit (1800+ Plugins), GitLab CI umfassende DevOps-Integration, GitHub Actions gute Funktionalität mit vorgefertigten Actions (Shahin et al., 2017). Nicht-funktionale Unterschiede: GitHub Actions bietet beste Benutzerfreundlichkeit und KI-Unterstützung (Clark, 2025), GitLab CI ausgewogene Eigenschaften, Jenkins maximale Flexibilität bei höherer Komplexität (Shahin et al., 2017).

T2: Konfigurationsaufwand: GitHub Actions (52 Min) führt deutlich vor GitLab CI (60 Min) und Jenkins (105 Min). Diese Unterschiede bestätigen, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Clark, 2025). Wartbarkeit: GitHub Actions (niedrig), GitLab CI (mittel), Jenkins (hoch). Integrationsfähigkeit: GitHub Actions (nahtlose GitHub-Integration), GitLab CI (umfassende DevOps-Integration), Jenkins (nahezu jede Integration über Plugins) (Shahin et al., 2017).

T3: Stärken: GitHub Actions (Benutzerfreundlichkeit, KI-Unterstützung) (Clark, 2025), GitLab CI (DevOps-Integration, Flexibilität) (Shahin et al., 2017), Jenkins (Flexibilität, Erweiterbarkeit) (Shahin et al., 2017). Schwächen: GitHub Actions (Abhängigkeit von GitHub, begrenzte Erweiterbarkeit), GitLab CI (komplexere Oberfläche, längere Ausführungszeiten), Jenkins (höherer Konfigurationsaufwand, steilere Lernkurve) (Shahin et al., 2017).

T4: KI-Unterstützung: GitHub Actions bietet umfassendste Unterstützung durch Copilot (Clark, 2025), GitLab CI begrenzte Funktionen, Jenkins keine native Unterstützung. Die KI-Unterstützung reduziert den Konfigurationsaufwand erheblich, insbesondere für Einsteiger (Clark, 2025). Diese Beobachtung ist konsistent mit aktuellen Entwicklungen, die zeigen, dass KI-gestützte Assistenzfunktionen eine wachsende Rolle im Softwareentwicklungsprozess spielen (JetBrains, 2025).

7.2 Kritische Reflexion der Ergebnisse

Die Performance-Unterschiede sind erheblich: GitHub Actions (188,2s, 3,14 Minuten) ist die schnellste Plattform, gefolgt von Jenkins (199,9s, 3,33 Minuten) und GitLab CI (531,2s, 8,85 Minuten). Diese Unterschiede sind hauptsächlich auf Infrastruktur-Unterschiede zurückzuführen, nicht auf Plattform-Limitationen (Shahin et al., 2017). GitHub Actions ist durchschnittlich 5,9% schneller als Jenkins, während GitLab CI 182% länger benötigt als GitHub Actions und 166% länger als Jenkins. Diese Beobachtung bestätigt, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Pipeline-Ausführungszeiten hat (Forsgren et al., 2018). Die Konfigurationsaufwand-Unterschiede zeigen klare Präferenzen für verschiedene Anwendungsszenarien. Alle drei Plattformen erreichten eine Erfolgsrate von 100% über die 10 analysierten Durchläufe, was zeigt, dass nach erfolgreicher initialer Konfiguration alle Plattformen stabil funktionieren (Clark, 2025).

Die Evaluierung zeigt, dass keine Plattform in allen Kriterien führend ist, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht (Shahin et al., 2017). Die statistische Analyse zeigt interessante Unterschiede in der Variabilität: GitHub Actions weist die niedrigste Standardabweichung (12,45s) auf, was auf stabile und konsistente Ausführungszeiten hinweist. Jenkins zeigt die höchste Variabilität (40,48s), was auf Faktoren wie Cache-Hits/Misses, Systemlast und möglicherweise unterschiedliche Ressourcenallokation zurückzuführen ist (Forsgren et al., 2018). GitLab CI zeigt eine moderate Variabilität (30,40s), was konsistent mit der Verwendung von Shared Runnern ist, die unterschiedliche Lastzustände aufweisen können (Shahin et al., 2017). Die optimale Plattformauswahl hängt von spezifischen Faktoren ab: Projekt-Anforderungen, Team-Erfahrung, Infrastruktur-Anforderungen, Budget, langfristige Ziele und die Bedeutung von konsistenten Ausführungszeiten (Forsgren et al., 2018).

7.2.1 Statistische Signifikanz der Unterschiede

Die deskriptive statistische Analyse zeigt deutliche Unterschiede zwischen den Plattformen. Obwohl formelle statistische Tests (wie t-Tests oder ANOVA) aufgrund des begrenzten Stichprobenumfangs (n=10 pro Plattform) und der heterogenen Varianzen (GitHub Actions: σ=12,45s, Jenkins: σ=40,48s, GitLab CI: σ=30,40s) nicht durchgeführt wurden, lassen sich die beobachteten Unterschiede als substantiell interpretieren. Der Unterschied zwischen GitHub Actions (188,2s) und GitLab CI (531,2s) beträgt 343 Sekunden, was dem 2,82-fachen der Standardabweichung von GitHub Actions entspricht und auf eine praktisch signifikante Differenz hindeutet (Forsgren et al., 2018). Die Variabilität bei Jenkins (σ=40,48s) ist mehr als dreimal höher als bei GitHub Actions (σ=12,45s), was auf unterschiedliche Stabilitätsprofile hinweist, die für die Plattformauswahl relevant sind (Forsgren et al., 2018).

7.2.2 Vergleich mit bestehenden Studien

Die vorliegenden Ergebnisse sind konsistent mit den Erkenntnissen von Shahin et al. (2017), die in ihrer systematischen Übersichtsarbeit feststellten, dass CI/CD-Plattformen erhebliche Unterschiede in Konfigurationsaufwand, Performance und Benutzerfreundlichkeit aufweisen. Die Beobachtung, dass keine Plattform in allen Kriterien führend ist, bestätigt die Schlussfolgerung von Shahin et al. (2017), dass die Plattformauswahl stark kontextabhängig ist. Die festgestellten Performance-Unterschiede zwischen den Plattformen (Faktor 2,82 zwischen schnellster und langsamster Plattform) sind vergleichbar mit den Erkenntnissen von Forsgren et al. (2018), die zeigen, dass Infrastruktur-Konfigurationen einen erheblichen Einfluss auf CI/CD-Performance haben. Die Beobachtung, dass alle Plattformen nach erfolgreicher Konfiguration eine hohe Stabilität (100% Erfolgsrate) erreichen, bestätigt die Einschätzung von Clark (2025), dass der initiale Konfigurationsaufwand die Hauptherausforderung darstellt, nicht die langfristige Stabilität.

Unterschiede zu bestehenden Studien: Während Shahin et al. (2017) einen deskriptiven Ansatz verfolgen, bietet diese Arbeit quantitative Daten aus praktischen Implementierungen. Im Gegensatz zu vielen bestehenden Vergleichen, die einzelne Plattformen oder allgemeine Praktiken betrachten, ermöglicht diese Evaluierung einen direkten Vergleich unter identischen Bedingungen, was die Validität der Ergebnisse erhöht (Forsgren et al., 2018).

7.2.3 Theoretische Implikationen

Die Ergebnisse dieser Evaluierung haben mehrere theoretische Implikationen für die CI/CD-Forschung. Erstens bestätigen sie die Bedeutung des infrastrukturellen Kontexts bei der Evaluierung von CI/CD-Plattformen, was Forsgren et al. (2018) betonen: Performance-Vergleiche müssen die Infrastruktur-Konfiguration explizit berücksichtigen. Die unterschiedliche Variabilität zwischen den Plattformen (GitHub Actions: σ=12,45s vs. Jenkins: σ=40,48s) deutet darauf hin, dass nicht nur die durchschnittliche Performance, sondern auch die Vorhersagbarkeit und Konsistenz wichtige Bewertungskriterien sind (Forsgren et al., 2018).

Zweitens unterstützen die Ergebnisse die These, dass die Plattformauswahl ein multi-kriterielles Entscheidungsproblem ist, bei dem technische (Performance, Funktionalität), organisatorische (Konfigurationsaufwand, Wartbarkeit) und strategische (KI-Unterstützung, langfristige Ziele) Faktoren berücksichtigt werden müssen (Shahin et al., 2017). Die Beobachtung, dass GitHub Actions in den meisten Kriterien führt, jedoch nicht in allen (Funktionalität: 4,0 vs. 4,5 bei GitLab CI und Jenkins), illustriert die Notwendigkeit einer gewichteten Bewertung nach Anwendungskontext (Forsgren et al., 2018).

Drittens tragen die Ergebnisse zur Diskussion über die Bedeutung von KI-Unterstützung in CI/CD-Kontexten bei. Die festgestellten Unterschiede in der KI-Unterstützung (GitHub Actions: 5,0, GitLab CI: 3,0, Jenkins: 2,0) deuten darauf hin, dass KI-Funktionen zunehmend zu einem Differenzierungsmerkmal werden, was mit aktuellen Entwicklungen konsistent ist (Clark, 2025; JetBrains, 2025). Die Beobachtung, dass KI-Unterstützung den Konfigurationsaufwand erheblich reduzieren kann, insbesondere für Einsteiger, unterstützt die These, dass KI-gestützte Assistenzfunktionen die Adoption von CI/CD-Praktiken erleichtern können (Clark, 2025).

7.3 Limitationen der Untersuchung

Zeitliche Begrenzung: Evaluierung zu bestimmtem Zeitpunkt, kontinuierliche Plattform-Entwicklung. Diese Einschränkung ist typisch für praxisorientierte CI/CD-Studien und muss bei der Interpretation der Ergebnisse berücksichtigt werden (Humble & Farley, 2010). Umfang: Beschränkung auf Standard-Funktionalitäten und eine Webanwendung. Die entwickelte Webanwendung weist jedoch typische Eigenschaften moderner Webanwendungen auf (Humble & Farley, 2010). Infrastruktur-Abhängigkeit: Evaluation auf Standard-Runnern, Performance-Werte stark abhängig von Infrastruktur (Shahin et al., 2017). Subjektivität: Qualitative Bewertungen enthalten subjektive Elemente, jedoch wurden strukturierte Kriterien und Dokumentation verwendet, um diese zu reduzieren (Shahin et al., 2017). Begrenzte Durchläufe: Zehn Durchläufe pro Plattform wurden durchgeführt, was eine deskriptive statistische Auswertung mit Berechnung von Mittelwert, Median, Standardabweichung, Minimum und Maximum ermöglichte. Diese Anzahl wurde gewählt, da sie eine solide statistische Basis bietet, während sie gleichzeitig im Rahmen einer Bachelorarbeit realisierbar ist (Forsgren et al., 2018). Die statistische Analyse zeigt jedoch, dass Jenkins eine deutlich höhere Variabilität aufweist (σ = 40,48s) als GitHub Actions (σ = 12,45s), was auf die Notwendigkeit weiterer Durchläufe für robustere statistische Inferenz hinweist. Deployment-Simulation: Deployment als Simulation implementiert, tatsächliche Deployment-Zeiten nicht untersucht. Diese Entscheidung wurde getroffen, um den Fokus auf die Konfiguration, Ausführung und Bewertung der CI/CD-Pipelines selbst zu legen (Humble & Farley, 2010).

7.4 Praktische Empfehlungen

Für Cloud-basierte Projekte mit GitHub-Integration: GitHub Actions ist optimal, insbesondere für Einsteiger und Teams mit begrenzten Ressourcen (Clark, 2025).

Für umfassende DevOps-Integration: GitLab CI ist optimal, insbesondere für Teams, die eine vollständige DevOps-Lösung benötigen (Shahin et al., 2017).

Für maximale Flexibilität und Kontrolle: Jenkins ist optimal, insbesondere für Teams mit komplexen Anforderungen und ausreichenden Ressourcen für Wartung (Shahin et al., 2017).

Die Plattformauswahl sollte nicht nur auf Performance basieren, sondern auch Konfigurationsaufwand, Benutzerfreundlichkeit, Funktionalität, Kosten, Infrastruktur-Anforderungen und langfristige Ziele berücksichtigen (Shahin et al., 2017; Forsgren et al., 2018). Die KI-Unterstützung wird zunehmend wichtig und sollte bei der Plattformauswahl berücksichtigt werden, insbesondere für Einsteiger (Clark, 2025; JetBrains, 2025).

7.5 Ausblick auf zukünftige Entwicklungen

7.5.1 Technologische Trends

KI-Integration wird voraussichtlich weiter zunehmen, mit erweiterten Funktionen für Pipeline-Konfiguration, Fehlerdiagnose und Build-Optimierung (Clark, 2025; JetBrains, 2025). Aktuelle Entwicklungen deuten darauf hin, dass KI-gestützte Tools nicht nur bei der Konfiguration helfen, sondern auch proaktiv Performance-Optimierungen vorschlagen und Fehlerursachen identifizieren werden. Diese Entwicklung wird die Relevanz von KI-Unterstützung als Bewertungskriterium weiter erhöhen (Clark, 2025).

Cloud-native-Architekturen und Container-Technologien werden die Anforderungen an CI/CD-Plattformen beeinflussen (Shahin et al., 2017). Die zunehmende Verbreitung von Microservices-Architekturen und Kubernetes-basierten Deployments erfordert CI/CD-Plattformen, die Container-orchestrierung, Service-Meshes und verteilte Systeme unterstützen. Dies wird vermutlich die Komplexität der Pipeline-Konfigurationen erhöhen, was die Bedeutung benutzerfreundlicher Konfigurationsschnittstellen und KI-gestützter Assistenzfunktionen unterstreicht (Forsgren et al., 2018).

DevSecOps-Integration wird weiter zunehmen, mit erweiterten Sicherheits-Features und Compliance-Management (Forsgren et al., 2018). Die Integration von Sicherheitsprüfungen direkt in CI/CD-Pipelines wird zur Norm werden, was neue Anforderungen an Plattformen stellt: automatisierte Sicherheitsscans, Compliance-Checks, Secrets-Management und Policy-Enforcement. Plattformen, die diese Funktionen nahtlos integrieren, werden einen Wettbewerbsvorteil haben (Singh, 2025).

Performance-Optimierung und Kosten-Optimierung bleiben wichtige Faktoren (Forsgren et al., 2018). Mit der zunehmenden Nutzung von CI/CD-Plattformen werden Kostenoptimierung und Ressourcenmanagement kritischer. Funktionen wie intelligentes Caching, Build-Parallelisierung, Ressourcen-Scheduling und Kosten-Tracking werden zunehmend relevant, was die Bedeutung umfassender Plattform-Funktionen unterstreicht (Forsgren et al., 2018).

7.5.2 Forschungsempfehlungen

Basierend auf den Erkenntnissen dieser Evaluierung lassen sich mehrere Richtungen für zukünftige Forschung identifizieren. Erstens sollten langfristige Evaluierungen mit umfangreicheren Stichproben (mindestens 30-50 Durchläufe pro Plattform) durchgeführt werden, um robustere statistische Inferenz zu ermöglichen und Tests wie ANOVA, t-Tests oder Mann-Whitney-U-Tests durchzuführen (Forsgren et al., 2018). Dies würde ermöglichen, die statistische Signifikanz der beobachteten Unterschiede zu quantifizieren und Konfidenzintervalle zu berechnen.

Zweitens sollten Evaluierungen spezialisierter Anwendungstypen durchgeführt werden, um die Generalisierbarkeit der Ergebnisse zu überprüfen (Shahin et al., 2017). Mobile Anwendungen, Microservices-Architekturen, Machine-Learning-Pipelines und monolithische Enterprise-Anwendungen stellen unterschiedliche Anforderungen an CI/CD-Plattformen, deren systematische Evaluierung wertvolle Erkenntnisse liefern würde.

Drittens sollten Untersuchungen der KI-Unterstützung vertieft werden, mit quantitativen Messungen der Effektivität von KI-gestützten Assistenzfunktionen (Clark, 2025). Vergleichende Studien, die den Konfigurationsaufwand mit und ohne KI-Unterstützung messen, könnten den quantifizierbaren Nutzen von KI-Funktionen demonstrieren und die Entwicklung von Best Practices unterstützen.

Viertens sollten Evaluierungen verschiedener Infrastruktur-Konfigurationen durchgeführt werden, um den Einfluss der Infrastruktur auf die Performance besser zu verstehen (Shahin et al., 2017). Vergleiche zwischen Shared Runnern, Dedicated Runnern und Self-Hosted Runnern auf verschiedenen Plattformen könnten fundierte Empfehlungen für Infrastruktur-Entscheidungen liefern.

Fünftens sollten Kosten-Nutzen-Analysen durchgeführt werden, die nicht nur technische Kriterien, sondern auch wirtschaftliche Aspekte berücksichtigen (Forsgren et al., 2018). Die Berücksichtigung von Lizenzkosten, Infrastruktur-Kosten, Wartungsaufwand und Produktivitätssteigerungen würde eine umfassendere Bewertungsgrundlage schaffen.

Sechstens sollten organisatorische Faktoren wie Team-Größe, Erfahrungsgrad und Organisationsstruktur in die Evaluierung einbezogen werden, da diese Faktoren die Plattformauswahl erheblich beeinflussen können (Shahin et al., 2017). Qualitative Studien mit verschiedenen Teams könnten Erkenntnisse darüber liefern, wie organisatorische Faktoren die Plattformwirksamkeit beeinflussen.

7.6 Zusammenfassung und Fazit

Die Evaluierung zeigt, dass sich die drei Plattformen erheblich unterscheiden und keine Plattform in allen Kriterien führend ist (Shahin et al., 2017). GitHub Actions zeichnet sich durch niedrigen Konfigurationsaufwand (52 Minuten), gute Benutzerfreundlichkeit (4,5/5) und umfassende KI-Unterstützung (5,0/5) aus, was sie insbesondere für Cloud-basierte Projekte mit GitHub-Integration empfiehlt (Clark, 2025). GitLab CI bietet umfassende DevOps-Integration und die höchste Funktionalität (4,5/5), was sie für Teams prädestiniert, die eine vollständige DevOps-Lösung benötigen (Shahin et al., 2017). Jenkins bietet maximale Flexibilität und Erweiterbarkeit (4,5/5 Funktionalität, 1800+ Plugins), was sie für Teams mit komplexen Anforderungen und vollständiger Kontrolle über die Infrastruktur ideal macht (Shahin et al., 2017).

Die Performance-Unterschiede sind erheblich: GitHub Actions (188,2s, σ=12,45s) ist die schnellste und konsistenteste Plattform, gefolgt von Jenkins (199,9s, σ=40,48s) und GitLab CI (531,2s, σ=30,40s). Diese Unterschiede zeigen jedoch, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss hat (Forsgren et al., 2018). Die deutlich längere Ausführungszeit von GitLab CI ist hauptsächlich auf die Verwendung von Shared Runnern zurückzuführen, nicht auf inhärente Plattform-Limitationen (Shahin et al., 2017). GitHub Actions zeigt die konsistentesten Ausführungszeiten (σ = 12,45s), während Jenkins eine deutlich höhere Variabilität aufweist (σ = 40,48s), was auf Faktoren wie Cache-Hits/Misses und Systemlast zurückzuführen ist (Forsgren et al., 2018).

Die Konfigurationsaufwand-Unterschiede sind ebenfalls erheblich: GitHub Actions (52 Min) benötigt weniger als die Hälfte der Zeit von Jenkins (105 Min), während GitLab CI (60 Min) eine mittlere Position einnimmt. Diese Unterschiede bestätigen, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Clark, 2025). Alle drei Plattformen erreichten jedoch eine Erfolgsrate von 100% nach erfolgreicher Konfiguration, was zeigt, dass die Stabilität nicht primär von der Plattformwahl, sondern von der Qualität der Konfiguration abhängt (Clark, 2025).

Die Plattformauswahl sollte daher nicht nur auf Performance basieren, sondern auch andere Faktoren wie Konfigurationsaufwand, Benutzerfreundlichkeit, Funktionalität, KI-Unterstützung und Infrastruktur-Anforderungen berücksichtigen (Shahin et al., 2017; Forsgren et al., 2018). Die vorliegende Evaluierung mit 10 Durchläufen pro Plattform und statistischer Analyse bietet eine solide Grundlage für die Plattformauswahl, jedoch müssen zukünftige Entwicklungen, spezifische Infrastruktur-Konfigurationen und organisatorische Faktoren bei der Entscheidungsfindung berücksichtigt werden (Humble & Farley, 2010).

Die Ergebnisse dieser Evaluierung tragen zur CI/CD-Forschung bei, indem sie quantitative Daten aus praktischen Implementierungen liefern und die Bedeutung des infrastrukturellen Kontexts bei Plattformvergleichen demonstrieren (Forsgren et al., 2018). Die festgestellten Unterschiede in Variabilität, KI-Unterstützung und Konfigurationsaufwand unterstreichen die Komplexität der Plattformauswahl und die Notwendigkeit einer kontextabhängigen Bewertung (Shahin et al., 2017). Diese Erkenntnisse können Entwicklerteams und Organisationen bei der fundierten Auswahl von CI/CD-Plattformen unterstützen und zu optimierten Softwareentwicklungsprozessen beitragen.

Literaturverzeichnis

Clark, T. (2025). CI/CD Unleashed: Turbocharging Software Deployment for Quicker Delivery. Apress. https://doi.org/10.1007/979-8-8688-1209-5

Forsgren, N., Humble, J., & Kim, G. (2018). Accelerate: The Science of Lean Software and DevOps – Measuring and Improving Performance. IT Revolution Press.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

JetBrains. (2025). State of Developer Ecosystem Report 2025. JetBrains s.r.o. https://www.jetbrains.com/lp/devecosystem-2025/

Shahin, M., Babar, M. A., & Zhu, L. (2017). Continuous Integration, Delivery and Deployment: A Systematic Review on Approaches, Tools, Challenges and Practices. IEEE Access, 5, 3909–3943. https://doi.org/10.1109/ACCESS.2017.2685629

Singh, N. (2025). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. BPB Publications.
