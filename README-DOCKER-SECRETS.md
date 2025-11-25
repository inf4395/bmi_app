# Configuration des Secrets Docker pour GitHub Actions

## Problème

Si vous voyez l'erreur `Error: Username and password required` lors de l'exécution du workflow GitHub Actions, cela signifie que les secrets Docker ne sont pas configurés.

## Solution

Le workflow a été modifié pour fonctionner **même sans secrets Docker**. Les images seront construites localement mais ne seront pas poussées vers Docker Hub.

### Option 1 : Continuer sans secrets (Build local uniquement)

Le workflow fonctionnera sans configuration supplémentaire. Les images Docker seront construites mais ne seront pas poussées vers un registre.

### Option 2 : Configurer les secrets Docker (Build + Push)

Pour pousser les images vers Docker Hub, configurez les secrets suivants dans GitHub :

1. Allez dans votre repository GitHub
2. Cliquez sur **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez les secrets suivants :

   - **Nom** : `DOCKER_USERNAME`
     - **Valeur** : Votre nom d'utilisateur Docker Hub (ex: `monusername`)

   - **Nom** : `DOCKER_PASSWORD`
     - **Valeur** : Votre token d'accès Docker Hub (pas votre mot de passe)
     - Pour créer un token : https://hub.docker.com/settings/security

## Vérification

Après avoir configuré les secrets, le workflow :
- ✅ Se connectera automatiquement à Docker Hub
- ✅ Construira les images
- ✅ Les poussera vers Docker Hub avec les tags appropriés

## Notes

- Les secrets sont **optionnels** - le workflow fonctionne sans eux
- Les images seront construites localement même sans secrets
- Le push vers Docker Hub nécessite les secrets
- Les secrets ne sont jamais exposés dans les logs

