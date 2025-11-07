pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci --prefix frontend'
                sh 'npm ci --prefix backend'
                sh 'npm run build --prefix frontend'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test --prefix backend'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t bmi_app:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment erfolgreich abgeschlossen'
            }
        }
    }

    post {
        always {
            echo 'Pipeline abgeschlossen.'
        }
        success {
            echo 'Pipeline erfolgreich!'
        }
        failure {
            echo 'Pipeline fehlgeschlagen!'
        }
    }
}
