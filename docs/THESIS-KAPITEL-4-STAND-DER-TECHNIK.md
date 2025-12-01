4. Stand der Technik: CI/CD-Plattformen im Vergleich

4.1 Überblick über aktuelle CI/CD-Lösungen

Die CI/CD-Landschaft umfasst eine Vielzahl von Plattformen, die sich in Architektur, Funktionsumfang, Kostenmodell und Zielgruppe unterscheiden. Cloud-basierte Lösungen wie GitHub Actions, GitLab CI und CircleCI bieten verwaltete Infrastruktur und einfache Einrichtung, während selbst-gehostete Lösungen wie Jenkins und GitLab Self-Hosted mehr Kontrolle und Anpassungsmöglichkeiten bieten (Clark, 2022).

Die Auswahl einer CI/CD-Plattform hängt von verschiedenen Faktoren ab: Projektgröße und -komplexität, Team-Größe und -Erfahrung, Budget und Kostenmodell, Anforderungen an Sicherheit und Compliance, Integration mit bestehenden Tools und Infrastruktur sowie spezifische Feature-Anforderungen (Singh, 2021). Aktuelle Studien zeigen, dass über 80% der Entwicklerteams CI/CD-Tools nutzen, wobei die Plattformauswahl eine zentrale Herausforderung darstellt (JetBrains, 2023).

GitHub Actions, GitLab CI und Jenkins zählen zu den am weitesten verbreiteten CI/CD-Plattformen. GitHub Actions ist als native Lösung für GitHub-Repositories konzipiert und bietet nahtlose Integration mit dem Versionskontrollsystem (Laster, 2021; Chapman, 2022). GitLab CI ist Teil der umfassenden GitLab-DevOps-Plattform und bietet integrierte Lösungen für den gesamten Softwareentwicklungslebenszyklus (Clark, 2022). Jenkins als Open-Source-Lösung zeichnet sich durch hohe Flexibilität und umfangreiche Plugin-Ökologie aus (Clark, 2022).

Weitere relevante CI/CD-Plattformen umfassen CircleCI, Travis CI, Azure DevOps, Bamboo und TeamCity. Diese werden in der vorliegenden Arbeit nicht detailliert untersucht, da der Fokus auf den drei führenden Plattformen liegt, die unterschiedliche Architekturansätze repräsentieren: Cloud-native (GitHub Actions), integrierte DevOps-Plattform (GitLab CI) und selbst-gehostete Open-Source-Lösung (Jenkins).

4.2 GitHub Actions

GitHub Actions ist eine CI/CD-Plattform, die direkt in GitHub integriert ist und 2019 eingeführt wurde. Die Plattform ermöglicht es Entwicklern, Workflows direkt im Repository zu definieren, ohne externe CI/CD-Systeme zu benötigen (Laster, 2021). Workflows werden in YAML-Dateien definiert, die im `.github/workflows/` Verzeichnis gespeichert werden, was eine versionierte Konfiguration ermöglicht.

Die Architektur von GitHub Actions basiert auf einem Event-getriebenen Modell, bei dem Workflows durch verschiedene Events ausgelöst werden können: Push-Events, Pull-Request-Events, manuelle Trigger (workflow_dispatch) oder geplante Events (cron). Jobs werden auf GitHub-gehosteten Runnern (ubuntu-latest, windows-latest, macos-latest) oder selbst-gehosteten Runnern ausgeführt (Chapman, 2022).

GitHub Actions bietet eine umfangreiche Marketplace-Bibliothek von vorgefertigten Actions, die wiederverwendbare Workflow-Komponenten darstellen. Diese Actions ermöglichen es, komplexe Workflows mit minimalem Konfigurationsaufwand zu erstellen. Beispiele umfassen Actions für Node.js-Setup, Docker-Builds, Code-Checkout und Deployment zu verschiedenen Plattformen (Laster, 2021).

