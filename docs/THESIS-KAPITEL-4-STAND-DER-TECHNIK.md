4. Stand der Technik: CI/CD-Plattformen im Vergleich

4.1 Überblick über aktuelle CI/CD-Lösungen

Die Auswahl einer geeigneten CI/CD-Plattform ist eine zentrale Entscheidung in modernen Softwareentwicklungsprozessen. Aktuelle Erhebungen zeigen, dass über 80% der Entwicklerteams CI/CD-Tools nutzen, wobei die Plattformauswahl eine wesentliche Herausforderung darstellt (JetBrains, 2025). Die untersuchten CI/CD-Plattformen werden anhand folgender technischer Kriterien verglichen: Architektur und Ausführungsmodell, Konfigurationsmodell, Funktionsumfang, Performance, Benutzerfreundlichkeit sowie KI-Unterstützung. Diese Kriterien wurden gewählt, da sie zentrale Aspekte von CI/CD-Plattformen abdecken und eine umfassende Bewertung ermöglichen (Shahin et al., 2017; Forsgren et al., 2018).

GitHub Actions, GitLab CI und Jenkins erfüllen dieselbe grundlegende Funktion (Automatisierung von Build-, Test- und Integrationsprozessen), unterscheiden sich jedoch erheblich in ihren architektonischen Ansätzen, Geschäftsmodellen und Zielgruppen. Diese Vielfalt macht eine systematische Vergleichsevaluierung notwendig, um fundierte Entscheidungen zu ermöglichen (Shahin et al., 2017).

4.2 GitHub Actions

4.2.1 Architektur und Konzept

GitHub Actions ist eine cloud-basierte CI/CD-Plattform, direkt in GitHub integriert und 2018 eingeführt. Die Plattform wurde entwickelt, um CI/CD-Funktionalitäten nahtlos in den GitHub-Entwicklungsprozess zu integrieren (Clark, 2025). Workflows werden ereignisgesteuert ausgelöst (Code-Commits, Pull Requests, Issues, Workflow-Dispatch) und auf GitHub-gehosteten Runnern (Linux, Windows, macOS) oder selbst-gehosteten Runnern ausgeführt (Clark, 2025). Diese Event-basierte Architektur ermöglicht eine hohe Flexibilität in der Workflow-Automatisierung.

Die Plattform nutzt ein Container-basiertes Ausführungsmodell, bei dem jeder Job in einem isolierten Container läuft. Dies gewährleistet Reproduzierbarkeit und Isolierung zwischen verschiedenen Jobs (Clark, 2025). GitHub Actions bietet automatische Skalierung und Ressourcenmanagement, was die Wartungskomplexität für Nutzer erheblich reduziert.

4.2.2 Konfiguration und Syntax

Konfiguration erfolgt deklarativ über YAML-Dateien im `.github/workflows/` Verzeichnis. Diese Struktur ermöglicht versionierte, reproduzierbare Pipeline-Definitionen (Clark, 2025). Die YAML-Syntax ist intuitiv und gut dokumentiert, was die Lernkurve reduziert. Die Plattform bietet einen umfangreichen Marketplace mit über 13.000 wiederverwendbaren Actions, die den Konfigurationsaufwand erheblich reduzieren können (Clark, 2025).

Erweiterte Features umfassen parallele Job-Ausführung, Matrix-Builds für Multi-Environment-Testing, Caching-Mechanismen für Dependencies und Secrets-Management für sensible Daten (Clark, 2025). Die Plattform unterstützt Conditional Execution, Dynamic Matrix Generation und Workflow-Reusability durch Composite Actions.

4.2.3 Integration und Benutzeroberfläche

Die Benutzeroberfläche ist vollständig in GitHub integriert, was einen nahtlosen Workflow zwischen Code-Entwicklung, Pull-Request-Reviews und CI/CD-Pipeline-Ausführung ermöglicht (Clark, 2025). Workflow-Ergebnisse werden direkt in Pull Requests angezeigt, was die Transparenz und Entscheidungsfindung verbessert. Die Plattform bietet umfassende Logging- und Debugging-Funktionen, die die Fehlerdiagnose erleichtern.

4.2.4 KI-Unterstützung und Innovation

