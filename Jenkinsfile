pipeline {
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_USERNAME = 'mshow1980'
        APP_NAME = 'YouTube_skit'
        DOCKER_HOME =toolName: 'docker'
        IMAGE_NAME = "${ DOCKER_USERNAME}"+"/"+"${APP_NAME}"
        RELEASE = "1.0"
        IMAGE_TAG = "${RELEASE}"+"${BUILD_NUMBER}"

    }
    stages {
        stage('CleanWS') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mshow1980/YouTube_skit.git']])
            }
        }
        stage('installing Dependencies') {
            steps {
                script{

                    sh'npm install'
                }
            }
        }
        stage ('Sonarqube analysis'){
            steps {
                script {
                    sh """
                    npm install sonar-scanner
                    npm run sonar 
                    """
                    }
                }
            }
        stage ('OWASP Dependency-Check Vulnerabilities') {
            steps {
                script{
                dependencyCheck additionalArguments: ''' 
                    -o "./" 
                    -s "./"
                    -f "ALL" 
                    --prettyPrint''', odcInstallation: 'OWASP-DC'
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                }
            }
        }
        stage('TRIVY FS SCAN'){
            steps{
                script{
                    sh “ trivy fs . ” 
                }
            }
        }
        stage ('Building image') {
            steps {
                withDockerRegistry(credentialsId: 'DOcker-Login', "${DOCKER_HOME}") {
                sh"""  
                    docker_image = docker.build "${IMAGE_NAME}"
                    docker_tag = docker_image("${ IMAGE_TAG}")
                    
                    """
                }
            }
        }
    }
}