# Statistische Auswertung der CI/CD-Pipeline-Performance

## Übersicht

Dieses Dokument präsentiert eine umfassende statistische Auswertung der Performance-Metriken für drei CI/CD-Plattformen: **GitHub Actions**, **GitLab CI** und **Jenkins**. Die Analyse basiert auf 10 Pipeline-Durchläufen pro Plattform und umfasst Gesamtausführungszeiten, Stage-spezifische Metriken und Erfolgsraten.

**Datum der Analyse**: Basierend auf den gesammelten Performance-Daten  
**Anzahl der Durchläufe pro Plattform**: 10  
**Erfolgsrate**: 100% für alle drei Plattformen

---

## 1. Gesamtausführungszeiten

### Tabelle 1.1: Statistische Kennwerte der Gesamtausführungszeiten (in Sekunden)

| Plattform | Mittelwert (μ) | Median (M) | Standardabweichung (σ) | Minimum | Maximum | n |
|-----------|----------------|-----------|------------------------|---------|---------|---|
| **GitHub Actions** | 188,2 | 183,5 | 12,45 | 176 | 211 | 10 |
| **GitLab CI** | 531,2 | 527,0 | 30,40 | 497 | 593 | 10 |
| **Jenkins** | 199,9 | 200,0 | 40,48 | 140 | 283 | 10 |

### Analyse der Gesamtausführungszeiten

**GitHub Actions** zeigt mit **188,2 Sekunden (3,14 Minuten)** die schnellste durchschnittliche Gesamtausführungszeit. Die niedrige Standardabweichung von 12,45 Sekunden deutet auf eine sehr konsistente Performance hin.

**Jenkins** liegt mit **199,9 Sekunden (3,33 Minuten)** nahe bei GitHub Actions, weist jedoch mit **40,48 Sekunden** die höchste Variabilität auf. Dies kann auf Faktoren wie Cache-Hits/Misses und Systemlast zurückgeführt werden.

**GitLab CI** benötigt mit **531,2 Sekunden (8,85 Minuten)** deutlich länger als die anderen beiden Plattformen. Dies ist hauptsächlich auf die Verwendung von Shared Runnern zurückzuführen, die zu Queue-Wartezeiten, reduzierten Ressourcenallokationen und weniger effizienter Cache-Nutzung führen.

**Vergleich**:
- GitHub Actions ist **5,9% schneller** als Jenkins
- GitHub Actions ist **182% schneller** als GitLab CI
- Jenkins ist **166% schneller** als GitLab CI

---

## 2. Queue-Zeiten

### Tabelle 2.1: Queue-Zeiten (in Sekunden)

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 0,0 | 0,0 | 0,0 | 0 | 0 |
| **GitLab CI** | 1,2 | 0,5 | 1,4 | 0 | 3 |
| **Jenkins** | 0,0 | 0,0 | 0,0 | 0 | 0 |

### Analyse der Queue-Zeiten

**GitHub Actions** und **Jenkins** zeigen keine Queue-Wartezeiten, was auf eine sofortige Verfügbarkeit von Runnern hinweist.

**GitLab CI** weist eine durchschnittliche Queue-Zeit von **1,2 Sekunden** auf (Median: 0,5 Sekunden, Maximum: 3 Sekunden). Dies ist charakteristisch für Shared Runner-Architekturen, bei denen mehrere Pipelines um verfügbare Ressourcen konkurrieren.

---

## 3. Stage-spezifische Ausführungszeiten

### 3.1 Lint Backend

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 12,9 | 12,5 | 4,23 | 9 | 24 |
| **GitLab CI** | 33,7 | 30,5 | 8,07 | 29 | 56 |
| **Jenkins** | 16,1 | 13,0 | 7,74 | 10 | 33 |

**Beobachtungen**:
- GitHub Actions ist am schnellsten (12,9s) und am konsistentesten (σ = 4,23s)
- GitLab CI benötigt etwa 2,6x länger als GitHub Actions
- Jenkins zeigt die höchste Variabilität (σ = 7,74s)

### 3.2 Lint Frontend

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 13,5 | 13,5 | 2,32 | 10 | 16 |
| **GitLab CI** | 45,8 | 45,0 | 1,69 | 44 | 50 |
| **Jenkins** | 18,4 | 15,5 | 8,32 | 10 | 35 |

