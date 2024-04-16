output "stage_cloudfront_url" {
  value = module.stage.cloudfront_url
}

output "stage_postgres_endpoint" {
  value = module.stage.postgres_endpoint
}

output "stage_lambda_oac_note" {
  value = module.stage.lambda_oac_note 
}
