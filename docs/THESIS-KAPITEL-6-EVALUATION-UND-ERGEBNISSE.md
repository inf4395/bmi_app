6. Evaluation und Ergebnisse

6.1 Messergebnisse der drei Plattformen

Die Evaluierung erfolgte durch Konfiguration und Ausführung funktional identischer Pipelines auf allen drei Plattformen unter kontrollierten Bedingungen: gleiche Codebasis, identische Testsuites, typische Infrastruktur-Konfigurationen (GitHub-gehostete Runner, GitLab Shared Runners, Jenkins Self-Hosted Runner). Diese Kontrolle der Variablen wurde gewählt, um Unterschiede zwischen den Plattformen isoliert analysieren zu können und interne Validität zu gewährleisten (Forsgren et al., 2018). Die Infrastruktur-Unterschiede reflektieren die charakteristischen Betriebsmodelle der Plattformen und werden in Kapitel 2.5 detailliert erläutert. Pro Plattform wurden mindestens zehn Pipeline-Durchläufe durchgeführt. Diese Anzahl wurde gewählt, da sie eine deskriptive statistische Auswertung mit Berechnung von Mittelwert, Median und Standardabweichung ermöglicht, während sie gleichzeitig im Rahmen einer Bachelorarbeit realisierbar ist (Forsgren et al., 2018).

6.1.1 Build- und Testzeiten

Tabelle 6.1 zeigt die statistische Auswertung der Pipeline-Ausführungszeiten über mindestens zehn Durchläufe pro Plattform. Die statistischen Kennwerte (Mittelwert μ, Median M, Standardabweichung σ, Min/Max) wurden gewählt, da sie eine umfassende Beschreibung der Verteilung der Messergebnisse ermöglichen und Ausreißer identifizieren (Forsgren et al., 2018).

Tabelle 6.1: Statistische Auswertung der Pipeline-Ausführungszeiten (in Sekunden)

Plattform        | Mittelwert (μ) | Median (M) | Standardabweichung (σ) | Min    | Max    | n
-----------------|----------------|-----------|------------------------|--------|--------|---
GitHub Actions   | 188,2          | 183,5     | 12,45                  | 176    | 211    | 10
GitLab CI        | 531,2          | 527,0     | 30,40                  | 497    | 593    | 10
Jenkins          | 199,9          | 200,0     | 40,48                  | 140    | 283    | 10

Quelle: Eigene Darstellung

![Abbildung 6.1: Vergleich der durchschnittlichen Gesamtausführungszeiten](../figures/figure_6_1_total_duration.png)

*Abbildung 6.1 : Vergleich der durchschnittlichen Gesamtausführungszeiten der CI/CD-Pipelines (mit Fehlerbalken für die Standardabweichung)*

Quelle: Eigene Darstellung

GitHub Actions wies mit 188,2 Sekunden (3,14 Minuten) die schnellste Gesamtausführungszeit auf, gefolgt von Jenkins (199,9 Sekunden, 3,33 Minuten) und GitLab CI (531,2 Sekunden, 8,85 Minuten). Diese Unterschiede sind hauptsächlich auf Runner-Verfügbarkeit, Netzwerk-Latenz und Infrastruktur-Umgebung zurückzuführen, nicht auf Plattform-Limitationen (Shahin et al., 2017). Die Performance-Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Pipeline-Ausführungszeiten hat (Forsgren et al., 2018). Die Standardabweichung von Jenkins (40,48s) ist deutlich höher als bei GitHub Actions (12,45s), was auf eine größere Variabilität der Ausführungszeiten bei Jenkins hinweist, wahrscheinlich aufgrund von Faktoren wie Cache-Hits/Misses und Systemlast (Forsgren et al., 2018).

