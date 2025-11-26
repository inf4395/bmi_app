# Guide d'Utilisation - Analyse des Performances CI/CD

## ✅ Étape 1 : Tester le script avec des données d'exemple

J'ai créé des fichiers d'exemple pour tester le script. Vous pouvez les exécuter maintenant :

```bash
python scripts/analyze-results.py results/performance/
```

Cela va :
- ✅ Analyser les données d'exemple
- ✅ Afficher les statistiques
- ✅ Créer un graphique de comparaison dans `results/comparison.png`

## 📊 Étape 2 : Collecter les vraies données

### Option A : Collecte manuelle (Recommandé pour commencer)

1. **Exécuter les pipelines** sur chaque plateforme (10 fois chacune)
2. **Noter les temps d'exécution** pour chaque run
3. **Créer des fichiers JSON** dans `results/performance/`

Format du fichier JSON :
```json
{
  "platform": "github",
  "runs": 10,
  "timestamp": "20250126_120000",
  "executions": [
    {
      "run": 1,
      "duration": 245.3,
      "start_time": 1704110400.0,
      "end_time": 1704110645.3
    },
    ...
  ]
}
```

### Option B : Collecte automatique (Avancé)

Utiliser les APIs des plateformes pour récupérer automatiquement les temps d'exécution.

#### GitHub Actions
```bash
# Installer GitHub CLI
gh auth login

# Récupérer les temps d'exécution
gh run list --workflow="BMI App CI/CD" --json databaseId,conclusion,startedAt,updatedAt
```

#### GitLab CI
```bash
# Via API GitLab
curl --header "PRIVATE-TOKEN: <your-token>" \
  "https://gitlab.com/api/v4/projects/<project-id>/pipelines"
```

#### Jenkins
```bash
# Via Jenkins API
curl -u username:token \
  "http://jenkins-url/job/BMI-App-Pipeline/api/json?tree=builds[number,duration,timestamp]"
```

## 📈 Étape 3 : Analyser les résultats

Une fois que vous avez collecté les données réelles :

```bash
python scripts/analyze-results.py results/performance/
```

Le script va :
1. Charger tous les fichiers JSON
2. Calculer les statistiques (moyenne, médiane, min, max, écart-type)
3. Afficher un tableau comparatif
4. Générer un graphique `results/comparison.png`

## 📝 Étape 4 : Documenter les résultats

Utilisez le template `EVALUATION-TEMPLATE.md` pour documenter :
- Temps de configuration
- Erreurs rencontrées
- Expérience utilisateur
- Comparaison avec/sans KI

## 🎯 Prochaines étapes pour votre thèse

### 1. Collecte de données (Semaine 1-2)
- [ ] Exécuter 10 pipelines sur GitHub Actions
- [ ] Exécuter 10 pipelines sur GitLab CI
- [ ] Exécuter 10 pipelines sur Jenkins
- [ ] Noter les temps d'exécution

### 2. Configuration avec/sans KI (Semaine 2-3)
- [ ] Configurer chaque plateforme sans KI
- [ ] Noter le temps et les difficultés
- [ ] Reconfigurer avec KI (GitHub Copilot, etc.)
- [ ] Comparer les résultats

### 3. Analyse (Semaine 3-4)
- [ ] Utiliser le script Python pour analyser
- [ ] Créer des graphiques
- [ ] Remplir les tableaux de comparaison
- [ ] Documenter les conclusions

### 4. Rédaction (Semaine 4-6)
- [ ] Intégrer les résultats dans la thèse
- [ ] Créer des visualisations
- [ ] Rédiger les recommandations

## 📚 Ressources utiles

- **EVALUATION-FRAMEWORK.md** : Framework complet d'évaluation
- **EVALUATION-TEMPLATE.md** : Template pour documenter les tests
- **README-CICD-COMPARISON.md** : Comparaison détaillée des plateformes
- **scripts/measure-performance.sh** : Script pour mesurer automatiquement (à adapter)

## 💡 Astuces

1. **Commencez petit** : Testez avec 3-5 exécutions d'abord
2. **Documentez tout** : Prenez des notes pendant les tests
3. **Screenshots** : Capturez les interfaces et erreurs
4. **Temps réel** : Utilisez un chronomètre pour la configuration
5. **Backup** : Sauvegardez vos fichiers JSON régulièrement

## ❓ Questions fréquentes

**Q: Combien d'exécutions dois-je faire ?**
R: Minimum 10 par plateforme pour des statistiques fiables.

**Q: Comment mesurer le temps de configuration ?**
R: Utilisez un chronomètre et remplissez `EVALUATION-TEMPLATE.md`.

**Q: Le graphique ne s'affiche pas ?**
R: Vérifiez que matplotlib est installé : `pip install matplotlib`

**Q: Comment exporter les données pour Excel ?**
R: Le script génère du JSON, vous pouvez l'importer dans Excel ou créer un export CSV.

