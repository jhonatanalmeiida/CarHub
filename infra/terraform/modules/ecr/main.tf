variable "project_name" { type = string }
variable "tags" { type = map(string) }

resource "aws_ecr_repository" "this" {
  name                 = var.project_name
  image_tag_mutability = "MUTABLE"
  force_delete         = true
  tags                 = var.tags
}

output "repository_url" {
  value = aws_ecr_repository.this.repository_url
}

