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
                sh 'yarn install'
            }
        }

        stage('Debug Workspace') {
            steps {
                echo 'Listing workspace contents...'
                sh 'ls -R'
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

        stage('Deploy to docker') {
            steps {
                echo 'Deployment'
            }
        }

    }

    post {

        success {
            echo 'Build successful! Archiving new build artifacts.'
            archiveArtifacts artifacts: '**', allowEmptyArchive: true
            cleanWs()
        }

        failure {
            echo 'Build failed. Check the logs for details.'
            cleanWs()
        }

    }

}
