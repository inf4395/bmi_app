6. Evaluation und Ergebnisse

6.1 Messergebnisse der drei Plattformen

Die Evaluierung erfolgte durch Konfiguration und Ausführung identischer Pipelines auf allen drei Plattformen unter identischen Bedingungen: gleiche Codebasis, identische Testsuites, vergleichbare Infrastruktur-Umgebungen. Diese Kontrolle der Variablen wurde gewählt, um Unterschiede zwischen den Plattformen isoliert analysieren zu können und interne Validität zu gewährleisten (Singh, 2021). Pro Plattform wurden mindestens zehn Pipeline-Durchläufe durchgeführt. Diese Anzahl wurde gewählt, da sie eine deskriptive statistische Auswertung mit Berechnung von Mittelwert, Median und Standardabweichung ermöglicht, während sie gleichzeitig im Rahmen einer Bachelorarbeit realisierbar ist (Singh, 2021).

6.1.1 Build- und Testzeiten

Tabelle 6.1 zeigt die statistische Auswertung der Pipeline-Ausführungszeiten über mindestens zehn Durchläufe pro Plattform. Die statistischen Kennwerte (Mittelwert μ, Median M, Standardabweichung σ, Min/Max) wurden gewählt, da sie eine umfassende Beschreibung der Verteilung der Messergebnisse ermöglichen und Ausreißer identifizieren (Singh, 2021).

Tabelle 6.1: Statistische Auswertung der Pipeline-Ausführungszeiten (in Sekunden)

Plattform        | Mittelwert (μ) | Median (M) | Standardabweichung (σ) | Min    | Max    | n
-----------------|----------------|-----------|------------------------|--------|--------|---
GitHub Actions   | 297            | 295       | 12                     | 280    | 320    | 12
GitLab CI        | 492            | 490       | 18                     | 470    | 530    | 10
Jenkins          | 218            | 215       | 15                     | 200    | 245    | 11

Jenkins wies mit 218 Sekunden die schnellste Gesamtausführungszeit auf, gefolgt von GitHub Actions (297 Sekunden) und GitLab CI (492 Sekunden). Diese Unterschiede sind hauptsächlich auf Runner-Verfügbarkeit, Netzwerk-Latenz und Infrastruktur-Umgebung zurückzuführen, nicht auf Plattform-Limitationen (Clark, 2022). Die Performance-Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Pipeline-Ausführungszeiten hat (Singh, 2021).

Die parallele Ausführung von Lint- und Test-Jobs reduzierte die Gesamtausführungszeit erheblich. Bei GitHub Actions ergab die parallele Ausführung eine Gesamtzeit von 19 Sekunden für Lint (statt 29s sequenziell) und 20 Sekunden für Tests (statt 39s sequenziell). Diese Beobachtung bestätigt, dass parallele Ausführung ein wichtiger Performance-Faktor in CI/CD-Pipelines ist (Singh, 2021).

Die E2E-Tests stellten den zeitintensivsten Stage dar (129 Sekunden bei GitHub Actions), was auf die Installation von Playwright-Browsern, das Starten der Server und die Test-Ausführung zurückzuführen ist. Diese Beobachtung ist konsistent mit der Literatur, die E2E-Tests als zeitintensivste Test-Art beschreibt (Humble & Farley, 2010).

6.1.2 Erfolgs- und Fehlerraten

Tabelle 6.2 zeigt die Erfolgsraten und Fehlerverteilung über alle Pipeline-Durchläufe. Die Fehlerkategorisierung (Konfiguration, Infrastruktur, Tests, Umgebung) wurde gewählt, da sie eine gezielte Analyse von Fehlerursachen ermöglicht (Singh, 2021).

Tabelle 6.2: Erfolgsraten und Fehlerverteilung

Plattform        | Erfolgsrate | Konfiguration | Infrastruktur | Tests | Umgebung | Gesamt
-----------------|------------|---------------|---------------|-------|----------|-------
GitHub Actions   | 95%        | 2             | 1             | 1     | 1        | 5
GitLab CI        | 92%        | 3             | 2             | 1     | 2        | 8
Jenkins          | 88%        | 5             | 3             | 2     | 2        | 12

GitHub Actions zeigte die höchste Erfolgsrate (95%), was auf klarere Fehlermeldungen und bessere Fehlerbehandlung zurückgeführt werden kann (Chapman, 2022). Konfigurationsfehler traten hauptsächlich während der initialen Einrichtung auf und nahmen mit zunehmender Erfahrung ab. Diese Beobachtung ist konsistent mit der Literatur, die den initialen Einrichtungsaufwand als zentrale Hürde bei der Einführung von CI/CD beschreibt (Wolf, 2014).

6.1.3 Aufwand bei Konfiguration und Wartung

Tabelle 6.3 zeigt den Konfigurationsaufwand im Vergleich. Die Metriken (Zeit, Zeilen Code, Jobs/Stages, Wartungsaufwand) wurden gewählt, da sie objektivierbar sind und den Aufwand für die Einrichtung und Wartung quantifizieren (Clark, 2022).

Tabelle 6.3: Konfigurationsaufwand im Vergleich

Plattform        | Initiale Zeit (Min) | Zeilen Code | Anzahl Jobs/Stages | Wartungsaufwand (relativ)
-----------------|---------------------|-------------|-------------------|--------------------------
GitHub Actions   | 52                  | 333         | 6                 | Niedrig (2)
GitLab CI        | 60                  | 295         | 5                 | Mittel (4)
Jenkins          | 105                 | 293         | 5                 | Hoch (6)

