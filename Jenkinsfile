pipeline {
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_USERNAME = 'mshow1980'
        APP_NAME = 'youtube_skitto'
        IMAGE_NAME = "${ DOCKER_USERNAME}"+"/"+"${APP_NAME}"
        RELEASE = "2.0"
        IMAGE_TAG = "${RELEASE}"+"${BUILD_NUMBER}"
        REGISTRY_CREDS = 'Docker-Login'
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
                    sh 'trivy fs . > trivyfile.txt'
                    }
                }
            }        
        stage ('Building  Push Image') {
            steps {
                script{
                withDockerRegistry(credentialsId: 'Docker-Login', toolName: 'docker') {
                    docker_image = docker.build "${IMAGE_NAME}"
                    docker_image.push("${IMAGE_TAG}")
                    docker_image.push("latest")
                    }
                }    
            }
        }
        stage("TRIVY Image SCAN"){
            steps{
                    sh "trivy --timeout 10m image mshow1980/youtube_skit:latest > trivyimage.txt "
            }
        post{
            always{
                slackSend channel: 'automation-group', 
                color: 'Blue', 
                message: '"started ${JOB_NAME} ${BUILD_NUMBER} (<${BUILD_URL}|Open>)"', 
                teamDomain: 'scionventuresllc', 
                tokenCredentialId: 'Slack-login'
                }
            }
        }
        stage ('Delete docker image') {
            steps {
                script {
                    sh """
                    docker rmi ${IMAGE_NAME}
                    """
                    }
                }
            }
        }
        post {
            always {
                emailext attachLog: true, 
                attachmentsPattern: 'trivyimage.txt,trivyfile.txt', 
                body: '"Please go to ${BUILD_URL} and verify the build"', 
                subject: '"Job \'${JOB_NAME}\' (${BUILD_NUMBER}) is waiting for input",', 
                to: 'scionventureslls@gmail.com'
                }
        }
    }
