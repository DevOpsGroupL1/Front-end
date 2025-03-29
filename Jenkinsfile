pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'staging', url: 'https://github.com/DevOpsGroupL1/Front-end'

                echo 'Source code from github repository -  staging branch'
            }
        }

        stage('Build and Install dependencies') {
            steps {
                echo 'Installing application dependencies'
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
            echo 'Build successful! Artifacts archived.'
            cleanWs()
        }

        failure {
            echo 'Build failed. Check the logs for details.'
            cleanWs()
        }

    }

}
