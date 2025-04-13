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

        stage('Build docker image') {
            steps {
                echo 'Building docker image'
                sh 'docker build -t groupone:latest -f Docker/Dockerfile.prod .'
            }
        }

        stage('Deploy docker image to docker hub registry') {
            steps {
								echo 'Deploying docker image to docker hub'
                withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {

                sh 'echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin docker.io'

                sh 'docker tag groupone:latest hardarmyyy/groupone:latest'
                sh 'docker push hardarmyyy/groupone:latest'

               	}
            }
        }

    }

    post {
        
        always {
            echo 'logging out of docker hub'
            sh 'docker logout'
        }

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