Die deutlich längere Ausführungszeit von GitLab CI (531,2 Sekunden, 8,85 Minuten) im Vergleich zu GitHub Actions (188,2 Sekunden, 3,14 Minuten) und Jenkins (199,9 Sekunden, 3,33 Minuten) lässt sich durch mehrere infrastrukturelle Faktoren erklären. GitLab CI wurde in dieser Evaluierung auf Shared Runnern ausgeführt, die von mehreren Projekten gemeinsam genutzt werden. Diese Shared Runner-Architektur führt zu mehreren Performance-Einschränkungen: Erstens entstehen Wartezeiten in der Queue (durchschnittlich 1,2 Sekunden, Median 0,5 Sekunden), da mehrere Pipelines um die verfügbaren Runner-Ressourcen konkurrieren (Shahin et al., 2017). Zweitens sind die Ressourcenallokationen (CPU, RAM) bei Shared Runnern typischerweise geringer als bei dedizierten Runnern, was zu längeren Ausführungszeiten führt (Forsgren et al., 2018). Drittens kann die Cache-Effizienz bei Shared Runnern reduziert sein, da der Cache zwischen verschiedenen Projekten geteilt wird und häufiger invalidiert wird. Viertens können zusätzliche Overhead-Zeiten durch das Starten und Initialisieren der Runner-Container entstehen, insbesondere wenn die Runner zwischen verschiedenen Projekten wechseln (Shahin et al., 2017). Diese Faktoren erklären, warum GitLab CI in dieser Evaluierung etwa 182% länger benötigte als GitHub Actions und 166% länger als Jenkins. Es ist wichtig zu betonen, dass diese Unterschiede primär auf die verwendete Runner-Konfiguration (Shared vs. Dedicated) zurückzuführen sind und nicht auf inhärente Limitationen der GitLab CI-Plattform selbst. Bei Verwendung dedizierter GitLab Runner oder Self-Hosted Runner können die Ausführungszeiten erheblich reduziert werden (Shahin et al., 2017).

Die parallele Ausführung von Lint- und Test-Jobs reduzierte die Gesamtausführungszeit erheblich. Bei GitHub Actions ergab die parallele Ausführung eine durchschnittliche Gesamtzeit von 13,2 Sekunden für Lint (Mittelwert von max(lint_backend, lint_frontend)) und 28,6 Sekunden für Tests (Mittelwert von max(test_backend, test_frontend)). Diese Beobachtung bestätigt, dass parallele Ausführung ein wichtiger Performance-Faktor in CI/CD-Pipelines ist (Forsgren et al., 2018).

Die E2E-Tests stellten den zeitintensivsten Stage dar: Bei GitHub Actions durchschnittlich 120,2 Sekunden (Median 117s, Bereich 111-141s), bei Jenkins durchschnittlich 122,3 Sekunden (Median 112,5s, Bereich 84-190s), und bei GitLab CI durchschnittlich 360,1 Sekunden (Median 347s, Bereich 331-432s). Diese Unterschiede sind hauptsächlich auf die Installation von Playwright-Browsern, das Starten der Server und die Test-Ausführung zurückzuführen. Die deutlich längere E2E-Test-Dauer bei GitLab CI (durchschnittlich 3x länger als bei den anderen Plattformen) kann zusätzlich auf die reduzierte Ressourcenallokation der Shared Runner zurückgeführt werden (Shahin et al., 2017). Diese Beobachtung ist konsistent mit der Literatur, die E2E-Tests als zeitintensivste Test-Art beschreibt (Humble & Farley, 2010).

![Abbildung 6.5: Vergleich der E2E-Test-Ausführungszeiten](../figures/figure_6_5_e2e.png)

*Abbildung 6.5 : Detaillierter Vergleich der durchschnittlichen Ausführungszeiten der E2E-Tests (mit Fehlerbalken)*

Quelle: Eigene Darstellung

Tabelle 6.2 zeigt die statistische Auswertung der Ausführungszeiten pro Stage. Diese detaillierte Analyse wurde durchgeführt, um zu identifizieren, welche Stages den größten Beitrag zur Gesamtausführungszeit leisten und wo Optimierungspotenzial besteht (Forsgren et al., 2018).

Tabelle 6.2: Statistische Auswertung der Stage-Ausführungszeiten (in Sekunden)

