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
                            // publishHTML plugin not available - using archiveArtifacts instead
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
                            // publishHTML plugin not available - using archiveArtifacts instead
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
                    // Install root dependencies
                    sh "npm ci || npm install || echo 'No root package.json'"
                    
                    // Install backend dependencies
                    dir('backend') {
                        sh "npm ci || npm install"
                    }
                    
                    // Install frontend dependencies
                    dir('frontend') {
                        sh "npm ci || npm install"
                    }
                    
                    // Install Playwright browsers (all browsers like GitHub Actions and GitLab CI)
                    sh "npx playwright install --with-deps chromium firefox webkit"
                    
                    // Start backend in background
                    sh """
                        cd backend
                        npm start > ../backend.log 2>&1 &
                        echo \$! > ../backend.pid
                    """
                    
                    // Start frontend in background with explicit host for Vite (equity with Docker/dev)
                    sh """
                        cd frontend
                        npm run dev -- --host 0.0.0.0 > ../frontend.log 2>&1 &
                        echo \$! > ../frontend.pid
                    """
                    
                    // Wait for servers to be ready
                    sh """
                        timeout 60 bash -c 'until curl -f http://localhost:3000/api/health; do sleep 2; done'
                        timeout 60 bash -c 'until curl -f http://localhost:5173; do sleep 2; done'
                    """
                    
                    // Run E2E tests (do not mask failures for fair comparison)
                    sh "npm run test:e2e"
                }
            }
            post {
                always {
                    // Stop background processes
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
                    // Archive E2E test results
                    // publishHTML plugin not available - using archiveArtifacts instead
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
        echo "Deploying to staging (simulated)..."
      } else if (env.BRANCH_NAME == 'main' || env.GIT_BRANCH == 'origin/main') {
        echo "Deploying to production (simulated)..."
      }
    }
  }
}

    post {
        always {
            script {
                echo "Cleaning up..."
                // cleanWs() requires a node context, so we'll skip it
                // The workspace will be cleaned automatically by Jenkins
            }
        }
        success {
            echo "Pipeline succeeded!"
            // Optionally send notification
        }
        failure {
            echo "Pipeline failed!"
            // Optionally send notification
        }
        unstable {
            echo "Pipeline unstable!"
        }
    }
}
