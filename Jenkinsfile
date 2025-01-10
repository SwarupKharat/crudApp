pipeline {
    agent any
    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out the source code...'
                checkout scm // This checks out the code from your repository
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                script {
                    // Install dependencies using npm
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                script {
                    // Run any build commands, e.g., transpile code if needed
                    sh 'npm run build' // If your app has a build step defined in package.json
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    // Run tests if you have any defined
                    sh 'npm test' // This will run the tests if they are set up
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution finished.'
            // You can add any cleanup tasks or notifications here
        }
    }
}
