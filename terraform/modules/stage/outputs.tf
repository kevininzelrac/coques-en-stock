output "cloudfront_url" {
  description = "URL of the CloudFront distribution."
  value = "https://${aws_cloudfront_distribution.main.domain_name}" 
}

output "postgres_endpoint" {
    description = "value of the RDS endpoint."
    value = aws_db_instance.postgres.endpoint
}