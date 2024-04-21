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
        stage('installing Dependencies') {
            steps {
                script{
                    sh'npm install'
                }
            }
        }
        stage ('Sonarqube analysis'){
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        $SCANNER_HOME/bin/sonar-scanner 
                        -Dsonar.projectKey=YouTube-Skit \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://3.237.37.43:9000 \
                        -Dsonar.login=sqp_3e3fdfbdacea41f92bcdb7cbfc690940c413537e
                    """
                    }
                }
            }
        }
}