Die Plattform unterstützt parallele Job-Ausführung, Matrix-Builds für Tests auf mehreren Plattformen und Sprachen, Caching-Mechanismen zur Beschleunigung von Builds sowie Secrets-Management für sichere Speicherung von Credentials. GitHub Actions bietet kostenlose Minuten für öffentliche Repositories und private Repositories mit begrenzten kostenlosen Minuten (Chapman, 2022).

Die Integration von KI-Funktionen wie GitHub Copilot unterstützt Entwickler bei der Erstellung von Workflow-Definitionen. Copilot kann Workflow-YAML-Dateien basierend auf natürlicher Sprache generieren und Vorschläge für Actions und Konfigurationen machen (Chapman, 2022). Diese KI-Unterstützung reduziert den Konfigurationsaufwand und macht die Plattform für Einsteiger zugänglicher.

Die Benutzeroberfläche von GitHub Actions ist direkt in die GitHub-Weboberfläche integriert, was eine nahtlose Erfahrung für Teams bietet, die bereits GitHub verwenden. Workflow-Ausführungen werden visuell dargestellt, Logs sind direkt zugänglich, und Fehler werden klar hervorgehoben. Die Integration mit Pull-Requests ermöglicht es, Workflow-Status direkt in PRs anzuzeigen (Laster, 2021).

4.3 GitLab CI

GitLab CI ist als integrierter Bestandteil der GitLab-DevOps-Plattform konzipiert und bietet eine umfassende Lösung für den gesamten Softwareentwicklungslebenszyklus. Die CI/CD-Funktionalität ist nahtlos in GitLab integriert, was eine einheitliche Erfahrung für Versionskontrolle, Issue-Tracking, Code-Review und CI/CD bietet (Clark, 2022).

Die Konfiguration von GitLab CI erfolgt über eine `.gitlab-ci.yml` Datei im Repository-Root. Die YAML-basierte Syntax ermöglicht die Definition von Stages, Jobs, Dependencies und Deployment-Umgebungen. GitLab CI unterstützt erweiterte Features wie parallele Jobs, Matrix-Builds, bedingte Job-Ausführung und manuelle Deployment-Gates (Clark, 2022).

Die Architektur von GitLab CI basiert auf GitLab-Runnern, die als separate Anwendungen installiert werden können. GitLab bietet Shared Runners für alle Projekte, spezifische Runners für einzelne Projekte sowie selbst-gehostete Runners für vollständige Kontrolle. Runner können auf verschiedenen Plattformen (Linux, Windows, macOS, Docker, Kubernetes) ausgeführt werden, was hohe Flexibilität bietet.

GitLab CI bietet umfassende Caching-Mechanismen zur Beschleicherung von Builds, Artifact-Management für Build-Artefakte, Coverage-Reports für Testabdeckung sowie Environment-Management für Staging- und Produktions-Umgebungen. Die Plattform unterstützt Docker-in-Docker für Container-Builds, obwohl dies auf Shared Runnern möglicherweise nicht verfügbar ist (Clark, 2022).

Die Benutzeroberfläche von GitLab CI ist in die GitLab-Weboberfläche integriert und bietet visuelle Pipeline-Darstellungen, detaillierte Job-Logs, Test-Reports und Coverage-Visualisierungen. Die Integration mit Merge Requests ermöglicht es, Pipeline-Status direkt in MRs anzuzeigen und Deployments zu verwalten. GitLab bietet auch CI/CD-Analytics zur Überwachung von Pipeline-Performance und Trends.

GitLab bietet verschiedene Lizenzmodelle: eine kostenlose Community Edition (CE) mit grundlegenden CI/CD-Features, eine kostenpflichtige Enterprise Edition (EE) mit erweiterten Features wie Advanced Security, Compliance-Management und erweiterte CI/CD-Funktionalitäten. Die Self-Hosted-Option ermöglicht vollständige Kontrolle über Infrastruktur und Daten (Clark, 2022).

4.4 Jenkins