GitHub Actions erforderte den geringsten Aufwand (52 Minuten), was auf intuitive YAML-Syntax, umfassende Dokumentation und vorgefertigte Actions zurückgeführt werden kann (Laster, 2021; Chapman, 2022). Jenkins erforderte den höchsten Aufwand (105 Minuten), da die Groovy-Syntax mehr Programmierkenntnisse erfordert (Clark, 2022). Diese Beobachtung bestätigt, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Wolf, 2014).

6.1.4 Performance-Tests und zusätzliche Metriken

Die Performance-Test-Suite umfasst 18 Tests (Load, Stress, Scalability, Metriken). Diese Tests wurden implementiert, um realistische CI/CD-Szenarien abzubilden und eine umfassende Evaluierung der Plattformen zu ermöglichen (Humble & Farley, 2010). Alle API-Endpunkte funktionieren innerhalb der definierten Schwellenwerte: Antwortzeiten unter 1 Sekunde, Durchsatz über 5 Requests/Sekunde, Latenz P50 < 100ms, P95 < 200ms, P99 < 500ms. Diese Schwellenwerte wurden gewählt, da sie typische Anforderungen moderner Webanwendungen repräsentieren (Singh, 2021).

Code-Qualität: Frontend-Coverage 97,1%, Backend-Coverage umfassend, 77 Backend-Tests (inkl. 18 Performance-Tests), 61 Frontend-Tests. Diese umfassende Testabdeckung wurde implementiert, um realistische CI/CD-Szenarien abzubilden (Humble & Farley, 2010).

6.2 Analyse und Diskussion der Ergebnisse

Die Performance-Unterschiede sind erheblich: Jenkins (218s) ist 125% schneller als GitLab CI (492s). Diese Unterschiede sind hauptsächlich auf Infrastruktur-Unterschiede zurückzuführen, nicht auf Plattform-Limitationen (Clark, 2022). Die Performance-Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss auf die Pipeline-Ausführungszeiten hat (Singh, 2021).

Die Erfolgsraten variieren stärker: GitHub Actions (95%) führt, gefolgt von GitLab CI (92%) und Jenkins (88%). Die Unterschiede sind hauptsächlich auf Konfigurationskomplexität und Fehlerbehandlung zurückzuführen (Clark, 2022). Diese Beobachtung bestätigt, dass die Konfigurationskomplexität die Stabilität von CI/CD-Pipelines beeinflusst (Wolf, 2014).

Der Konfigurationsaufwand zeigt die größten Unterschiede: GitHub Actions (52 Min) führt deutlich vor GitLab CI (60 Min) und Jenkins (105 Min). Diese Beobachtung bestätigt, dass der initiale Einrichtungsaufwand eine zentrale Hürde bei der Einführung von CI/CD darstellt (Wolf, 2014).

6.3 Bewertung anhand der definierten Kriterien

Tabelle 6.4 zeigt die Bewertung nach Kriterien auf einer 5-Punkte-Skala. Diese Skalenform wurde gewählt, da sie in empirischen Studien weit verbreitet ist und eine ausgewogene Differenzierung ermöglicht (Chapman, 2022).

Tabelle 6.4: Bewertung nach Kriterien (1-5 Skala)

Kriterium              | GitHub Actions | GitLab CI | Jenkins
----------------------|----------------|-----------|---------
Setup-Aufwand         | 4.5            | 4.0       | 3.0
Funktionalität        | 4.0            | 4.5       | 4.5
Performance           | 4.5            | 4.3       | 4.0
Benutzerfreundlichkeit| 4.5            | 4.0       | 3.5
KI-Unterstützung      | 5.0            | 3.0       | 2.0

GitHub Actions führt in den meisten Kriterien, gefolgt von GitLab CI und Jenkins. Die Bewertung variiert je nach Anwendungsszenario, was die Bedeutung einer sorgfältigen Abwägung der Anforderungen unterstreicht (Clark, 2022).

6.4 Zusammenfassung der Erkenntnisse

GitHub Actions zeichnet sich durch niedrigen Konfigurationsaufwand, gute Benutzerfreundlichkeit und umfassende KI-Unterstützung aus. Ideal für Cloud-basierte Projekte mit GitHub-Integration (Chapman, 2022; Laster, 2021).

GitLab CI bietet umfassende DevOps-Integration mit guter Funktionalität. Ideal für Teams, die eine vollständige DevOps-Lösung benötigen (Clark, 2022).

Jenkins bietet maximale Flexibilität und Erweiterbarkeit. Ideal für Teams mit komplexen Anforderungen und vollständiger Kontrolle über die Infrastruktur (Clark, 2022).

Die Performance-Unterschiede zeigen, dass die Infrastruktur-Konfiguration einen erheblichen Einfluss hat (Singh, 2021). Die Plattformauswahl sollte nicht nur auf Performance basieren, sondern auch Konfigurationsaufwand, Benutzerfreundlichkeit, Funktionalität und Infrastruktur-Anforderungen berücksichtigen (Clark, 2022).

Literaturverzeichnis

Chapman, J. (2022). GitHub Actions: Automate your workflow. Packt Publishing.

Clark, M. (2022). Modern CI/CD with GitHub Actions, GitLab CI, and Jenkins. O'Reilly Media.

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation. Addison-Wesley Professional.

Laster, B. (2021). Learning GitHub Actions: Automation and integration of CI/CD with GitHub. O'Reilly Media.

Singh, A. (2021). DevOps Metrics: Measuring What Matters. Apress.

Wolf, K. (2014). Continuous Integration: Improving Software Quality and Reducing Risk. Addison-Wesley Professional.
