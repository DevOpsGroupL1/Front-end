def repoName = ''
def branchName = ''

pipeline {

    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }
    
    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Initialize variables') {
            steps {
                script {
                    repoName = env.GIT_URL?.tokenize('/').last()?.replace('.git', '')
                    branchName = env.GIT_BRANCH?.replaceFirst(/^origin\//, '')
                }
            }
        }

        stage('Checkout Repositories') {
            when {
                anyOf {
                    branch 'PR-*'
                    expression {
                        return branchName == 'staging'
                    }
                }
            }
            steps {
                script {
                    echo "Checking out the source code from the repository: ${repoName} - branch: ${branchName}"
                    dir('Front-end') {
                        checkout scm
                    }  
                }
            }
        }

        stage('Build and Install dependencies') {
            when {
                branch 'PR-*'
            }
            steps {
                script {
                    dir('Front-end') {
                        echo "Installing dependencies for ${repoName} on branch ${branchName}."
                        sh 'yarn install'
                    }
                }              
            }
        }

        stage('SonarQube analysis') {
            when {
                branch 'PR-*'
            }
            steps {
                script {
                    dir('Front-end') {
                        echo "Running SonarQube analysis for ${repoName} repository."
                        withSonarQubeEnv('sonar-server') {
                            sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectName=${repoName} -Dsonar.projectKey=${repoName} -Dsonar.projectVersion=${BUILD_NUMBER}"
                        }
                    }
                }
            }
        }

        stage('SonarQube quality gate') {
            when {
                branch 'PR-*'
            }
            steps {
                script {
                    echo "Waiting for SonarQube quality gate to pass for ${repoName} repository."                  
                    waitForQualityGate abortPipeline: true, credentialsId: 'Sonar-token'                   
                }
            }
        }

        stage('Test') {
            when {
                branch 'PR-*'
            }
            steps {
                script {
                    dir('Front-end') {
                        echo "Running tests for ${repoName} repository."
                    }
                }
            }
        }

        stage('Build docker image') {
            when {
                expression {
                    return branchName == 'staging'
                }
            }
            steps {
                script {
                    dir('Front-end') {
                        echo "Building docker image for ${repoName} repository."
                        sh 'docker build -t groupone -f Docker/Dockerfile.staging .'
                    }
                }
            }
        }

        stage('Deploy docker image to docker hub registry') {
            when {
                expression {
                    return branchName == 'staging'
                }
            }
            steps {
                script {
                    dir('Front-end') {
                        echo "Deploying docker image to docker hub registry for ${repoName} repository."
                        withCredentials([usernamePassword(credentialsId: "${DOCKER_REGISTRY_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {

                            sh 'echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin docker.io'

                            sh "docker tag groupone ${env.USERNAME}/groupone-${BUILD_NUMBER}:latest"
                            sh "docker push ${env.USERNAME}/groupone-${BUILD_NUMBER}:latest"

                        }
                    }
                }               
            }
        }

        stage('Clean up docker images') {
            when {
                expression {
                    return branchName == 'staging'
                }
            }
            steps {
                script {
                    echo "Cleaning up docker images for ${repoName} repository."
                    sh "docker rmi -f ${env.USERNAME}/groupone-${BUILD_NUMBER}:latest"
                    sh "docker rmi -f groupone"
                }
            }
        }

        stage('Logout from docker hub') {
            when {
                expression {
                    return branchName == 'staging'
                }
            }
            steps {
                script {
                    echo 'Logging out of docker hub.'
                    sh 'docker logout'
                }
            }
        }

        stage('Deploy to staging environment') {
            when {
                expression {
                    return branchName == 'staging'
                }
            }
            steps {
                script {
                    echo "Deploying to staging environment for ${repoName} repository."
                    sshagent(['jenkins-staging-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.STAGING_USERNAME}@${env.STAGING_REMOTE_HOST} '
                        docker stop stagingfe || true &&
                        docker rm stagingfe || true  &&
                        docker image prune -af || true &&
                        docker run -d -p ${env.STAGING_PORT_FE}:5173 --name=stagingfe ${env.USERNAME}/groupone-${BUILD_NUMBER}:latest
                        '
                    """
                }
                }
            }
        }

        stage('Store build artifacts') {
            when {
                expression {
                    return branchName == 'staging'
                }
            }
            steps {
                script {
                    echo 'Storing build artifacts in the Jenkins workspace.'
                    dir('Front-end') {
                        archiveArtifacts artifacts: '**', allowEmptyArchive: true
                    }
                }
            }
        }

    }

    post {
        
        success {
            script {
                echo 'Build completed successfully.'
                cleanWs()
            }           
        }

        failure {
            echo 'Build failed. Check the logs for details.'
            cleanWs()
        }

        aborted {
            echo 'Build was aborted. Check the logs for details.'
            cleanWs()
        }
    }
}