KI-Unterstützung erfolgt durch GitHub Copilot, das Workflow-Konfigurationen basierend auf natürlicher Sprache generieren kann (Clark, 2025). Diese Funktion reduziert den initialen Konfigurationsaufwand erheblich, insbesondere für Einsteiger. GitHub Actions bietet zudem intelligente Fehlerdiagnose und Vorschläge zur Pipeline-Optimierung, was die Wartbarkeit verbessert (Clark, 2025).

4.3 GitLab CI

4.3.1 Architektur und Konzept

GitLab CI ist integraler Bestandteil der GitLab-DevOps-Plattform und wurde 2012 eingeführt. Die Plattform wurde als vollständige DevOps-Lösung konzipiert, die Version Control, CI/CD, Container Registry, Monitoring und Deployment-Management in einer integrierten Plattform vereint (Shahin et al., 2017). Die Architektur basiert auf GitLab-Runnern (Shared, projektspezifisch oder selbst-gehostet), die auf verschiedenen Plattformen (Linux, Windows, macOS, Docker, Kubernetes) ausgeführt werden können (Shahin et al., 2017).

Diese flexible Runner-Architektur ermöglicht unterschiedliche Betriebsmodelle: Shared Runners für einfache Einrichtung und Kostenteilung, projektsspezifische Runner für spezialisierte Anforderungen und Self-Hosted Runner für vollständige Kontrolle über Infrastruktur und Compliance (Shahin et al., 2017). Die Runner-Architektur unterstützt Docker, Kubernetes, Virtual Machines und bare-metal Installationen.

4.3.2 Konfiguration und Syntax

Die Konfiguration erfolgt über eine `.gitlab-ci.yml` Datei im Repository-Root. Diese zentrale Konfigurationsdatei unterstützt komplexe Pipeline-Definitionen mit Stages, Jobs, Dependencies und Conditional Execution (Shahin et al., 2017). Die YAML-Syntax ist ähnlich zu GitHub Actions, was die Migration zwischen den Plattformen erleichtert.

Die Plattform bietet umfassende CI/CD-Funktionen: parallele Jobs, Matrix-Builds, Caching-Mechanismen für Dependencies und Build-Artefakte, Artifact-Management mit automatischer Bereitstellung, Coverage-Reports mit visueller Darstellung, Environment-Management für Staging- und Produktionsumgebungen, sowie Dynamic Environments (Shahin et al., 2017). Docker-in-Docker wird unterstützt, ist jedoch auf Shared Runnern möglicherweise nicht verfügbar, was eine wichtige Einschränkung für bestimmte Anwendungsszenarien darstellen kann (Shahin et al., 2017).

4.3.3 DevOps-Integration

GitLab CI profitiert von der tiefen Integration in die GitLab-DevOps-Plattform. Features wie Container Registry, Package Registry, Security Scanning, Dependency Scanning und Compliance-Management sind nahtlos integriert (Shahin et al., 2017). Diese Integration reduziert den Konfigurationsaufwand für komplexe DevOps-Workflows erheblich.

Die Plattform bietet erweiterte Features wie Review Apps (automatische Deployment-Umgebungen für Pull Requests), Merge Trains (automatisiertes Queue-Management für Merge Requests), und Incremental Rollouts (graduelles Deployment in Produktion) (Shahin et al., 2017).

4.3.4 Benutzeroberfläche und KI-Unterstützung

Die Benutzeroberfläche ist vollständig in GitLab integriert, was eine konsistente Benutzererfahrung über alle DevOps-Funktionen hinweg ermöglicht (Shahin et al., 2017). Pipeline-Visualisierungen, Job-Logs und Artefakt-Verwaltung sind nahtlos in die GitLab-Weboberfläche integriert. KI-Unterstützung ist begrenzt und fokussiert sich stärker auf Code-Review als auf CI/CD-Konfiguration, was eine Schwäche im Vergleich zu GitHub Actions darstellt (Shahin et al., 2017).

4.4 Jenkins

4.4.1 Architektur und Konzept

Jenkins ist eine Open-Source-CI/CD-Plattform, die 2004 als Hudson entwickelt wurde und 2011 in Jenkins umbenannt wurde. Die Plattform nutzt eine Controller-Agent-Architektur, bei der ein zentraler Controller die Pipeline-Orchestrierung übernimmt und Agenten die eigentliche Workload-Ausführung durchführen (Shahin et al., 2017). Diese Architektur ermöglicht eine hohe Skalierbarkeit und Flexibilität, erfordert jedoch eine umfassende Infrastruktur-Verwaltung.