Jenkins ist eine Open-Source-CI/CD-Plattform, die 2011 aus dem Hudson-Projekt hervorging und eine der ältesten und etabliertesten CI/CD-Lösungen darstellt. Jenkins zeichnet sich durch hohe Flexibilität und Erweiterbarkeit aus, die durch eine umfangreiche Plugin-Ökologie ermöglicht wird (Clark, 2022).

Die Architektur von Jenkins basiert auf einem Master-Agent-Modell, wobei der Jenkins-Master die Workflow-Orchestrierung übernimmt und Agents (früher Slaves) die tatsächliche Ausführung von Builds durchführen. Jenkins kann auf verschiedenen Plattformen installiert werden und unterstützt verteilte Builds über mehrere Agents. Die Plattform kann als Standalone-Anwendung, in Docker-Containern oder auf Kubernetes-Clustern betrieben werden.

Die Konfiguration von Jenkins erfolgt über Jenkinsfiles, die in Groovy-Script-Syntax geschrieben werden. Jenkinsfiles können entweder als Pipeline-as-Code im Repository gespeichert werden (declarative oder scripted Pipeline) oder über die Jenkins-Weboberfläche konfiguriert werden. Die Groovy-Syntax bietet hohe Flexibilität, erfordert jedoch mehr Programmierkenntnisse als YAML-basierte Konfigurationen (Clark, 2022).

Jenkins bietet eine umfangreiche Plugin-Ökologie mit über 1800 verfügbaren Plugins für verschiedene Integrationen, Build-Tools, Test-Frameworks, Deployment-Targets und Erweiterungen. Diese Plugins ermöglichen es, Jenkins an nahezu jede Anforderung anzupassen. Beispiele umfassen Plugins für Docker, Kubernetes, Git, Maven, Gradle, JUnit, Selenium und viele mehr (Clark, 2022).

Die Plattform unterstützt parallele Build-Ausführung, Matrix-Builds, Pipeline-Stages mit Dependencies, Blue Ocean für moderne Pipeline-Visualisierung sowie umfassende Build-Historie und Artefakt-Verwaltung. Jenkins bietet auch erweiterte Features wie Pipeline-Shared-Libraries für wiederverwendbare Pipeline-Komponenten, Credentials-Management für sichere Speicherung von Secrets und Build-Trigger für verschiedene Events (Clark, 2022).

Die Benutzeroberfläche von Jenkins ist funktional, aber weniger modern als cloud-basierte Lösungen. Die klassische Jenkins-UI bietet Zugriff auf Build-Historie, Konsole-Logs, Test-Reports und Konfiguration. Blue Ocean bietet eine modernere, visuelle Pipeline-Darstellung, die jedoch als separates Plugin installiert werden muss. Die Konfiguration über die Web-UI kann komplex sein, insbesondere für Anfänger (Clark, 2022).

Jenkins ist vollständig Open-Source und kostenlos, erfordert jedoch selbst-gehostete Infrastruktur, was mit Wartungs- und Betriebskosten verbunden ist. Die Einrichtung und Konfiguration von Jenkins erfordert typischerweise mehr Zeit und Expertise als cloud-basierte Lösungen. Die Wartung umfasst Updates, Plugin-Management, Sicherheits-Patches und Infrastruktur-Management (Clark, 2022).

4.5 Vergleich der Plattformen

4.5.1 Architektur und Infrastruktur

GitHub Actions basiert auf einer vollständig verwalteten Cloud-Infrastruktur, die von GitHub gehostet wird. Die Plattform verwendet GitHub-gehostete Runner (ubuntu-latest, windows-latest, macos-latest) oder selbst-gehostete Runner für spezifische Anforderungen. Die Architektur ist Event-getrieben und skaliert automatisch basierend auf Workload (Chapman, 2022). Vorteile umfassen keine Infrastruktur-Wartung, automatische Skalierung und sofortige Verfügbarkeit. Nachteile sind Abhängigkeit von GitHub-Infrastruktur und begrenzte Kontrolle über Runner-Umgebungen.

