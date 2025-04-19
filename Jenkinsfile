def repoName = ''
def branchName = ''

pipeline {

    agent any
    
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

        stage('Quality Assurance gate') {
            when {               
                branch 'PR-*'               
            }
            steps {
                script {
                    dir('Front-end') {
                        echo "Running quality assurance for ${repoName} repository."
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
                        sh 'docker build -t groupone -f Docker/Dockerfile.prod .'
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

                            sh "docker tag groupone hardarmyyy/groupone-${BUILD_NUMBER}:latest"
                            sh "docker push hardarmyyy/groupone-${BUILD_NUMBER}:latest"

                        }
                    }
                }               
            }
        }

    }

    post {
        
        success {
            script {
                echo "Build successful. Cleaning up docker images for ${repoName} repository."
                sh "docker rmi -f hardarmyyy/groupone-${BUILD_NUMBER}:latest"

                echo 'logging out of docker hub'
                sh 'docker logout'

                echo 'Storing build artifacts in the Jenkins workspace.'
                dir('Front-end') {
                    archiveArtifacts artifacts: '**', allowEmptyArchive: true
                }
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