| Stage | Plattform | Mittelwert (μ) | Median (M) | Standardabweichung (σ) | Min | Max |
|-------|-----------|----------------|-----------|------------------------|-----|-----|
| Lint Backend | GitHub Actions | 12,9 | 12,5 | 4,23 | 9 | 24 |
| Lint Backend | GitLab CI | 33,7 | 30,5 | 8,07 | 29 | 56 |
| Lint Backend | Jenkins | 16,1 | 13,0 | 7,74 | 10 | 33 |
| Lint Frontend | GitHub Actions | 13,5 | 13,5 | 2,32 | 10 | 16 |
| Lint Frontend | GitLab CI | 45,8 | 45,0 | 1,69 | 44 | 50 |
| Lint Frontend | Jenkins | 18,4 | 15,5 | 8,32 | 10 | 35 |
| Test Backend | GitHub Actions | 28,6 | 28,0 | 3,60 | 25 | 36 |
| Test Backend | GitLab CI | 46,6 | 45,0 | 4,81 | 42 | 56 |
| Test Backend | Jenkins | 31,9 | 28,5 | 9,84 | 22 | 52 |
| Test Frontend | GitHub Actions | 26,5 | 25,5 | 2,99 | 24 | 34 |
| Test Frontend | GitLab CI | 54,8 | 54,0 | 1,55 | 53 | 57 |
| Test Frontend | Jenkins | 23,8 | 20,5 | 8,78 | 16 | 43 |
| Build Frontend | GitHub Actions | 18,6 | 18,0 | 3,57 | 13 | 23 |
| Build Frontend | GitLab CI | 48,6 | 43,5 | 9,37 | 42 | 67 |
| Build Frontend | Jenkins | 16,1 | 15,0 | 4,82 | 11 | 24 |
| E2E Tests | GitHub Actions | 120,2 | 117,0 | 11,00 | 111 | 141 |
| E2E Tests | GitLab CI | 360,1 | 347,0 | 30,82 | 331 | 432 |
| E2E Tests | Jenkins | 122,3 | 112,5 | 35,20 | 84 | 190 |

Quelle: Eigene Darstellung

Die Analyse zeigt, dass GitLab CI bei allen Stages deutlich längere Ausführungszeiten aufweist, was konsistent mit der Verwendung von Shared Runnern ist. Jenkins zeigt die höchste Variabilität (höchste Standardabweichungen), was auf Faktoren wie Cache-Hits/Misses und Systemlast zurückzuführen ist (Forsgren et al., 2018). GitHub Actions zeigt die konsistentesten Ausführungszeiten (niedrigste Standardabweichungen), was auf eine stabile Infrastruktur und effiziente Cache-Nutzung hinweist (Clark, 2025).

![Abbildung 6.2: Vergleich der Stage-Ausführungszeiten](../figures/figure_6_2_stage_duration.png)

*Abbildung 6.2 : Vergleich der durchschnittlichen Ausführungszeiten pro Stage für die drei Plattformen*

Quelle: Eigene Darstellung

![Abbildung 6.3: Variabilität der Gesamtausführungszeiten](../figures/figure_6_3_variability.png)

*Abbildung 6.3 : Variabilität der Gesamtausführungszeiten der Pipelines (Boxplots mit Mittelwert und Median)*

Quelle: Eigene Darstellung

6.1.2 Erfolgs- und Fehlerraten

Tabelle 6.3 zeigt die Erfolgsraten und Fehlerverteilung über alle Pipeline-Durchläufe. Die Fehlerkategorisierung (Konfiguration, Infrastruktur, Tests, Umgebung) wurde gewählt, da sie eine gezielte Analyse von Fehlerursachen ermöglicht (Forsgren et al., 2018).

Tabelle 6.3: Erfolgsraten

Plattform        | Erfolgsrate | Erfolgreiche Durchläufe | Gesamte Durchläufe
-----------------|------------|------------------------|-------------------
GitHub Actions   | 100%       | 10                      | 10
GitLab CI        | 100%       | 10                      | 10
Jenkins          | 100%       | 10                      | 10

Quelle: Eigene Darstellung

Alle drei Plattformen zeigten eine Erfolgsrate von 100% über die 10 analysierten Durchläufe. Diese hohe Erfolgsrate kann auf mehrere Faktoren zurückgeführt werden: Erstens wurden die Pipelines nach der initialen Konfiguration stabilisiert, was zeigt, dass der initiale Einrichtungsaufwand die Hauptherausforderung darstellt (Clark, 2025). Zweitens ermöglichte die Verwendung identischer Konfigurationsdateien und Testsuites eine faire Vergleichsbasis. Drittens wurden alle exécutions unter kontrollierten Bedingungen durchgeführt, was die Reproduzierbarkeit gewährleistete (Forsgren et al., 2018). Diese Beobachtung ist konsistent mit der Literatur, die den initialen Einrichtungsaufwand als zentrale Hürde bei der Einführung von CI/CD beschreibt, während die Stabilität nach erfolgreicher Konfiguration hoch ist (Clark, 2025).

