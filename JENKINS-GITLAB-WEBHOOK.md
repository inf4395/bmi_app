# Configuration du Webhook GitLab vers Jenkins

Ce guide explique comment configurer le déclenchement automatique du pipeline Jenkins depuis GitLab.

## Problème

Jenkins récupère bien le code depuis GitLab, mais le pipeline ne se lance pas automatiquement lors d'un push.

## Solution : Configurer le Webhook GitLab

### Étape 1 : Installer le plugin GitLab dans Jenkins

1. Allez dans **Manage Jenkins** → **Plugins** → **Available plugins**
2. Recherchez et installez : **GitLab Plugin**
3. Redémarrez Jenkins si nécessaire

### Étape 2 : Configurer GitLab dans Jenkins

1. Allez dans **Manage Jenkins** → **Configure System**
2. Faites défiler jusqu'à la section **GitLab**
3. Cliquez sur **Add GitLab connection**
4. Configurez :
   - **Connection name** : `GitLab` (ou un nom de votre choix)
   - **GitLab host URL** : L'URL de votre instance GitLab
     - GitLab.com : `https://gitlab.com`
     - GitLab self-hosted : `https://votre-gitlab.example.com`
   - **Credentials** : Cliquez sur **Add** pour ajouter vos credentials GitLab
     - **Kind** : GitLab API token
     - **API token** : Votre token d'accès GitLab (voir étape 3)
   - **Test Connection** : Cliquez pour vérifier la connexion
5. Cliquez sur **Save**

### Étape 3 : Créer un token d'accès GitLab

