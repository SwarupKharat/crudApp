pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the source code...'
                git 'https://github.com/SwarupKharat/crudApp.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }
        stage('Start Application') {
            steps {
                script {
                    bat 'npm start'  // Runs the Node.js app
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
