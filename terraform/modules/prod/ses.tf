## CREATE LAMBDA CLOUDWATCH LOGS POLICY
resource "aws_iam_role_policy" "simpleEmailService" {
  name = "simpleEmailService"
  role = aws_iam_role.main.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
        Effect = "Allow",
        Action = [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
        Resource = "*"      
      }]
  })
}

resource "aws_ses_domain_identity" "main" {
 domain = var.domain_name
}

resource "aws_ses_email_identity" "main" {
    email = var.email
}

resource "aws_route53_record" "ses_verification" {
 zone_id = aws_route53_zone.main.zone_id
 name = "_amazonses.${var.domain_name}"
 type = "TXT"
 records = [aws_ses_domain_identity.main.verification_token]
 ttl = "600"
}