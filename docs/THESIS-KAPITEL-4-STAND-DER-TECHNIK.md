4. Stand der Technik: CI/CD-Plattformen im Vergleich

4.1 Überblick über aktuelle CI/CD-Lösungen

Die untersuchten CI/CD-Plattformen werden anhand folgender technischer Kriterien verglichen: Architektur und Ausführungsmodell, Konfigurationsmodell, Funktionsumfang, Performance, Benutzerfreundlichkeit sowie KI-Unterstützung.

GitHub Actions, GitLab CI und Jenkins erfüllen dieselbe grundlegende Funktion (Automatisierung von Build-, Test- und Integrationsprozessen), unterscheiden sich jedoch erheblich in ihren architektonischen Ansätzen.

4.2 GitHub Actions

GitHub Actions ist eine cloud-basierte CI/CD-Plattform, direkt in GitHub integriert. Workflows werden ereignisgesteuert ausgelöst (Code-Commits, Pull Requests) und auf GitHub-gehosteten Runnern (Linux, Windows, macOS) oder selbst-gehosteten Runnern ausgeführt (Chapman, 2022).

Konfiguration erfolgt deklarativ über YAML-Dateien im `.github/workflows/` Verzeichnis. Die Plattform bietet einen umfangreichen Marketplace mit wiederverwendbaren Actions, parallele Job-Ausführung, Matrix-Builds, Caching und Secrets-Management (Laster, 2021; Chapman, 2022).

Die Benutzeroberfläche ist in GitHub integriert. KI-Unterstützung erfolgt durch GitHub Copilot, das Workflow-Konfigurationen basierend auf natürlicher Sprache generieren kann (Chapman, 2022).

4.3 GitLab CI

GitLab CI ist integraler Bestandteil der GitLab-DevOps-Plattform. Die Konfiguration erfolgt über eine `.gitlab-ci.yml` Datei im Repository-Root. Die Architektur basiert auf GitLab-Runnern (Shared, projektspezifisch oder selbst-gehostet), die auf verschiedenen Plattformen (Linux, Windows, macOS, Docker, Kubernetes) ausgeführt werden können (Clark, 2022).

Die Plattform bietet umfassende CI/CD-Funktionen: parallele Jobs, Matrix-Builds, Caching, Artifact-Management, Coverage-Reports, Environment-Management. Docker-in-Docker wird unterstützt, ist jedoch auf Shared Runnern möglicherweise nicht verfügbar (Clark, 2022).

Die Benutzeroberfläche ist vollständig in GitLab integriert. KI-Unterstützung ist begrenzt und fokussiert sich stärker auf Code-Review als auf CI/CD-Konfiguration (Clark, 2022).

4.4 Jenkins

Jenkins ist eine Open-Source-CI/CD-Plattform mit Controller-Agent-Architektur. Die Konfiguration erfolgt über Jenkinsfiles in Groovy-Syntax, die als Pipeline-as-Code im Repository versioniert werden können (Clark, 2022).

Die Plattform zeichnet sich durch eine umfangreiche Plugin-Ökologie (über 1800 Plugins) aus, die nahezu jede Integration ermöglicht. Jenkins unterstützt parallele Builds, Matrix-Builds, Pipeline-Stages mit Dependencies sowie erweiterte Features wie Shared Libraries und Credentials-Management (Clark, 2022).

Die Benutzeroberfläche ist funktional, jedoch weniger modern als cloud-basierte Lösungen. Blue Ocean bietet eine modernere Visualisierung, erfordert jedoch zusätzliche Installation. Jenkins verfügt über keine native KI-Unterstützung (Clark, 2022).

4.5 Vergleich der Plattformen

4.5.1 Architektur und Infrastruktur

GitHub Actions: Cloud-native, verwaltete Infrastruktur, automatische Skalierung, keine Infrastruktur-Wartung erforderlich. Abhängigkeit von GitHub-Infrastruktur.

GitLab CI: Hybrid (Cloud/Self-Hosted), flexible Runner-Konfigurationen, hohe Flexibilität. Potenziell höherer Konfigurationsaufwand bei Self-Hosted.