6.1.3 Aufwand bei Konfiguration und Wartung

Tabelle 6.4 zeigt den Konfigurationsaufwand im Vergleich. Die Metriken (Zeit, Zeilen Code, Jobs/Stages, Wartungsaufwand) wurden gewählt, da sie objektivierbar sind und den Aufwand für die Einrichtung und Wartung quantifizieren (Shahin et al., 2017).

Tabelle 6.4: Konfigurationsaufwand im Vergleich

Plattform        | Initiale Zeit (Min) | Zeilen Code | Anzahl Jobs/Stages | Wartungsaufwand (relativ)
-----------------|---------------------|-------------|-------------------|--------------------------
GitHub Actions   | 52                  | 333         | 6                 | Niedrig (2)
GitLab CI        | 60                  | 295         | 5                 | Mittel (4)
Jenkins          | 105                 | 293         | 5                 | Hoch (6)

Quelle: Eigene Darstellung

GitHub Actions erforderte den geringsten Aufwand (52 Minuten), was auf intuitive YAML-Syntax, umfassende Dokumentation und vorgefertigte Actions zurückgeführt werden kann (Clark, 2025). Jenkins erforderte den höchsten Aufwand (105 Minuten), da die Groovy-Syntax mehr Programmierkenntnisse erfordert (Shahin et al., 2017). Diese Beobachtung bestätigt, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Clark, 2025).

6.1.4 Performance-Tests und zusätzliche Metriken

Die Performance-Test-Suite umfasst 18 Tests (Load, Stress, Scalability, Metriken). Diese Tests wurden implementiert, um realistische CI/CD-Szenarien abzubilden und eine umfassende Evaluierung der Plattformen zu ermöglichen (Humble & Farley, 2010). Alle API-Endpunkte funktionieren innerhalb der definierten Schwellenwerte: Antwortzeiten unter 1 Sekunde, Durchsatz über 5 Requests/Sekunde, Latenz P50 < 100ms, P95 < 200ms, P99 < 500ms. Diese Schwellenwerte wurden gewählt, da sie typische Anforderungen moderner Webanwendungen repräsentieren (Forsgren et al., 2018).

Code-Qualität: Frontend-Coverage 97,1%, Backend-Coverage umfassend, 77 Backend-Tests (inkl. 18 Performance-Tests), 61 Frontend-Tests. Diese umfassende Testabdeckung wurde implementiert, um realistische CI/CD-Szenarien abzubilden (Humble & Farley, 2010).

6.2 Analyse und Diskussion der Ergebnisse

Die Performance-Unterschiede sind erheblich: GitHub Actions (188,2s, 3,14 Minuten) ist 182% schneller als GitLab CI (531,2s, 8,85 Minuten), während Jenkins (199,9s, 3,33 Minuten) 166% schneller als GitLab CI ist. GitHub Actions ist durchschnittlich 5,9% schneller als Jenkins, wobei Jenkins eine deutlich höhere Variabilität aufweist (σ = 40,48s vs. σ = 12,45s bei GitHub Actions). Diese Unterschiede sind hauptsächlich auf Infrastruktur-Unterschiede zurückzuführen, nicht auf Plattform-Limitationen (Shahin et al., 2017). 

Die längere Ausführungszeit von GitLab CI kann durch die Verwendung von Shared Runnern erklärt werden, die mehrere Performance-Faktoren beeinflussen: (1) Queue-Wartezeiten durch Konkurrenz um Runner-Ressourcen, (2) reduzierte Ressourcenallokation (CPU, RAM) im Vergleich zu dedizierten Runnern, (3) weniger effiziente Cache-Nutzung durch gemeinsame Cache-Bereiche zwischen Projekten, und (4) zusätzliche Overhead-Zeiten durch Container-Initialisierung und Kontextwechsel zwischen verschiedenen Projekten (Shahin et al., 2017; Forsgren et al., 2018). Diese Faktoren sind charakteristisch für Shared Runner-Architekturen und erklären die beobachteten Performance-Unterschiede. Bei Verwendung dedizierter oder Self-Hosted Runner würden sich die Ausführungszeiten von GitLab CI voraussichtlich deutlich reduzieren (Shahin et al., 2017).