GitLab CI bietet eine hybride Architektur mit GitLab-gehosteten Shared Runnern und der Möglichkeit, selbst-gehostete Runner zu verwenden. Die Plattform kann als Cloud-Service (GitLab.com) oder als Self-Hosted-Installation betrieben werden. Runner können auf verschiedenen Plattformen installiert werden, was hohe Flexibilität bietet (Clark, 2022). Vorteile umfassen Flexibilität zwischen Cloud und Self-Hosted, umfassende Runner-Optionen und Integration in die GitLab-Platform. Nachteile sind möglicherweise komplexere Konfiguration für Self-Hosted und Abhängigkeit von GitLab-Infrastruktur für Cloud-Version.

Jenkins basiert auf einer selbst-gehosteten Architektur mit Master-Agent-Modell. Die Infrastruktur muss vollständig vom Benutzer verwaltet werden, was vollständige Kontrolle, aber auch Wartungsaufwand bedeutet (Clark, 2022). Vorteile umfassen vollständige Kontrolle über Infrastruktur, keine Vendor-Lock-in, hohe Anpassungsfähigkeit und keine Cloud-Kosten. Nachteile sind Infrastruktur-Wartung erforderlich, manuelle Skalierung, initiale Einrichtungszeit und Betriebskosten.

Vergleichstabelle: Architektur und Infrastruktur

Kriterium              | GitHub Actions              | GitLab CI                  | Jenkins
----------------------|----------------------------|----------------------------|----------------------------
Architektur           | Cloud-native, verwaltet     | Hybrid (Cloud/Self-Hosted) | Self-Hosted, Master-Agent
Infrastruktur         | GitHub-gehostete Runner     | GitLab Runner (verschiedene)| Benutzer-verwaltet
Runner-Plattformen    | ubuntu-latest, windows, macos| Linux, Windows, macOS, Docker, Kubernetes| Verschiedene (selbst konfiguriert)
Skalierbarkeit        | Automatisch                 | Abhängig von Konfiguration | Manuell konfigurierbar
Wartungsaufwand       | Keiner (verwaltet)          | Niedrig (Cloud) / Hoch (Self-Hosted)| Hoch (selbst-gehostet)
Vendor-Lock-in        | GitHub                      | GitLab (Cloud) / Kein (Self-Hosted)| Kein
Kostenmodell          | Kostenlos für öffentliche   | Kostenlos (CE), EE kostenpflichtig| Kostenlos, Infrastruktur-Kosten
                       | Repos, begrenzt für private |                            |

4.5.2 Funktionsumfang und Erweiterbarkeit

GitHub Actions bietet einen umfangreichen Funktionsumfang durch die Marketplace-Bibliothek von Actions. Die Plattform unterstützt parallele Jobs, Matrix-Builds, Caching, Secrets-Management, Artifact-Upload/Download und Deployment zu verschiedenen Plattformen (Laster, 2021; Chapman, 2022). Die Erweiterbarkeit erfolgt hauptsächlich durch Custom Actions, die in JavaScript, TypeScript oder Docker-Containern geschrieben werden können. Die Integration mit GitHub-Features wie Issues, Pull Requests und Packages bietet zusätzliche Funktionalität.

GitLab CI bietet umfassende CI/CD-Features als Teil der GitLab-Platform. Die Plattform unterstützt parallele Jobs, Matrix-Builds, Caching, Artifact-Management, Coverage-Reports, Environment-Management, Docker-in-Docker und Kubernetes-Integration (Clark, 2022). Die Erweiterbarkeit erfolgt durch Custom Runners, CI/CD-Variablen und Integration mit GitLab-Features wie Container Registry, Package Registry und Security Scanning. GitLab EE bietet zusätzliche Features wie Advanced Security, Compliance-Management und erweiterte CI/CD-Funktionalitäten.

Jenkins bietet den umfangreichsten Funktionsumfang durch seine Plugin-Ökologie mit über 1800 verfügbaren Plugins. Die Plattform unterstützt nahezu jede Integration, Build-Tool, Test-Framework und Deployment-Target durch Plugins (Clark, 2022). Die Erweiterbarkeit ist sehr hoch durch Custom Plugins (Java), Shared Libraries (Groovy) und Scripted Pipelines. Jenkins bietet auch erweiterte Features wie Pipeline-as-Code, Blue Ocean für moderne UI, Distributed Builds und umfassende Build-Historie.

