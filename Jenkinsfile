pipeline {
    agent any

    environment {
        DOCKER_HOST = "tcp://localhost:2375"
    }

    stages {

        stage('Install Backend') {
            steps {
                echo "Installing backend dependencies..."
                dir('backend') {
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running backend tests..."
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "Building frontend..."
                dir('frontend') {
                    sh 'npm ci || npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker images with docker-compose..."
                sh 'docker-compose build'
            }
        }

        stage('Docker Up (simulate deployment)') {
            steps {
                echo "Starting containers (simulation only)..."
                sh 'docker-compose up -d'
            }
        }
    }
}
