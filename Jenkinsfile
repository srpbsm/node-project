pipeline {
   agent any

   environment {
     // You must set the following environment variables
     // ORGANIZATION_NAME
     // YOUR_DOCKERHUB_USERNAME (it doesn't matter if you don't have one)

     SERVICE_NAME = "node-project"
     REPOSITORY_TAG="${YOUR_DOCKERHUB_USERNAME}/${SERVICE_NAME}:${BUILD_ID}"
   }

   stages {
      stage('Preparation') {
         steps {
            cleanWs()
            git credentialsId: 'GitHub', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}"
            // git credentialsId: 'dockerhub', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}"

         }
      }
      stage('Build') {
         steps {
            sh 'docker image build -t ${REPOSITORY_TAG} .'
         }
      }

      stage('Push Image') {
         steps {
           script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
           }
         }
      }

     stage('Remove Unused docker image') {
       steps{
         sh "docker rmi $registry:$BUILD_NUMBER"
       }
     }

     stage('Deploy to k8s cluster') {
       steps{
        kubernetesDeploy(
           configs: 'springBootMongo.yml',
           kubeconfigId: 'KUBERNETES_CLUSTER_CONFIG',
           enableConfigSubstitution: true
        )
      }
     }
   }
}