# provider "aws" {
#   alias = "virginia"
#   region = "us-east-1"
#   profile = var.aws_profile
# }

# CREATE function.zip
data "archive_file" "signV4_zip" {
  type = "zip"
  source_dir  = "../signV4"
  output_path = "../signV4/function.zip"
  excludes = [ 
    "package-lock.json",
    "deploy.sh",
    "function.zip"
    ]
}

## CREATE LAMBDA CLOUDWATCH LOGS POLICY
resource "aws_iam_role_policy" "signV4CloudWatchLogs" {
  name = "signV4CloudWatchLogs"
  role = aws_iam_role.main.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
        Effect = "Allow",
        Action = [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
        Resource = "arn:aws:logs:*:*:log-group:/aws/lambda/${aws_lambda_function.signV4.function_name}:*"      
      }]
  })
}

## CREATE LAMBDA FUNCTION URL POLICY
resource "aws_iam_role_policy" "invokeFunctionUrl" {
  name = "invokeFunctionUrl"
  role = aws_iam_role.main.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = ["lambda:InvokeFunctionUrl"],
        Resource = "*"
      },
    ]
  })
}

## CREATE LAMBDA FUNCTION W/ function.zip
resource "aws_lambda_function" "signV4" {
  provider          = aws.virginia
  function_name     = "${var.app_name}-${local.environment}-signV4"
  description       = "${var.app_name}-${local.environment}-signV4"
  role              = aws_iam_role.main.arn
  filename          = data.archive_file.signV4_zip.output_path
  source_code_hash  = data.archive_file.signV4_zip.output_base64sha256

  architectures     = ["x86_64"]
  runtime           = "nodejs20.x"
  handler           = "index.handler"
  timeout           = 10
  memory_size       = 1024

  publish = true
}