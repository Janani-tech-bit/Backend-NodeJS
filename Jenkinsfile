pipeline {
  agent any
  environment {
        IMAGE_REPO_NAME="backend_nodejs"
        IMAGE_TAG="v1"
        AWS_DEFAULT_REGION="eu-central-1"
        AWS_ACCOUNT_ID="992382586240"
        REPOSITORY_URI="992382586240.dkr.ecr.eu-central-1.amazonaws.com/backend_nodejs"
  }
  stages {
    stage("BUILD DOCKER IMAGE") {
      steps {
        script {
          dockerImageBuild = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }
     stage("DEPLOY DOCKER") {
       steps {
          sh """aws ecr get-login-password | docker login --username AWS --password-stdin ${REPOSITORY_URI}"""
          sh """docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"""
          sh """docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"""
      }
   }
    stage("DEPLOY & ACTIVATE") {
      steps {
        sh """aws ecs run-task --cluster Cluster --count 1 --launch-type FARGATE --task-definition backend --network-configuration "awsvpcConfiguration={subnets=[subnet-0c8d052e4834bb21c
],securityGroups=[sg-01c71622baffcf944],assignPublicIp=ENABLED}"
"""
      }
    }
  }
}
