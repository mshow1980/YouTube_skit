
pipeline {
    agent any 
    tools{
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment{
        SCANNER_HOME = 'sonar-scanner'
    }
    stages {
        stage('CleanWS'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout SCM'){
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mshow1980/YouTube_skit.git']])
            }
        }
        stage('SonarQube Alnalysis'){
            steps {
                srcipt{
                    withSonarQubeEnv(credentialsId: 'SOnar-Token') {
                    sh """
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=YouTube-Skit \
                    -Dsonar.sources=YouTube-Skit
                    """
                    }
                }
            }
        }
    }
}