terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  project = "carhub-cloud"
  tags = {
    Project     = local.project
    Environment = "dev"
  }
}

module "network" {
  source               = "../../modules/network"
  project_name         = local.project
  vpc_cidr             = "10.30.0.0/16"
  public_subnet_cidrs  = ["10.30.1.0/24", "10.30.2.0/24"]
  private_subnet_cidrs = ["10.30.11.0/24", "10.30.12.0/24"]
  tags                 = local.tags
}

module "ecr" {
  source       = "../../modules/ecr"
  project_name = local.project
  tags         = local.tags
}

module "rds" {
  source             = "../../modules/rds"
  project_name       = local.project
  db_name            = "carhub"
  db_username        = var.db_username
  db_password        = var.db_password
  vpc_id             = module.network.vpc_id
  private_subnet_ids = module.network.private_subnet_ids
  tags               = local.tags
}

module "ecs" {
  source             = "../../modules/ecs"
  project_name       = local.project
  image_url          = "${module.ecr.repository_url}:latest"
  vpc_id             = module.network.vpc_id
  public_subnet_ids  = module.network.public_subnet_ids
  private_subnet_ids = module.network.private_subnet_ids
  database_url       = module.rds.database_url
  jwt_access_secret  = var.jwt_access_secret
  jwt_refresh_secret = var.jwt_refresh_secret
  tags               = local.tags
}

module "frontend" {
  source       = "../../modules/s3-cloudfront"
  project_name = local.project
  domain_name  = var.domain_name
  tags         = local.tags
}

