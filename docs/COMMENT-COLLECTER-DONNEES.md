# Comment Collecter les Données : Guide Pratique

## Question Importante : Faut-il relancer les pipelines 10 fois ?

**Réponse : OUI, absolument !** Voici pourquoi et comment :

## Pourquoi relancer plusieurs fois ?

### 1. Variabilité des temps d'exécution

Les temps d'exécution **NE SERONT PAS identiques** même sans modification du code. Voici pourquoi :

**Facteurs de variabilité :**
- **Charge du runner** : Le runner peut être plus ou moins chargé
- **Cache** : Premier run = pas de cache, runs suivants = cache disponible
- **Réseau** : Vitesse de téléchargement des dépendances peut varier
- **Queue time** : Temps d'attente pour un runner disponible
- **Conditions système** : CPU, mémoire disponibles varient
- **Timing** : Heure de la journée, charge globale de la plateforme

### 2. Importance pour l'analyse statistique

Pour une **évaluation scientifique solide**, vous avez besoin de :
- **Moyenne** : Temps moyen d'exécution
- **Médiane** : Temps médian (moins sensible aux outliers)
- **Écart-type** : Mesure de la variabilité
- **Min/Max** : Plage de variation
- **Intervalles de confiance** : Pour des conclusions statistiques

**Exemple concret :**
```
Exécution 1 : 297 secondes
Exécution 2 : 301 secondes  ← Légèrement différent
Exécution 3 : 295 secondes  ← Encore différent
Exécution 4 : 310 secondes  ← Plus lent (runner chargé)
Exécution 5 : 292 secondes  ← Plus rapide (cache optimal)
...
```

Cette variabilité est **normale et attendue** !

## Comment procéder efficacement ?

### Stratégie 1 : Relancer manuellement (Simple)

**Pour chaque plateforme :**

1. **GitHub Actions** :
   - Aller sur votre repo → Actions
   - Cliquer sur "Run workflow" (ou faire un push vide)
   - Attendre la fin de l'exécution
   - Noter les temps dans `github_run_001.json`
   - Répéter 9 fois pour avoir 10 exécutions

2. **GitLab CI** :
   - Aller sur votre projet → CI/CD → Pipelines
   - Cliquer sur "Run pipeline"
   - Attendre la fin
   - Noter les temps dans `gitlab_pipeline_001.json`
   - Répéter 9 fois

3. **Jenkins** :
   - Aller sur votre instance Jenkins
   - Sélectionner votre pipeline
   - Cliquer sur "Build Now"
   - Attendre la fin
   - Noter les temps dans `jenkins_build_001.json`
   - Répéter 9 fois

### Stratégie 2 : Automatiser avec des commits vides (Plus rapide)

**Pour GitHub Actions et GitLab CI**, vous pouvez faire des commits vides pour déclencher les pipelines :

```bash
# Créer un commit vide pour déclencher le pipeline
git commit --allow-empty -m "Trigger CI/CD pipeline for data collection - Run 1"
git push

# Attendre la fin, noter les données, puis :
git commit --allow-empty -m "Trigger CI/CD pipeline for data collection - Run 2"
git push

# Répéter 10 fois
```

**Avantages :**
- Plus rapide que de modifier le code
- Historique Git clair
- Facile à suivre

### Stratégie 3 : Utiliser les API (Avancé)

Vous pouvez automatiser la collecte avec les APIs des plateformes, mais c'est plus complexe.

## Plan d'Action Recommandé

### Phase 1 : Collecte initiale (1-2 jours)

**Jour 1 : GitHub Actions (10 exécutions)**
- Matin : 5 exécutions
- Après-midi : 5 exécutions
- Temps estimé : 2-3 heures (selon durée des pipelines)

**Jour 2 : GitLab CI + Jenkins (20 exécutions)**
- Matin : 10 exécutions GitLab CI
- Après-midi : 10 exécutions Jenkins
- Temps estimé : 3-4 heures

### Phase 2 : Collecte complémentaire (Optionnel)

Si vous avez le temps, collectez **15-20 exécutions** par plateforme pour une analyse encore plus robuste.

## Exemple Concret : Workflow Complet

### Étape 1 : Préparer les fichiers

Les fichiers sont déjà créés :
- `github_run_001.json` à `github_run_010.json`
- `gitlab_pipeline_001.json` à `gitlab_pipeline_010.json`
- `jenkins_build_001.json` à `jenkins_build_010.json`

### Étape 2 : Relancer les pipelines

**GitHub Actions - Exécution 1 :**
1. Aller sur GitHub → Actions
2. Cliquer sur "Run workflow" (ou faire un commit vide)
3. Attendre la fin (environ 5 minutes)
4. Noter les temps dans `github_run_001.json`

