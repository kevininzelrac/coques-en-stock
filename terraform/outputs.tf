output "stage_cloudfront_url" {
  value = module.stage.cloudfront_url
}

output "stage_postgres_endpoint" {
  value = module.stage.postgres_endpoint
}

output "prod_cloudfront_url" {
  value = module.prod.cloudfront_url
}

output "prod_name_servers" {
  value = module.prod.name_servers
}

output "prod_postgres_endpoint" {
  value = module.prod.postgres_endpoint
}