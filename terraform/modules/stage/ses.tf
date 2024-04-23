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