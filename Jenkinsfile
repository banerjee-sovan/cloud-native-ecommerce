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
                    bat 'mvn clean package'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/ecommerce-ui') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                dir('backend') {
                    bat 'docker build -t cloud-native-ecommerce-backend .'
                }
                dir('frontend/ecommerce-ui') {
                    bat 'docker build -t cloud-native-ecommerce-frontend .'
                }
            }
        }
    }
}
