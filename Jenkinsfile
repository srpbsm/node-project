pipeline {
   agent any

   environment {
   //   ORGANIZATION_NAME = "fleetman-ci-cd-demo"
   //   YOUR_DOCKERHUB_USERNAME="virtualpairprogrammers"
     SERVICE_NAME = "node-project"
     REPOSITORY_TAG="${YOUR_DOCKERHUB_USERNAME}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${BUILD_ID}"
     DOCKER_IMAGE = ''
   }

   stages {
      stage('Preparation') {
         steps {
            cleanWs()
            git credentialsId: 'GitHub-accesstoken', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}"
            // git credentialsId: 'GitHub', url: 'https://github.com/srpbsm/node-project'
         }
      }
      // stage('Build') {
      //    steps {
      //       sh '''mvn clean package'''
      //    }
      // }

      stage('Build and Push Image') {
         steps {
           script {
          DOCKER_IMAGE = docker.build "$REPOSITORY_TAG"
        }
         }
      }
      stage('Deploy Image') {
        steps{
          script {
            docker.withRegistry( '', 'DOCKER_HUB' ) {
              DOCKER_IMAGE.push()
          }
        }
      }
    }

        stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $REPOSITORY_TAG"
      }
    }

      // stage('Deploy to Cluster') {
      //     steps {
      //               sh 'envsubst < ${WORKSPACE}/deploy.yaml | kubectl apply -f -'
      //     }
      // }
   }
}