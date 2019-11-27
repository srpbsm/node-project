// currentBuild.displyaName = "node-project-#"+currentBuild.numbergit 

pipeline {
  agent any

  environment {
    //   ORGANIZATION_NAME = "fleetman-ci-cd-demo"
    //   YOUR_DOCKERHUB_USERNAME="virtualpairprogrammers"
    SERVICE_NAME = "node-project"
    BUILD_IMAGE = "${YOUR_DOCKERHUB_USERNAME}/${ORGANIZATION_NAME}-${SERVICE_NAME}"
    DOCKER_IMAGE = ''
    //  GIT_COMMIT = $(git log -1 --format=%h)
  }

  stages {
    stage('Preparation') {
       steps {
          cleanWs()
          // git branch: 'develop', credentialsId: 'GitHub-accesstoken', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}"
          git credentialsId: 'GitHub', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}"
          checkout scm
          // git credentialsId: 'GitHub', url: 'https://github.com/srpbsm/node-project'
       }
    }

    stage('Build Docker Image') {
       steps {
          script {
            DOCKER_IMAGE = docker.build "$BUILD_IMAGE"
          }
       }
    }

    
    stage('Deliver for development') {
      when {
          branch 'develop'
      }

      
      steps {
        script {
            docker.withRegistry( '', 'DOCKER_HUB' ) {
              DOCKER_IMAGE.push("dev-${BUILD_ID}")
            }
        }
        sh "chmod +x changeTag.sh"
        sh "./changeTag.sh dev-${BUILD_ID} deploy-sandbox.yaml"
        sshagent(['SSH-KOPS']) {
          sh "scp -o StrictHostKeyChecking=no deploy-sandbox.yaml ubuntu@3.10.180.21:/home/ubuntu"
          script{
            try{
              sh "ssh ubuntu@3.10.180.21 kubectl apply -f deploy-sandbox.yaml"
            }catch(error){
              sh "ssh ubuntu@3.10.180.21 kubectl create -f deploy-sandbox.yaml"
            }
          }
        }
        
      }
    }
    stage('Deploy for production') {
      when {
          branch 'master'
      }
      steps {
        script {
          docker.withRegistry( '', 'DOCKER_HUB' ) {
            DOCKER_IMAGE.push("prod-${BUILD_ID}")
          }
        }
        sh "chmod +x changeTag.sh"
        sh "./changeTag.sh prod-${BUILD_ID} deploy-production.yaml"
        sshagent(['SSH-KOPS']) {
          sh "scp -o StrictHostKeyChecking=no deploy-production.yaml ubuntu@3.10.180.21:/home/ubuntu"
          script{
            try{
              sh "ssh ubuntu@3.10.180.21 kubectl apply -f deploy-production.yaml"
            }catch(error){
              sh "ssh ubuntu@3.10.180.21 kubectl create -f deploy-production.yaml"
            }
          }
        }
      }
    }

    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $BUILD_IMAGE"
      }
    }


    // stage('Deploy to Cluster') {
    //   steps {
    //     sh 'envsubst < ${WORKSPACE}/deploy.yaml | kubectl apply -f -'
    //   }
    // }
  }
}