Jenkins kann als Self-Hosted-Lösung auf verschiedenen Plattformen (Linux, Windows, macOS, Docker, Kubernetes) betrieben werden, was vollständige Kontrolle über Infrastruktur, Daten und Compliance ermöglicht (Shahin et al., 2017). Die Plattform unterstützt verschiedene Deployment-Modelle: Standalone, als Docker-Container, auf Kubernetes-Clustern oder in Cloud-Umgebungen.

4.4.2 Konfiguration und Syntax

Die Konfiguration erfolgt über Jenkinsfiles in Groovy-Syntax, die als Pipeline-as-Code im Repository versioniert werden können (Shahin et al., 2017). Jenkins unterstützt zwei Pipeline-Typen: Declarative Pipeline (strukturierte, weniger flexible Syntax) und Scripted Pipeline (volle Groovy-Flexibilität, komplexere Syntax). Diese Flexibilität ermöglicht nahezu unbegrenzte Anpassungsmöglichkeiten, erhöht jedoch die Komplexität und Lernkurve.

Die Plattform zeichnet sich durch eine umfangreiche Plugin-Ökologie (über 1800 Plugins) aus, die nahezu jede Integration ermöglicht (Shahin et al., 2017). Diese Plugin-Architektur ermöglicht die Integration mit praktisch jedem Tool und jeder Plattform, was Jenkins zu einer der flexibelsten CI/CD-Lösungen macht. Jenkins unterstützt parallele Builds, Matrix-Builds, Pipeline-Stages mit Dependencies sowie erweiterte Features wie Shared Libraries (wiederverwendbare Pipeline-Code-Bibliotheken), Credentials-Management, und Pipeline Libraries (Shahin et al., 2017).

4.4.3 Erweiterbarkeit und Customization

Die Groovy-basierte Konfiguration ermöglicht komplexe Logik, dynamische Pipeline-Generierung und Integration mit externen Systemen (Shahin et al., 2017). Shared Libraries ermöglichen die Wiederverwendung von Pipeline-Code über verschiedene Projekte hinweg, was die Wartbarkeit und Standardisierung verbessert. Custom Plugins können in Java entwickelt werden, was eine tiefe Integration in die Jenkins-Architektur ermöglicht.

4.4.4 Benutzeroberfläche und Einschränkungen

Die Standard-Benutzeroberfläche ist funktional und umfassend, jedoch weniger modern als cloud-basierte Lösungen (Shahin et al., 2017). Blue Ocean bietet eine modernere, intuitive Visualisierung mit Pipeline-Editor, erfordert jedoch zusätzliche Installation und wird weniger aktiv weiterentwickelt. Jenkins verfügt über keine native KI-Unterstützung, was eine Schwäche im Vergleich zu moderneren Plattformen darstellt (Shahin et al., 2017). Die Wartung und das Update-Management können komplex sein, insbesondere bei großen Installationen mit vielen Plugins.

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

Quelle: Eigene Darstellung

4.5.2 Funktionsumfang und Erweiterbarkeit

GitHub Actions: Umfangreicher Funktionsumfang durch Marketplace-Actions. Erweiterbarkeit über Custom Actions (JavaScript, TypeScript, Docker).

GitLab CI: Umfassende CI/CD-Funktionen als Teil der DevOps-Plattform. Erweiterbarkeit über Custom Runners und CI/CD-Variablen.

Jenkins: Größter Funktionsumfang durch Plugin-Ökologie (1800+ Plugins). Erweiterbarkeit über Custom Plugins (Java) und Shared Libraries (Groovy).

4.5.3 Benutzerfreundlichkeit und Dokumentation

GitHub Actions: Hohe Benutzerfreundlichkeit, intuitive YAML-Syntax, umfassende Dokumentation mit zahlreichen Beispielen, KI-Unterstützung durch Copilot (Clark, 2025). Die Integration in GitHub ermöglicht eine nahtlose Benutzererfahrung ohne Kontextwechsel. Der Marketplace mit tausenden vorgefertigten Actions reduziert den Konfigurationsaufwand erheblich (Clark, 2025).