Vergleichstabelle: Funktionsumfang und Erweiterbarkeit

Kriterium              | GitHub Actions              | GitLab CI                  | Jenkins
----------------------|----------------------------|----------------------------|----------------------------
Konfigurationssprache | YAML                        | YAML                       | Groovy (Jenkinsfile)
Erweiterbarkeit       | Marketplace Actions         | Custom Runners, Variablen  | 1800+ Plugins
Parallele Ausführung  | Ja                          | Ja                         | Ja
Matrix-Builds         | Ja                          | Ja                         | Ja
Caching               | Ja                          | Ja                         | Durch Plugins
Docker-Unterstützung  | Ja                          | Ja (Docker-in-Docker)      | Durch Plugins
Kubernetes-Integration| Durch Actions               | Native                     | Durch Plugins
Secrets-Management    | GitHub Secrets              | CI/CD-Variablen            | Credentials Plugin
Artifact-Management   | Upload/Download             | Umfassend                  | Umfassend
Coverage-Reports      | Durch Actions               | Native                     | Durch Plugins
Custom-Erweiterungen  | JavaScript, TypeScript, Docker| Custom Runners, Variablen  | Java Plugins, Groovy Libraries

4.5.3 Benutzerfreundlichkeit und Dokumentation

GitHub Actions zeichnet sich durch hohe Benutzerfreundlichkeit aus, insbesondere für Teams, die bereits GitHub verwenden. Die YAML-Syntax ist relativ einfach zu erlernen, die Marketplace-Bibliothek bietet vorgefertigte Actions, und die Integration in GitHub bietet nahtlose Erfahrung (Laster, 2021). Die Dokumentation ist umfassend mit vielen Beispielen und Tutorials. Die KI-Unterstützung durch GitHub Copilot reduziert den Konfigurationsaufwand erheblich (Chapman, 2022). Die Web-UI ist modern und intuitiv mit visueller Pipeline-Darstellung.

GitLab CI bietet gute Benutzerfreundlichkeit mit YAML-basierter Konfiguration, die ähnlich wie GitHub Actions ist. Die Integration in GitLab bietet einheitliche Erfahrung für alle DevOps-Aktivitäten (Clark, 2022). Die Dokumentation ist umfassend mit Beispielen und Best Practices. Die Web-UI ist modern mit visueller Pipeline-Darstellung und detaillierten Logs. GitLab bietet auch CI/CD-Templates für gängige Frameworks und Sprachen.

Jenkins erfordert typischerweise mehr Konfigurationsaufwand und Expertise. Die Groovy-Syntax für Jenkinsfiles ist mächtiger, aber komplexer als YAML. Die Plugin-Ökologie bietet viele Optionen, kann aber auch überwältigend sein (Clark, 2022). Die Dokumentation ist umfangreich, aber aufgrund der Vielzahl von Plugins und Konfigurationsoptionen kann es schwierig sein, die richtige Lösung zu finden. Die klassische Jenkins-UI ist funktional, aber weniger modern. Blue Ocean bietet modernere UI, erfordert jedoch zusätzliche Installation.

Vergleichstabelle: Benutzerfreundlichkeit und Dokumentation

Kriterium              | GitHub Actions              | GitLab CI                  | Jenkins
----------------------|----------------------------|----------------------------|----------------------------
Konfigurationssyntax  | YAML (einfach)              | YAML (einfach)             | Groovy (komplexer)
Einrichtungsaufwand   | Niedrig                     | Mittel                     | Hoch
Benutzeroberfläche    | Modern, integriert          | Modern, integriert         | Funktional, Blue Ocean optional
Lernkurve             | Niedrig                     | Niedrig bis Mittel         | Hoch
Dokumentation         | Umfassend, viele Beispiele  | Umfassend, Templates       | Umfangreich, komplex
Beispiele/Templates   | Marketplace Actions         | CI/CD-Templates            | Plugin-Dokumentation
Community-Support     | Sehr aktiv                  | Aktiv                      | Sehr aktiv
Fehlerbehandlung      | Klare Fehlermeldungen       | Detaillierte Logs          | Umfangreiche Logs

