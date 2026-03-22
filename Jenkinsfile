pipeline {
    agent any

    stages {

        stage('Checkout source code') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            agent {
                docker {
                    image 'maven:3.9.9-eclipse-temurin-21'
                }
            }
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:20'
                }
            }
            steps {
                dir('frontend/ecommerce-ui') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    def tag = "build-${BUILD_NUMBER}"

                    sh "docker build -t ecommerce-backend:${tag} ./backend"
                    sh "docker build -t ecommerce-frontend:${tag} ./frontend/ecommerce-ui"
                }
            }
        }

    }
}