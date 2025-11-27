# Guide d'installation et configuration de Jenkins

Ce guide vous explique comment installer, configurer et utiliser Jenkins pour exécuter les pipelines CI/CD de votre application BMI.

## Option 1 : Installation avec Docker (Recommandé - Plus simple)

### 1. Installer Docker
Assurez-vous que Docker est installé sur votre machine :
- Windows : [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Mac : [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Linux : `sudo apt-get install docker.io` (Ubuntu/Debian)

### 2. Lancer Jenkins avec Docker

```bash
# Créer un volume pour persister les données Jenkins
docker volume create jenkins_home

# Lancer Jenkins
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

**Note pour Windows :** Si vous utilisez Docker Desktop sur Windows, vous devrez peut-être ajuster le montage du socket Docker.

### 3. Accéder à Jenkins

1. Ouvrez votre navigateur et allez à : `http://localhost:8080`
2. Récupérez le mot de passe initial :
   ```bash
   docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Collez le mot de passe dans l'interface Jenkins

### 4. Installation des plugins

Sélectionnez "Install suggested plugins" ou installez manuellement :
- **Pipeline** (déjà inclus)
- **Git** (déjà inclus)
- **Docker Pipeline** (pour les builds Docker)
- **HTML Publisher** (pour les rapports de tests)
- **JUnit** (pour les résultats de tests)

## Option 2 : Installation native

### Windows

1. Téléchargez Jenkins : https://www.jenkins.io/download/
2. Téléchargez le fichier `.msi` pour Windows
3. Exécutez l'installateur et suivez les instructions
4. Jenkins sera accessible sur `http://localhost:8080`

### Linux (Ubuntu/Debian)

```bash
# Ajouter la clé du repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Ajouter le repository
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Installer Jenkins
sudo apt-get update
sudo apt-get install jenkins

# Démarrer Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Vérifier le statut
sudo systemctl status jenkins
```

### Mac

```bash
# Avec Homebrew
brew install jenkins-lts

# Démarrer Jenkins
brew services start jenkins-lts
```

## Configuration initiale

### 1. Première connexion

1. Ouvrez `http://localhost:8080`
2. Récupérez le mot de passe initial :
   - **Docker** : `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`
   - **Linux** : `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
   - **Windows** : Le mot de passe est affiché dans la console ou dans `C:\Program Files\Jenkins\secrets\initialAdminPassword`
3. Créez un compte administrateur

### 2. Installer les plugins nécessaires

Allez dans **Manage Jenkins** → **Plugins** → **Available plugins** et installez :
- **Pipeline**
- **Git**
- **Docker Pipeline** (si vous voulez builder des images Docker)
- **HTML Publisher Plugin** (pour les rapports de coverage)
- **JUnit Plugin** (pour les résultats de tests)
- **NodeJS Plugin** (pour gérer les versions de Node.js)

### 3. Configurer Node.js

1. Allez dans **Manage Jenkins** → **Global Tool Configuration**
2. Dans la section **NodeJS**, cliquez sur **Add NodeJS**
3. Configurez :
   - **Name** : `NodeJS-20`
   - **Version** : Sélectionnez Node.js 20.x
   - Cochez **Install automatically**
4. Cliquez sur **Save**

### 4. Configurer Git (si nécessaire)

Git est généralement déjà configuré. Vérifiez dans **Manage Jenkins** → **Global Tool Configuration** → **Git**.

### 5. Configurer Docker (optionnel)

Si vous voulez builder des images Docker :

1. Assurez-vous que Docker est installé et accessible
2. Pour Docker-in-Docker, vous devrez peut-être configurer un agent Docker séparé

## Créer un nouveau Pipeline

### Méthode 1 : Pipeline depuis SCM (Recommandé)

1. Cliquez sur **New Item** dans le menu principal
2. Entrez un nom pour votre projet (ex: `bmi-app-pipeline`)
3. Sélectionnez **Pipeline**
4. Cliquez sur **OK**

5. Dans la configuration :
   - **Description** : "Pipeline CI/CD pour l'application BMI"
   - Dans la section **Pipeline** :
     - **Definition** : Sélectionnez **Pipeline script from SCM**
     - **SCM** : Sélectionnez **Git**
     - **Repository URL** : Entrez l'URL de votre repository Git
       - Si c'est un repo local : `file:///chemin/vers/votre/repo`
       - Si c'est GitHub/GitLab : `https://github.com/votre-username/bmi_app.git`
     - **Credentials** : Ajoutez vos identifiants si nécessaire
     - **Branches to build** : `*/main` (ou la branche que vous voulez)
     - **Script Path** : `Jenkinsfile`
   - Cliquez sur **Save**

### Méthode 2 : Pipeline déclaratif inline

1. Créez un nouveau **Pipeline** comme ci-dessus
2. Dans la section **Pipeline** :
   - **Definition** : Sélectionnez **Pipeline script**
   - Collez le contenu de votre `Jenkinsfile` dans la zone de texte
   - Cliquez sur **Save**

## Lancer le Pipeline

### 1. Lancer manuellement

1. Allez sur la page principale de votre projet Jenkins
2. Cliquez sur **Build Now** dans le menu de gauche
3. Le pipeline va commencer à s'exécuter

### 2. Voir les résultats

1. Dans la page du projet, vous verrez la liste des builds dans **Build History**
2. Cliquez sur un build pour voir les détails
3. Cliquez sur **Console Output** pour voir les logs en temps réel
4. Cliquez sur **Pipeline Steps** pour voir un graphique visuel du pipeline

### 3. Voir les rapports

- **Test Results** : Résultats des tests JUnit
- **HTML Reports** : Rapports de coverage (Backend Coverage Report, Frontend Coverage Report, E2E Test Report)
- **Artifacts** : Fichiers générés (coverage, dist, playwright-report)

## Configuration des credentials (si nécessaire)

### Pour Docker Registry

1. Allez dans **Manage Jenkins** → **Credentials** → **System** → **Global credentials**
2. Cliquez sur **Add Credentials**
3. Configurez :
   - **Kind** : Username with password
   - **Scope** : Global
   - **Username** : Votre nom d'utilisateur Docker
   - **Password** : Votre mot de passe Docker
   - **ID** : `docker-registry-credentials`
   - **Description** : Docker Registry Credentials
4. Cliquez sur **OK**

## Dépannage

### Jenkins ne démarre pas

- **Docker** : Vérifiez les logs avec `docker logs jenkins`
- **Linux** : Vérifiez le statut avec `sudo systemctl status jenkins`
- **Windows** : Vérifiez les services Windows

### Erreur "Node.js not found"

1. Installez le plugin **NodeJS Plugin**
2. Configurez Node.js dans **Manage Jenkins** → **Global Tool Configuration**
3. Assurez-vous que le nom dans le pipeline correspond à la configuration

### Erreur "Docker not found"

- Vérifiez que Docker est installé et accessible
- Pour Docker-in-Docker, vous devrez peut-être utiliser un agent Docker séparé
- Le pipeline continuera même si Docker échoue (grâce à la gestion d'erreur)

### Erreur "Git not found"

1. Installez Git sur votre système
2. Configurez Git dans **Manage Jenkins** → **Global Tool Configuration**

### Port 8080 déjà utilisé

Changez le port :
- **Docker** : `docker run -p 8081:8080 ...`
- **Linux** : Modifiez `/etc/default/jenkins` et changez `HTTP_PORT=8080` en `HTTP_PORT=8081`
- **Windows** : Modifiez le fichier de configuration Jenkins

## Commandes utiles

### Docker

```bash
# Voir les logs
docker logs jenkins

# Redémarrer Jenkins
docker restart jenkins

# Arrêter Jenkins
docker stop jenkins

# Démarrer Jenkins
docker start jenkins

# Supprimer Jenkins (⚠️ supprime aussi les données)
docker rm -f jenkins
docker volume rm jenkins_home
```

### Linux

```bash
# Démarrer Jenkins
sudo systemctl start jenkins

# Arrêter Jenkins
sudo systemctl stop jenkins

# Redémarrer Jenkins
sudo systemctl restart jenkins

# Voir les logs
sudo journalctl -u jenkins -f
```

## Prochaines étapes

1. ✅ Jenkins est installé et configuré
2. ✅ Le pipeline est créé
3. ✅ Lancez votre premier build
4. ✅ Consultez les rapports et artifacts
5. ✅ Configurez les webhooks pour déclencher automatiquement les builds (optionnel)

## Ressources

- Documentation officielle Jenkins : https://www.jenkins.io/doc/
- Documentation Pipeline : https://www.jenkins.io/doc/book/pipeline/
- Jenkinsfile syntax : https://www.jenkins.io/doc/book/pipeline/syntax/