Jenkins: Self-Hosted, Controller-Agent-Modell, vollständige Kontrolle über Infrastruktur, keine Vendor-Lock-in. Höherer Wartungsaufwand erforderlich.

Tabelle 4.1: Vergleich der CI/CD-Plattformen hinsichtlich Architektur und Infrastruktur

Kriterium              | GitHub Actions              | GitLab CI                  | Jenkins
----------------------|----------------------------|----------------------------|----------------------------
Architektur           | Cloud-native, verwaltet     | Hybrid (Cloud/Self-Hosted) | Self-Hosted, Controller-Agent
Infrastruktur         | GitHub-gehostete Runner     | GitLab Runner (verschiedene)| Benutzerverwaltete Infrastruktur
Skalierbarkeit        | Automatisch                 | Abhängig von Konfiguration | Manuell konfigurierbar
Wartungsaufwand       | Sehr gering                 | Niedrig (Cloud) / Hoch (Self-Hosted)| Hoch (selbst-gehostet)
Vendor-Lock-in        | GitHub                      | GitLab (Cloud) / gering (Self-Hosted)| Kein

4.5.2 Funktionsumfang und Erweiterbarkeit

GitHub Actions: Umfangreicher Funktionsumfang durch Marketplace-Actions. Erweiterbarkeit über Custom Actions (JavaScript, TypeScript, Docker).

GitLab CI: Umfassende CI/CD-Funktionen als Teil der DevOps-Plattform. Erweiterbarkeit über Custom Runners und CI/CD-Variablen.

Jenkins: Größter Funktionsumfang durch Plugin-Ökologie (1800+ Plugins). Erweiterbarkeit über Custom Plugins (Java) und Shared Libraries (Groovy).

4.5.3 Benutzerfreundlichkeit und Dokumentation

GitHub Actions: Hohe Benutzerfreundlichkeit, intuitive YAML-Syntax, umfassende Dokumentation, KI-Unterstützung durch Copilot (Laster, 2021; Chapman, 2022).

GitLab CI: Gute Benutzerfreundlichkeit, ähnliche YAML-Syntax wie GitHub Actions, umfassende Dokumentation, CI/CD-Templates (Clark, 2022).

Jenkins: Moderate Benutzerfreundlichkeit, komplexere Groovy-Syntax, umfangreiche aber weniger einheitliche Dokumentation, steilere Lernkurve (Clark, 2022).

4.5.4 Performance und Stabilität

Die Performance hängt maßgeblich von der Infrastruktur-Konfiguration ab. GitHub Actions profitiert von verwalteter Infrastruktur und automatischer Skalierung. GitLab CI bietet vergleichbare Performance-Eigenschaften, wobei die Stabilität stark vom Betriebsmodell abhängt. Bei Jenkins ist die Performance maßgeblich von der Infrastrukturkonfiguration abhängig und erfordert manuelle Optimierung (Clark, 2022).

4.5.5 KI-Unterstützung

GitHub Actions bietet die umfassendste KI-Unterstützung durch GitHub Copilot (Chapman, 2022). GitLab CI integriert erste KI-Funktionen, die sich jedoch stärker auf Code-Review konzentrieren (Clark, 2022). Jenkins verfügt über keine native KI-Unterstützung.

4.6 Zwischenfazit

Keine Plattform ist universell überlegen. GitHub Actions eignet sich für Teams mit GitHub-Ökosystem und geringem Betriebsaufwand. GitLab CI adressiert Organisationen, die eine integrierte DevOps-Plattform benötigen. Jenkins richtet sich an Teams mit spezifischen Anforderungen und maximaler Kontrolle (Clark, 2022). Die nachfolgende empirische Evaluation zielt darauf ab, diese Unterschiede anhand messbarer Kriterien systematisch zu untersuchen.

Literaturverzeichnis (Kapitel 4)

Chapman, J. (2022). GitHub Actions: Automate your workflow. Packt Publishing.

Clark, M. (2022). Modern CI/CD with GitHub Actions, GitLab CI, and Jenkins. O'Reilly Media.

Laster, B. (2021). Learning GitHub Actions: Automation and integration of CI/CD with GitHub. O'Reilly Media.
