# Deploy AWS

## Frontend

- build estatico em Vite
- upload para bucket S3 privado
- distribuicao via CloudFront
- certificado SSL no ACM
- DNS no Route 53

## Backend

- build da imagem Docker
- push para Amazon ECR
- deploy no ECS Fargate
- logs no CloudWatch
- segredos via Secrets Manager ou Parameter Store

## Banco

- PostgreSQL em Amazon RDS
- security groups separados por camada
- backups e retention configuraveis
