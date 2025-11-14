pipeline {
    agent any

    tools {
        nodejs "node20"
    }

    stages {
        
        stage('Install Backend') {
            steps {
                echo "Installing backend dependencies..."
                dir('backend') {
                    sh "npm ci || npm install"
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running unit & integration tests..."
                dir('backend') {
                    sh "npm test"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo "Building the React frontend..."
                dir('frontend') {
                    sh "npm ci || npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker images..."
                sh "docker-compose build"
            }
        }

        stage('Docker Up (simulate deployment)') {
            steps {
                echo "Simulating deployment with Docker Compose..."
                sh "docker-compose up -d"
            }
        }
    }
}