**GitHub Actions - Exécution 2 :**
1. Relancer le workflow
2. Attendre la fin
3. Noter les temps dans `github_run_002.json`

**Répéter 8 fois de plus...**

### Étape 3 : Noter les différences

Vous remarquerez que les temps varient :

```
Run 1 : 297s (pas de cache)
Run 2 : 285s (cache disponible)
Run 3 : 301s (runner chargé)
Run 4 : 290s (conditions optimales)
...
```

**C'est normal et attendu !** Cette variabilité est importante pour votre analyse.

## Astuces pour accélérer la collecte

### 1. Collecter en parallèle

Vous pouvez collecter les données de plusieurs plateformes en parallèle :

- **Matin** : Lancer 5 pipelines GitHub Actions
- **Pendant l'attente** : Lancer 5 pipelines GitLab CI
- **Pendant l'attente** : Lancer 5 builds Jenkins

### 2. Utiliser des commits vides

Au lieu de modifier le code, utilisez des commits vides :

```bash
# Pour GitHub Actions et GitLab CI
git commit --allow-empty -m "Data collection run 1"
git push
# Attendre, noter les données, puis :
git commit --allow-empty -m "Data collection run 2"
git push
```

### 3. Automatiser la collecte (Avancé)

Vous pouvez créer un script pour automatiser, mais c'est optionnel.

## Que faire si les temps sont très similaires ?

Si vous observez des temps très similaires (par exemple, toujours entre 295-305 secondes), c'est **parfait** ! Cela montre :
- **Stabilité** de la plateforme
- **Faible variabilité** = plateforme fiable
- **Écart-type faible** = résultats prévisibles

C'est une **bonne nouvelle** pour votre analyse !

## Exemple de données réelles attendues

### GitHub Actions (10 exécutions)
```json
Run 1: 297s
Run 2: 285s  ← Cache disponible
Run 3: 301s  ← Runner chargé
Run 4: 290s
Run 5: 295s
Run 6: 298s
Run 7: 292s
Run 8: 300s
Run 9: 289s
Run 10: 294s

Moyenne: 294.1s
Médiane: 294.5s
Écart-type: 4.2s
```

### GitLab CI (10 exécutions)
```json
Pipeline 1: 492s
Pipeline 2: 485s
Pipeline 3: 510s  ← Queue time plus long
Pipeline 4: 488s
Pipeline 5: 495s
...

Moyenne: 495.2s
Médiane: 493.5s
Écart-type: 8.5s
```

## Checklist de Collecte

### GitHub Actions
- [ ] Run 1 collecté
- [ ] Run 2 collecté
- [ ] Run 3 collecté
- [ ] Run 4 collecté
- [ ] Run 5 collecté
- [ ] Run 6 collecté
- [ ] Run 7 collecté
- [ ] Run 8 collecté
- [ ] Run 9 collecté
- [ ] Run 10 collecté

### GitLab CI
- [ ] Pipeline 1 collecté
- [ ] Pipeline 2 collecté
- [ ] Pipeline 3 collecté
- [ ] Pipeline 4 collecté
- [ ] Pipeline 5 collecté
- [ ] Pipeline 6 collecté
- [ ] Pipeline 7 collecté
- [ ] Pipeline 8 collecté
- [ ] Pipeline 9 collecté
- [ ] Pipeline 10 collecté

### Jenkins
- [ ] Build 1 collecté
- [ ] Build 2 collecté
- [ ] Build 3 collecté
- [ ] Build 4 collecté
- [ ] Build 5 collecté
- [ ] Build 6 collecté
- [ ] Build 7 collecté
- [ ] Build 8 collecté
- [ ] Build 9 collecté
- [ ] Build 10 collecté

## Temps Estimé

- **Par exécution** : 5-10 minutes (selon durée du pipeline)
- **10 exécutions par plateforme** : 50-100 minutes
- **3 plateformes × 10 exécutions** : 2.5-5 heures
- **Avec pauses et organisation** : 1-2 jours

## Résumé

✅ **OUI**, vous devez relancer les pipelines 10 fois sur chaque plateforme

✅ **NON**, les données ne seront pas identiques (variabilité normale)

✅ **C'est important** pour une analyse statistique solide

✅ **Utilisez des commits vides** pour déclencher les pipelines rapidement

✅ **Notez toutes les différences** - c'est ce qui rend votre analyse intéressante !

## Prochaines Étapes

1. **Relancer les pipelines** 10 fois sur chaque plateforme
2. **Noter les temps** dans les fichiers JSON correspondants
3. **Observer la variabilité** (c'est normal et attendu)
4. **Valider les données** avec `scripts/validate-data.py`
5. **Consolider** avec `scripts/consolidate-data.py`
6. **Analyser** avec `scripts/advanced-statistics.py`

Bon courage pour la collecte ! 🚀

