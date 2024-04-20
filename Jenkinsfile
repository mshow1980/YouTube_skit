pipeline {
    agent any
    tools {
        nodejs 'node16'
        jdk 'jdk17'
    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
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
        stage('SOnarQube Analysis') {
            steps {
                script{
                    withSonarQubeEnv('SonarQube') {
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