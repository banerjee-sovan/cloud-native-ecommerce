pipeline {
    agent any

    stages {
        stage('Checkout source code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/ecommerce-ui') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('backend') {
                    sh 'docker build -t cloud-native-ecommerce-backend .'
                }
                dir('frontend/ecommerce-ui') {
                    sh 'docker build -t cloud-native-ecommerce-frontend .'
                }
            }
        }
    }
}