GitLab CI: Gute Benutzerfreundlichkeit, ähnliche YAML-Syntax wie GitHub Actions, umfassende Dokumentation, CI/CD-Templates für häufige Anwendungsszenarien (Shahin et al., 2017). Die Integration in die GitLab-Plattform ermöglicht konsistente Benutzerführung über alle DevOps-Funktionen hinweg. Die Pipeline-Editor-Funktion unterstützt visuelle Pipeline-Konfiguration.

Jenkins: Moderate Benutzerfreundlichkeit, komplexere Groovy-Syntax erfordert Programmierkenntnisse, umfangreiche aber weniger einheitliche Dokumentation (Shahin et al., 2017). Die steilere Lernkurve kann für Einsteiger eine Hürde darstellen. Die Plugin-Ökologie bietet zwar enorme Flexibilität, erhöht jedoch die Komplexität der Plattform-Verwaltung und kann zu Kompatibilitätsproblemen führen.

4.5.4 Performance und Stabilität

Die Performance hängt maßgeblich von der Infrastruktur-Konfiguration ab. GitHub Actions profitiert von verwalteter Infrastruktur und automatischer Skalierung, was konsistente Performance-Eigenschaften gewährleistet (Forsgren et al., 2018). Die Plattform nutzt intelligentes Caching und Ressourcenmanagement, was die Pipeline-Ausführungszeiten optimiert. Cloud-native Architektur ermöglicht hohe Verfügbarkeit und Redundanz.

GitLab CI bietet vergleichbare Performance-Eigenschaften, wobei die Stabilität stark vom Betriebsmodell abhängt (Shahin et al., 2017). Shared Runnern können aufgrund von Ressourcenkonkurrenz und Queue-Wartezeiten längere Ausführungszeiten aufweisen, während dedizierte oder Self-Hosted Runner optimale Performance ermöglichen können. Die Plattform unterstützt Caching und Artefakt-Management zur Performance-Optimierung.

Bei Jenkins ist die Performance maßgeblich von der Infrastrukturkonfiguration abhängig und erfordert manuelle Optimierung (Shahin et al., 2017). Controller-Agent-Architektur ermöglicht Skalierung, erfordert jedoch sorgfältige Ressourcenplanung. Performance-Optimierung hängt von Faktoren wie Agent-Konfiguration, Plugin-Auswahl, Build-Parallelisierung und Cache-Konfiguration ab. Die Variabilität der Performance kann höher sein als bei verwalteten Cloud-Lösungen (Forsgren et al., 2018).

4.5.5 KI-Unterstützung

GitHub Actions bietet die umfassendste KI-Unterstützung durch GitHub Copilot, das Workflow-Konfigurationen basierend auf natürlicher Sprache generieren kann (Clark, 2025). Diese Funktion reduziert den Konfigurationsaufwand erheblich und macht CI/CD für Einsteiger zugänglicher. Aktuelle Entwicklungen deuten darauf hin, dass KI-gestützte Assistenzfunktionen eine wachsende Rolle im Softwareentwicklungsprozess spielen (JetBrains, 2025).

GitLab CI integriert erste KI-Funktionen, die sich jedoch stärker auf Code-Review konzentrieren als auf CI/CD-Konfiguration (Shahin et al., 2017). Die Plattform bietet Code Suggestions und einige KI-gestützte Features, jedoch weniger umfassend als GitHub Actions im CI/CD-Kontext.

Jenkins verfügt über keine native KI-Unterstützung, was eine Schwäche im Vergleich zu moderneren Plattformen darstellt (Shahin et al., 2017). Während Plugins existieren, die KI-Funktionen hinzufügen können, ist die Integration weniger nahtlos als bei cloud-basierten Lösungen.

4.5.6 Kostenmodell und Lizenzierung

GitHub Actions: Freemium-Modell mit kostenlosen Minuten für öffentliche Repositorys und privaten Repositorys (begrenzt). Kostenpflichtige Pläne basieren auf Minuten-Nutzung für Self-Hosted und zusätzliche Minuten für GitHub-Hosted Runners (Clark, 2025). Dieses Modell kann für kleine Projekte kosteneffektiv sein, kann jedoch bei hohem Nutzungsvolumen teuer werden.