1. Dans GitLab, allez dans votre profil → **Preferences** → **Access Tokens**
2. Ou directement : `https://gitlab.com/-/profile/personal_access_tokens`
3. Créez un nouveau token :
   - **Token name** : `Jenkins CI/CD`
   - **Expiration date** : (optionnel)
   - **Scopes** : Cochez au minimum :
     - ✅ `api` (accès complet à l'API)
     - ✅ `read_repository` (lecture du repository)
4. Cliquez sur **Create personal access token**
5. **⚠️ IMPORTANT** : Copiez le token immédiatement (il ne sera plus visible après)
6. Utilisez ce token dans Jenkins (étape 2)

### Étape 4 : Configurer le Pipeline Jenkins

1. Allez dans votre projet Jenkins (ex: `bmi-app-pipeline`)
2. Cliquez sur **Configure**
3. Dans la section **Build Triggers**, cochez :
   - ✅ **Build when a change is pushed to GitLab**
   - Ou ✅ **Opened Merge Request Events** (si vous voulez aussi déclencher sur les MR)
4. Dans **GitLab connection** : Sélectionnez la connexion GitLab créée à l'étape 2
5. Dans **Trigger** : Sélectionnez les événements :
   - ✅ **Push Events** (déclenche sur push)
   - ✅ **Opened Merge Request Events** (déclenche sur MR ouverte)
   - ✅ **Approved Merge Request Events** (déclenche sur MR approuvée)
   - ✅ **Closed Merge Request Events** (déclenche sur MR fermée)
6. Dans **Branches** : Spécifiez les branches à surveiller :
   - `main`
   - `develop`
   - Ou laissez vide pour toutes les branches
7. Cliquez sur **Save**

### Étape 5 : Configurer le Webhook dans GitLab

1. Dans GitLab, allez dans votre projet
2. Allez dans **Settings** → **Webhooks**
3. Cliquez sur **Add webhook**
4. Configurez le webhook :
   - **URL** : `http://votre-jenkins:8080/project/votre-pipeline-name`
     - Remplacez `votre-jenkins` par l'IP ou le domaine de votre Jenkins
     - Remplacez `votre-pipeline-name` par le nom exact de votre projet Jenkins
     - Exemple : `http://192.168.1.100:8080/project/bmi-app-pipeline`
     - Exemple : `http://jenkins.example.com:8080/project/bmi-app-pipeline`
   - **Secret token** : (optionnel mais recommandé)
     - Générez un token aléatoire (ex: `openssl rand -hex 16`)
     - Notez-le, vous devrez le configurer dans Jenkins aussi
   - **Trigger** : Cochez les événements :
     - ✅ **Push events** (push vers une branche)
     - ✅ **Merge request events** (ouverture/fermeture de MR)
     - ✅ **Tag push events** (si vous voulez déclencher sur les tags)
   - **Enable SSL verification** : 
     - ✅ Cochez si Jenkins utilise HTTPS avec un certificat valide
     - ❌ Décochez si Jenkins est en HTTP ou utilise un certificat auto-signé
5. Cliquez sur **Add webhook**
6. **Testez le webhook** : Cliquez sur **Test** → **Push events** pour vérifier

### Étape 6 : Configurer le Secret Token dans Jenkins (si utilisé)

Si vous avez configuré un secret token dans GitLab :

1. Dans Jenkins, allez dans votre projet → **Configure**
2. Dans la section **Build Triggers** → **Build when a change is pushed to GitLab**
3. Dans **Secret token** : Entrez le même token que dans GitLab
4. Cliquez sur **Save**

### Étape 7 : Vérifier la configuration

1. **Test manuel** :
   - Dans GitLab, allez dans **Settings** → **Webhooks**
   - Cliquez sur **Test** → **Push events**
   - Vérifiez dans Jenkins que le build se déclenche

2. **Test réel** :
   - Faites un petit changement dans votre code
   - Commitez et poussez vers GitLab :
     ```bash
     git add .
     git commit -m "Test webhook Jenkins"
     git push origin main
     ```
   - Vérifiez dans Jenkins que le pipeline se lance automatiquement

## Dépannage

### Le webhook ne se déclenche pas

1. **Vérifiez les logs GitLab** :
   - Dans GitLab → **Settings** → **Webhooks**
   - Cliquez sur votre webhook
   - Regardez les **Recent events** et les **HTTP responses**
   - Vérifiez les codes de réponse (200 = succès, 4xx/5xx = erreur)

2. **Vérifiez les logs Jenkins** :
   - Dans Jenkins → **Manage Jenkins** → **System Log**
   - Cherchez les erreurs liées à GitLab

3. **Vérifiez la connectivité réseau** :
   - GitLab doit pouvoir accéder à Jenkins
   - Si Jenkins est en local, utilisez un service de tunneling (ngrok, etc.)
   - Ou configurez un reverse proxy

4. **Vérifiez l'URL du webhook** :
   - L'URL doit être accessible depuis GitLab
   - L'URL doit correspondre exactement au nom du projet Jenkins
   - Le nom du projet est sensible à la casse

### Erreur "403 Forbidden" ou "401 Unauthorized"

- Vérifiez que le token GitLab est valide
- Vérifiez que le token a les bonnes permissions (api, read_repository)
- Vérifiez que le secret token correspond entre GitLab et Jenkins

### Erreur "Connection refused"

- Vérifiez que Jenkins est accessible depuis GitLab
- Vérifiez le firewall
- Si Jenkins est en local, utilisez un tunnel ou un reverse proxy

### Le pipeline se déclenche mais échoue

- Vérifiez les logs du build dans Jenkins
- Vérifiez que toutes les dépendances sont installées
- Vérifiez que les credentials sont correctement configurés

## Alternative : Polling SCM (moins recommandé)

Si le webhook ne fonctionne pas, vous pouvez utiliser le polling :

1. Dans Jenkins → **Configure** votre projet
2. Dans **Build Triggers**, cochez :
   - ✅ **Poll SCM**
3. Dans **Schedule**, entrez une expression cron :
   - Exemple : `H/5 * * * *` (toutes les 5 minutes)
   - Exemple : `H * * * *` (toutes les heures)
4. Cliquez sur **Save**

**Note** : Le polling est moins efficace que le webhook car il vérifie périodiquement au lieu de réagir immédiatement.

## Configuration avec Jenkins en local (derrière un firewall)

Si Jenkins est en local et non accessible depuis Internet :

### Option 1 : Utiliser ngrok (pour les tests)

```bash
# Installer ngrok
# Télécharger depuis https://ngrok.com/

# Créer un tunnel vers Jenkins
ngrok http 8080

# Utiliser l'URL fournie par ngrok dans le webhook GitLab
# Exemple : https://abc123.ngrok.io/project/bmi-app-pipeline
```

### Option 2 : Utiliser un reverse proxy

Configurez un reverse proxy (nginx, Apache) pour exposer Jenkins de manière sécurisée.

### Option 3 : Utiliser le polling SCM

Utilisez le polling comme alternative (voir section ci-dessus).

## Vérification finale

Une fois configuré, vous devriez voir :

1. ✅ Dans GitLab → **Settings** → **Webhooks** : Les événements sont enregistrés avec des codes 200
2. ✅ Dans Jenkins : Les builds se déclenchent automatiquement lors d'un push
3. ✅ Dans Jenkins → **Build History** : Vous voyez les builds déclenchés par GitLab

## Ressources

- [Documentation GitLab Plugin Jenkins](https://plugins.jenkins.io/gitlab-plugin/)
- [Documentation GitLab Webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)
- [Jenkins GitLab Plugin GitHub](https://github.com/jenkinsci/gitlab-plugin)