**Beobachtungen**:
- GitHub Actions zeigt die beste Performance (13,5s) und niedrigste Variabilität (σ = 2,32s)
- GitLab CI benötigt etwa 3,4x länger, ist aber sehr konsistent (σ = 1,69s)
- Jenkins zeigt wiederum hohe Variabilität (σ = 8,32s)

### 3.3 Test Backend

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 28,6 | 28,0 | 3,60 | 25 | 36 |
| **GitLab CI** | 46,6 | 45,0 | 4,81 | 42 | 56 |
| **Jenkins** | 31,9 | 28,5 | 9,84 | 22 | 52 |

**Beobachtungen**:
- GitHub Actions ist am schnellsten (28,6s) mit konsistenter Performance
- GitLab CI benötigt etwa 1,6x länger als GitHub Actions
- Jenkins zeigt die höchste Variabilität (σ = 9,84s)

### 3.4 Test Frontend

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 26,5 | 25,5 | 2,99 | 24 | 34 |
| **GitLab CI** | 54,8 | 54,0 | 1,55 | 53 | 57 |
| **Jenkins** | 23,8 | 20,5 | 8,78 | 16 | 43 |

**Beobachtungen**:
- Jenkins ist hier am schnellsten (23,8s), zeigt aber hohe Variabilität
- GitHub Actions liegt nahe bei Jenkins (26,5s) mit besserer Konsistenz
- GitLab CI benötigt etwa 2,3x länger, ist aber sehr konsistent (σ = 1,55s)

### 3.5 Build Frontend

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 18,6 | 18,0 | 3,57 | 13 | 23 |
| **GitLab CI** | 48,6 | 43,5 | 9,37 | 42 | 67 |
| **Jenkins** | 16,1 | 15,0 | 4,82 | 11 | 24 |

**Beobachtungen**:
- Jenkins ist am schnellsten (16,1s)
- GitHub Actions liegt nahe bei Jenkins (18,6s)
- GitLab CI benötigt etwa 3,0x länger als Jenkins

### 3.6 E2E Tests

| Plattform | Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|-----------|------------|--------|-------------------|---------|---------|
| **GitHub Actions** | 120,2 | 117,0 | 11,00 | 111 | 141 |
| **GitLab CI** | 360,1 | 347,0 | 30,82 | 331 | 432 |
| **Jenkins** | 122,3 | 112,5 | 35,20 | 84 | 190 |

**Beobachtungen**:
- Die E2E-Tests stellen den zeitintensivsten Stage dar
- GitHub Actions und Jenkins zeigen ähnliche Durchschnittszeiten (~120s)
- GitLab CI benötigt etwa **3x länger** (360,1s), was hauptsächlich auf reduzierte Ressourcenallokation der Shared Runner zurückzuführen ist
- Jenkins zeigt die höchste Variabilität (σ = 35,20s)

### 3.7 Deploy Stages

#### GitHub Actions - Deploy Staging
| Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|------------|--------|-------------------|---------|---------|
| 5,1 | 5,0 | 0,88 | 4 | 7 |

#### GitLab CI - Deploy
| Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|------------|--------|-------------------|---------|---------|
| 18,3 | 15,5 | 8,74 | 14 | 43 |

#### Jenkins - Deploy
| Mittelwert | Median | Standardabweichung | Minimum | Maximum |
|------------|--------|-------------------|---------|---------|
| 1,4 | 1,0 | 0,7 | 1 | 3 |

**Beobachtungen**:
- Jenkins hat die schnellste Deploy-Zeit (1,4s)
- GitHub Actions benötigt 5,1s für Staging-Deploy
- GitLab CI benötigt mit 18,3s deutlich länger

---

## 4. Erfolgsraten

### Tabelle 4.1: Erfolgsraten

| Plattform | Erfolgreiche Durchläufe | Fehlgeschlagene Durchläufe | Gesamt | Erfolgsrate |
|-----------|------------------------|---------------------------|--------|-------------|
| **GitHub Actions** | 10 | 0 | 10 | **100%** |
| **GitLab CI** | 10 | 0 | 10 | **100%** |
| **Jenkins** | 10 | 0 | 10 | **100%** |

