pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code from github repository -  staging branch'
                git branch: 'staging', url: 'https://github.com/DevOpsGroupL1/Front-end'
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies'
                sh '''
                if ! command -v yarn &> /dev/null; then
                    sudo npm install -g yarn
                fi
                '''
                sh 'yarn install'
            }
        }

        stage('Test') {
            steps {
                echo 'Performing test 123'
            }
        }

        stage('Quality Assurance gate') {
            steps {
                echo 'Checking dependencies quality'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment'
            }
        }

    }

    post {

        success {
            echo 'Build successful! Deleting previous build artifacts.'
            deleteDir()
            echo 'Archiving new build artifacts.'
            archiveArtifacts artifacts: '**/build/**', fingerprint: true
            cleanWs()
        }

        failure {
            echo 'Build failed. Check the logs for details.'
            cleanWs()
        }

    }

}
