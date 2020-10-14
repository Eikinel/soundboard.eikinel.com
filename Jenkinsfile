pipeline {
    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Installing') {
            steps {
                echo 'Installing...'
                sh 'npm install'
            }
        }

        stage('Building') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }
    }
}