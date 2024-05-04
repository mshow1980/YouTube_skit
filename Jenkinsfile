pipeline {
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_USERNAME = 'mshow1980'
        APP_NAME = 'youtube_skit'
        IMAGE_NAME = "${ DOCKER_USERNAME}"+"/"+"${APP_NAME}"
        RELEASE = "1.0"
        IMAGE_TAG = "${RELEASE}"+"${BUILD_NUMBER}"
        REGISTRY_CREDS = 'DOcker-Login'

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
                    sh 'trivy fs . > trivyfile.html'
                }
            }
        }
        stage ('Building image') {
            steps {
                script{
                withDockerRegistry(credentialsId: 'DOcker-Login', toolName: 'docker') {
                    docker_image = docker.build "${IMAGE_NAME}"
                }
                withDockerRegistry(credentialsId: 'DOcker-Login', toolName: 'docker') {
                    docker_image.push("${IMAGE_TAG}")
                    docker_image.push("${latest}")                    
                    }
                }    
            }
        }
        stage('TRIVY Image SCAN'){
            steps{
                script{
                    sh 'trivy image  . > trivyimage.html'
                }
            }
        }
    }
}
