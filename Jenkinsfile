pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        // ============================================
        // STAGE 1: LINT
        // ============================================
        
        stage('Lint') {
            parallel {
                stage('Lint Backend') {
                    steps {
                        echo "Linting backend code..."
                        dir('backend') {
                            sh "npm ci || npm install"
                            sh "npm run lint || echo 'No lint script, skipping...'"
                        }
                    }
                }
                stage('Lint Frontend') {
                    steps {
                        echo "Linting frontend code..."
                        dir('frontend') {
                            sh "npm ci || npm install"
                            sh "npm run lint"
                        }
                    }
                }
            }
        }

        // ============================================
        // STAGE 2: TEST
        // ============================================
        
        stage('Test') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        echo "Running backend tests..."
                        dir('backend') {
                            sh "npm ci || npm install"
                            sh "npm test"
                        }
                    }
                    post {
                        always {
                            junit testResults: 'backend/test-results.xml', allowEmptyResults: true
                            archiveArtifacts artifacts: 'backend/coverage/**/*', allowEmptyArchive: true
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        echo "Running frontend tests..."
                        dir('frontend') {
                            sh "npm ci || npm install"
                            sh "npm test"
                        }
                    }
                    post {
                        always {
                            junit testResults: 'frontend/test-results.xml', allowEmptyResults: true
                            archiveArtifacts artifacts: 'frontend/coverage/**/*', allowEmptyArchive: true
                        }
                    }
                }
            }
        }

        // ============================================
        // STAGE 3: BUILD
        // ============================================
        
        stage('Build') {
            steps {
                echo "Building frontend..."
                dir('frontend') {
                    sh "npm ci || npm install"
                    sh "npm run build"
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'frontend/dist/**/*', fingerprint: true
                }
            }
        }

        // ============================================
        // STAGE 4: E2E TESTS
        // ============================================
        
        stage('E2E Tests') {
            steps {
                echo "Running E2E tests..."
                script {
                    sh "npm ci || npm install || echo 'No root package.json'"
                    
                    dir('backend') {
                        sh "npm ci || npm install"
                    }
                    
                    dir('frontend') {
                        sh "npm ci || npm install"
                    }
                    
                    sh "npx playwright install --with-deps chromium firefox webkit"
                    
                    sh """
                        cd backend
                        npm start > ../backend.log 2>&1 &
                        echo \$! > ../backend.pid
                    """
                    
                    sh """
                        cd frontend
                        npm run dev -- --host 0.0.0.0 --port 5173 > ../frontend.log 2>&1 &
                        echo \$! > ../frontend.pid
                    """
                    
                    sh """
                        timeout 60 bash -c 'until curl -f http://localhost:3000/api/health; do sleep 2; done'
                        timeout 60 bash -c 'until curl -f http://localhost:5173; do sleep 2; done'
                    """
                    
                    sh "npm run test:e2e"
                }
            }
            post {
                always {
                    sh """
                        if [ -f backend.pid ]; then
                            kill \$(cat backend.pid) || true
                            rm backend.pid
                        fi
                        if [ -f frontend.pid ]; then
                            kill \$(cat frontend.pid) || true
                            rm frontend.pid
                        fi
                    """
                    archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                }
            }
        }


        // ============================================
        // STAGE 6: DEPLOY
        // ============================================
        
        stage('Deploy') {
            when {
                expression {
                    env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'develop' ||
                    env.GIT_BRANCH == 'origin/main' || env.GIT_BRANCH == 'origin/develop'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop' || env.GIT_BRANCH == 'origin/develop') {
                        sh """
                            echo "Deploying to staging..."
                            echo "Add your deployment commands here"
                            echo "Example: kubectl apply -f k8s/staging/"
                            echo "Or: docker-compose -f docker-compose.staging.yml up -d"
                            echo "Note: Deployment is simulated for CI/CD comparison purposes"
                        """
                    } else if (env.BRANCH_NAME == 'main' || env.GIT_BRANCH == 'origin/main') {
                        sh """
                            echo "Deploying to production..."
                            echo "Add your deployment commands here"
                            echo "Example: kubectl apply -f k8s/production/"
                            echo "Or: docker-compose -f docker-compose.prod.yml up -d"
                            echo "Note: Deployment is simulated for CI/CD comparison purposes"
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Cleaning up..."
            }
        }
        success {
            echo "Pipeline succeeded!"
        }
        failure {
            echo "Pipeline failed!"
        }
        unstable {
            echo "Pipeline unstable!"
        }
    }
}
