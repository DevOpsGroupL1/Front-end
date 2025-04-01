pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code from github repository -  staging branch'
                git branch: 'staging', url: 'https://github.com/DevOpsGroupL1/Front-end'
            }
        }

        stage('Install and build dependencies') {
            steps {
                echo 'Installing dependencies'
                script {
                    def nodejs = tool name: 'NodeJS 20', type: 'NodeJS installations'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
                sh 'npm install -g yarn'
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
            echo 'Build successful! Artifacts archived.'
            cleanWs()
        }

        failure {
            echo 'Build failed. Check the logs for details.'
            cleanWs()
        }

    }

}