### Analyse der Erfolgsraten

Alle drei Plattformen erreichten eine **Erfolgsrate von 100%** über die 10 analysierten Durchläufe. Dies zeigt, dass nach erfolgreicher initialer Konfiguration alle Plattformen stabil funktionieren. Die Unterschiede bei der Konfigurationskomplexität beeinflussen jedoch den initialen Einrichtungsaufwand.

---

## 5. Zusammenfassende Analyse

### 5.1 Performance-Ranking

1. **GitHub Actions** (188,2s) - Schnellste und konsistenteste Performance
2. **Jenkins** (199,9s) - Ähnlich schnell, aber höhere Variabilität
3. **GitLab CI** (531,2s) - Deutlich langsamer aufgrund von Shared Runnern

### 5.2 Konsistenz-Ranking (basierend auf Standardabweichung der Gesamtausführungszeit)

1. **GitHub Actions** (σ = 12,45s) - Sehr konsistent
2. **GitLab CI** (σ = 30,40s) - Mäßig konsistent
3. **Jenkins** (σ = 40,48s) - Höchste Variabilität

### 5.3 Stage-Performance-Übersicht

**Schnellste Plattform pro Stage**:
- **Lint Backend**: GitHub Actions (12,9s)
- **Lint Frontend**: GitHub Actions (13,5s)
- **Test Backend**: GitHub Actions (28,6s)
- **Test Frontend**: Jenkins (23,8s)
- **Build Frontend**: Jenkins (16,1s)
- **E2E Tests**: GitHub Actions (120,2s)
- **Deploy**: Jenkins (1,4s)

### 5.4 Wichtigste Erkenntnisse

1. **GitHub Actions** bietet die beste Gesamtperformance mit konsistenten Ausführungszeiten
2. **Jenkins** ist ähnlich schnell, zeigt aber höhere Variabilität, was auf Faktoren wie Cache-Nutzung und Systemlast hindeutet
3. **GitLab CI** ist deutlich langsamer, was primär auf die Shared Runner-Architektur zurückzuführen ist. Bei Verwendung dedizierter Runner würden sich die Zeiten voraussichtlich deutlich reduzieren
4. **E2E-Tests** sind der zeitintensivste Stage bei allen Plattformen
5. Alle Plattformen erreichen eine **100% Erfolgsrate** nach erfolgreicher Konfiguration

---

## 6. Empfehlungen

### Für maximale Performance:
- **GitHub Actions** empfohlen für Cloud-basierte Projekte mit GitHub-Integration

### Für maximale Flexibilität:
- **Jenkins** empfohlen für Teams mit komplexen Anforderungen und vollständiger Kontrolle über die Infrastruktur

### Für vollständige DevOps-Integration:
- **GitLab CI** empfohlen, jedoch mit dedizierten Runnern für bessere Performance

### Optimierungspotenzial:
- **E2E-Tests** optimieren (größter Zeitfaktor)
- **Parallele Ausführung** von Lint- und Test-Jobs nutzen
- **Cache-Strategien** optimieren, insbesondere für Jenkins

---

## 7. Methodik

### Datensammlung
- Mindestens 10 Pipeline-Durchläufe pro Plattform
- Kontrollierte Bedingungen: gleiche Codebasis, identische Testsuites
- Typische Infrastruktur-Konfigurationen (GitHub-gehostete Runner, GitLab Shared Runners, Jenkins Self-Hosted Runner)

### Statistische Metriken
- **Mittelwert (μ)**: Arithmetisches Mittel der Ausführungszeiten
- **Median (M)**: Zentraler Wert, robust gegenüber Ausreißern
- **Standardabweichung (σ)**: Maß für die Variabilität
- **Minimum/Maximum**: Extremwerte zur Identifikation von Ausreißern

### Datenquelle
Die Daten wurden aus den JSON-Dateien in `results/performance/` extrahiert und konsolidiert in `results/statistiques_performance.json`.

---

**Quelle**: Eigene Auswertung basierend auf gesammelten Performance-Daten  
**Letzte Aktualisierung**: Basierend auf 10 Durchläufen pro Plattform