4.5.4 Performance und Stabilität

GitHub Actions bietet gute Performance durch verwaltete Infrastruktur und automatische Skalierung. Die Plattform unterstützt Caching zur Beschleunigung von Builds und parallele Job-Ausführung. Die Stabilität ist hoch durch GitHub-Infrastruktur, die für hohe Verfügbarkeit ausgelegt ist (Chapman, 2022). Build-Zeiten können je nach Workload und Runner-Verfügbarkeit variieren. Kostenlose Minuten sind für öffentliche Repositories unbegrenzt, für private Repositories begrenzt.

GitLab CI bietet gute Performance mit effizienten Caching-Mechanismen und paralleler Job-Ausführung. Die Stabilität hängt von der gewählten Option ab: GitLab.com bietet hohe Verfügbarkeit, Self-Hosted hängt von eigener Infrastruktur ab (Clark, 2022). Build-Zeiten können durch optimierte Runner-Konfiguration und Caching verbessert werden. GitLab.com bietet kostenlose CI/CD-Minuten für alle Projekte, Self-Hosted erfordert eigene Infrastruktur.

Jenkins Performance hängt stark von der Infrastruktur-Konfiguration ab. Die Plattform kann sehr performant sein bei optimaler Konfiguration von Agents und Ressourcen, erfordert jedoch manuelle Optimierung (Clark, 2022). Die Stabilität hängt von der Wartung und Konfiguration ab. Build-Zeiten können durch verteilte Builds und optimierte Agent-Konfiguration verbessert werden. Jenkins selbst ist kostenlos, erfordert jedoch Infrastruktur-Kosten für Hosting und Wartung.

Vergleichstabelle: Performance und Stabilität

Kriterium              | GitHub Actions              | GitLab CI                  | Jenkins
----------------------|----------------------------|----------------------------|----------------------------
Performance           | Gut (verwaltete Infrastruktur)| Gut (abhängig von Konfiguration)| Sehr gut (bei optimaler Konfiguration)
Build-Zeiten          | Abhängig von Runner-Verfügbarkeit| Optimierbar durch Caching  | Optimierbar durch verteilte Builds
Stabilität            | Hoch (GitHub-Infrastruktur) | Hoch (Cloud) / Abhängig (Self-Hosted)| Abhängig von Wartung
Verfügbarkeit         | Hoch (99,9%+)               | Hoch (Cloud) / Abhängig (Self-Hosted)| Abhängig von Infrastruktur
Caching-Mechanismen   | Effizient                   | Effizient                  | Durch Plugins
Parallele Ausführung  | Automatisch optimiert       | Konfigurierbar             | Manuell konfigurierbar
Skalierung            | Automatisch                 | Abhängig von Konfiguration | Manuell

4.5.5 KI-Unterstützung

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<GitHub Actions bietet umfassende KI-Unterstützung durch GitHub Copilot, das Workflow-YAML-Dateien basierend auf natürlicher Sprache generieren kann. Copilot bietet Auto-Vervollständigung für Actions, Syntax-Vorschläge und Fehlererkennung (Chapman, 2022). Die KI-Unterstützung reduziert den Konfigurationsaufwand erheblich und macht die Plattform für Einsteiger zugänglicher. GitHub bietet auch Code-Suggestions und automatische Code-Review-Vorschläge.

GitLab CI bietet begrenzte KI-Unterstützung durch GitLab AI-Features, die hauptsächlich auf Code-Generierung und Code-Review fokussiert sind. Die KI-Unterstützung für CI/CD-Konfiguration ist weniger ausgereift als bei GitHub Actions. GitLab arbeitet an der Erweiterung von KI-Features, die jedoch noch nicht so umfassend sind wie bei GitHub (Clark, 2022).