GitLab CI: Open-Source-Core-Version kostenlos, Premium- und Ultimate-Pläne mit erweiterten Features. Cloud-Version mit kostenlosen Minuten, Self-Hosted-Versionen erfordern Lizenzkosten für Premium-Features (Shahin et al., 2017). Die Open-Source-Version bietet umfassende Funktionalität, Premium-Features fokussieren auf Enterprise-Anforderungen.

Jenkins: Vollständig Open-Source und kostenlos, keine Lizenzkosten (Shahin et al., 2017). Kosten entstehen primär durch Infrastruktur (Self-Hosted), Wartungsaufwand und eventuelle Support-Verträge. Dieses Modell kann langfristig kosteneffektiver sein, erfordert jedoch höhere initiale Investitionen in Infrastruktur und Expertise.

4.6 Auswahlkriterien und Anwendungsszenarien

Die Plattformauswahl hängt von mehreren Faktoren ab: Organisationsgröße, Team-Erfahrung, Infrastruktur-Anforderungen, Budget, Compliance-Anforderungen und langfristige Strategie (Shahin et al., 2017; Forsgren et al., 2018).

**GitHub Actions** eignet sich optimal für: Teams, die bereits GitHub für Version Control nutzen; Cloud-native Projekte mit geringem Betriebsaufwand; Einsteiger und Teams mit begrenzten DevOps-Ressourcen; Projekte, die von KI-gestützter Konfigurationsunterstützung profitieren können (Clark, 2025).

**GitLab CI** eignet sich optimal für: Organisationen, die eine vollständige DevOps-Plattform benötigen; Teams, die vollständige Kontrolle über die CI/CD-Pipeline haben möchten; Projekte mit komplexen Deployment-Anforderungen (z.B. Kubernetes, Container-Registries); Organisationen mit Compliance-Anforderungen, die Self-Hosted-Lösungen erfordern (Shahin et al., 2017).

**Jenkins** eignet sich optimal für: Organisationen mit spezifischen Anforderungen, die über Plugins adressiert werden können; Teams mit umfassenden Infrastruktur-Ressourcen und DevOps-Expertise; Projekte mit komplexen, hochgradig angepassten Workflows; Organisationen, die vollständige Kontrolle über Daten und Infrastruktur benötigen (Shahin et al., 2017).

4.7 Zwischenfazit

Keine Plattform ist universell überlegen. Jede Plattform adressiert unterschiedliche Anwendungsszenarien und Organisationsanforderungen (Shahin et al., 2017). GitHub Actions eignet sich für Teams mit GitHub-Ökosystem und geringem Betriebsaufwand, GitLab CI adressiert Organisationen, die eine integrierte DevOps-Plattform benötigen, und Jenkins richtet sich an Teams mit spezifischen Anforderungen und maximaler Kontrolle (Shahin et al., 2017). Die theoretische Analyse zeigt erhebliche Unterschiede in Architektur, Konfigurationsmodell, Funktionsumfang und Betriebsmodell, die sich auf Konfigurationsaufwand, Performance und Benutzerfreundlichkeit auswirken können. Die nachfolgende empirische Evaluation zielt darauf ab, diese Unterschiede anhand messbarer Kriterien unter identischen Bedingungen systematisch zu untersuchen und quantitative Daten zur Plattformvergleichbarkeit zu liefern (Forsgren et al., 2018).

Literaturverzeichnis (Kapitel 4)

Clark, T. (2025). CI/CD Unleashed: Turbocharging Software Deployment for Quicker Delivery. Apress. https://doi.org/10.1007/979-8-8688-1209-5

Forsgren, N., Humble, J., & Kim, G. (2018). Accelerate: The Science of Lean Software and DevOps – Measuring and Improving Performance. IT Revolution Press.

JetBrains. (2025). State of Developer Ecosystem Report 2025. JetBrains s.r.o. https://www.jetbrains.com/lp/devecosystem-2025/

Shahin, M., Babar, M. A., & Zhu, L. (2017). Continuous Integration, Delivery and Deployment: A Systematic Review on Approaches, Tools, Challenges and Practices. IEEE Access, 5, 3909–3943. https://doi.org/10.1109/ACCESS.2017.2685629

Singh, N. (2025). DevOps Security and Automation: Building, Deploying, and Scaling Modern Software Systems. BPB Publications.