Die Performance-Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Pipeline-Ausführungszeiten hat (Forsgren et al., 2018). Daher sollten Performance-Vergleiche zwischen CI/CD-Plattformen stets die verwendete Runner-Konfiguration berücksichtigen und dokumentieren, um eine faire und aussagekräftige Bewertung zu gewährleisten.

Alle drei Plattformen erreichten eine Erfolgsrate von 100% über die 10 analysierten Durchläufe. Diese hohe Erfolgsrate zeigt, dass nach erfolgreicher initialer Konfiguration alle Plattformen stabil funktionieren. Die Unterschiede bei der Konfigurationskomplexität beeinflussen jedoch den initialen Einrichtungsaufwand (Shahin et al., 2017). Diese Beobachtung bestätigt, dass die Konfigurationskomplexität zwar den Einrichtungsaufwand beeinflusst, jedoch nicht notwendigerweise die Stabilität nach erfolgreicher Konfiguration (Clark, 2025).

Der Konfigurationsaufwand zeigt die größten Unterschiede: GitHub Actions (52 Min) führt deutlich vor GitLab CI (60 Min) und Jenkins (105 Min). Diese Beobachtung bestätigt, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Clark, 2025).

6.3 Bewertung anhand der definierten Kriterien

Tabelle 6.4 zeigt die Bewertung nach Kriterien auf einer 5-Punkte-Skala. Diese Skalenform wurde gewählt, da sie in empirischen Studien weit verbreitet ist und eine ausgewogene Differenzierung ermöglicht (Clark, 2025).

Tabelle 6.5: Bewertung nach Kriterien (1-5 Skala)

Kriterium              | GitHub Actions | GitLab CI | Jenkins
----------------------|----------------|-----------|---------
Setup-Aufwand         | 4.5            | 4.0       | 3.0
Funktionalität        | 4.0            | 4.5       | 4.5
Performance           | 4.5            | 4.3       | 4.0
Benutzerfreundlichkeit| 4.5            | 4.0       | 3.5
KI-Unterstützung      | 5.0            | 3.0       | 2.0

Quelle: Eigene Darstellung

![Abbildung 6.4: Bewertung nach Kriterien](../figures/figure_6_4_criteria.png)

*Abbildung 6.4 : Bewertung der Plattformen nach Kriterien auf einer 1-5 Skala*

Quelle: Eigene Darstellung

GitHub Actions führt in den meisten Kriterien, gefolgt von GitLab CI und Jenkins. Die Bewertung variiert je nach Anwendungsszenario, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht (Shahin et al., 2017).

6.4 Zusammenfassung der Erkenntnisse

GitHub Actions zeichnet sich durch niedrigen Konfigurationsaufwand, gute Benutzerfreundlichkeit und umfassende KI-Unterstützung aus. Ideal für Cloud-basierte Projekte mit GitHub-Integration (Clark, 2025).

GitLab CI bietet umfassende DevOps-Integration mit guter Funktionalität. Ideal für Teams, die eine vollständige DevOps-Lösung benötigen (Shahin et al., 2017).

Jenkins bietet maximale Flexibilität und Erweiterbarkeit. Ideal für Teams mit komplexen Anforderungen und vollständiger Kontrolle über die Infrastruktur (Shahin et al., 2017).

Die Performance-Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss hat (Forsgren et al., 2018). Die Plattformauswahl sollte nicht nur auf Performance basieren, sondern auch Konfigurationsaufwand, Benutzerfreundlichkeit, Funktionalität und Infrastruktur-Anforderungen berücksichtigen (Shahin et al., 2017).

Literaturverzeichnis

Clark, T. (2025). CI/CD Unleashed: Turbocharging Software Deployment for Quicker Delivery. Apress. https://doi.org/10.1007/979-8-8688-1209-5

Forsgren, N., Humble, J., & Kim, G. (2018). Accelerate: The Science of Lean Software and DevOps – Measuring and Improving Performance. IT Revolution Press.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

Shahin, M., Babar, M. A., & Zhu, L. (2017). Continuous Integration, Delivery and Deployment: A Systematic Review on Approaches, Tools, Challenges and Practices. IEEE Access, 5, 3909–3943. https://doi.org/10.1109/ACCESS.2017.2685629

Singh, N. (2025). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. BPB Publications.