Jenkins bietet keine native KI-Unterstützung, obwohl einige Plugins KI-Features bieten können. Die Konfiguration erfolgt hauptsächlich manuell, was mehr Expertise erfordert. Die fehlende KI-Unterstützung kann den Konfigurationsaufwand erhöhen, insbesondere für Einsteiger (Clark, 2022).>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Vergleichstabelle: KI-Unterstützung

Kriterium              | GitHub Actions              | GitLab CI                  | Jenkins
----------------------|----------------------------|----------------------------|----------------------------
Verfügbarkeit         | GitHub Copilot (umfassend)  | GitLab AI (begrenzt)       | Keine native Unterstützung
Code-Generierung      | Workflow-YAML aus natürlicher Sprache| Code-Generierung (begrenzt)| Keine
Auto-Vervollständigung| Ja                          | Begrenzt                   | Keine
Fehlererkennung       | Syntax-Vorschläge          | Begrenzt                   | Keine
Konfigurationshilfe   | Umfassend                   | Begrenzt                   | Keine
Code-Review           | Automatische Vorschläge     | Code-Review-Features       | Keine
Effektivität          | Hoch                        | Mittel                     | Niedrig

4.6 Zwischenfazit

Der Vergleich der drei CI/CD-Plattformen zeigt unterschiedliche Stärken und Zielgruppen. GitHub Actions bietet die beste Benutzerfreundlichkeit und KI-Unterstützung, ist ideal für Teams, die bereits GitHub verwenden, und bietet nahtlose Integration mit dem Versionskontrollsystem (Laster, 2021; Chapman, 2022). Die verwaltete Infrastruktur eliminiert Wartungsaufwand, während die Marketplace-Bibliothek umfangreiche Funktionalität bietet.

GitLab CI bietet umfassende DevOps-Integration in einer einzigen Plattform, hohe Flexibilität zwischen Cloud und Self-Hosted, sowie erweiterte Features in der Enterprise Edition (Clark, 2022). Die Plattform ist ideal für Teams, die eine vollständige DevOps-Lösung suchen und Wert auf Integration legen. Die YAML-basierte Konfiguration ist ähnlich wie GitHub Actions, bietet jedoch mehr erweiterte Features.

Jenkins bietet die höchste Flexibilität und Erweiterbarkeit durch seine umfangreiche Plugin-Ökologie, vollständige Kontrolle über Infrastruktur und keine Vendor-Lock-in (Clark, 2022). Die Plattform ist ideal für Teams mit spezifischen Anforderungen, die Anpassungsfähigkeit benötigen, und für Organisationen, die vollständige Kontrolle über ihre CI/CD-Infrastruktur wünschen. Die selbst-gehostete Architektur erfordert jedoch mehr Wartungsaufwand und Expertise.

Die Auswahl der richtigen Plattform hängt von verschiedenen Faktoren ab: Projektanforderungen, Team-Expertise, Budget, Infrastruktur-Präferenzen und spezifische Feature-Anforderungen. Keine Plattform ist universell überlegen; jede bietet unterschiedliche Vorteile für verschiedene Anwendungsszenarien (Singh, 2021). Die vorliegende Evaluierung zielt darauf ab, diese Unterschiede zu quantifizieren und Entwicklungsteams bei der Plattformauswahl zu unterstützen.

Literaturverzeichnis (Kapitel 4)

Chapman, E. (2022). Mastering GitHub Actions. 1st Edition. Apress.

Clark, T. (2022). CI/CD Unleashed – Turbocharging Software Deployment for Quicker Delivery. Wiley.

JetBrains. (2023). Developer Ecosystem Survey 2023. Verfügbar unter: https://www.jetbrains.com/lp/devecosystem-2023/ [Zugriff am 06. November 2025].

Laster, B. (2021). Learning GitHub Actions: Automation and Integration of CI/CD with GitHub. O'Reilly Media.

Singh, N. (2021). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. Packt Publishing.

