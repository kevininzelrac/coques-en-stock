## CREATE S3 BUCKET FOR ASSETS
resource "aws_s3_bucket" "storage" {
  bucket = "${var.app_name}-${local.environment}-storage"
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "storage" {
  bucket = aws_s3_bucket.storage.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "storage" {
  depends_on = [aws_s3_bucket_ownership_controls.storage]
  bucket = aws_s3_bucket.storage.id
  acl    = "private"
}

## CREATE S3 CRUD POLICY
resource "aws_iam_role_policy" "storage" {
  name = "storage"
  role = aws_iam_role.main.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
        Effect = "Allow",
        Action = [
          "s3:ListBucket",
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ],
        Resource =  [
          "${aws_s3_bucket.storage.arn}", 
          "${aws_s3_bucket.storage.arn}/*" 
          ]        
      }]
  })
}

## ATTACH BUCKET POLICY TO S3 BUCKET
resource "aws_s3_bucket_policy" "storage" {
  bucket = aws_s3_bucket.storage.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
        Effect = "Allow",
        Action = ["s3:GetObject"],
        Resource = "${aws_s3_bucket.storage.arn}/*",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "${aws_cloudfront_distribution.main.arn}"
          }
        }
      }]
  })
}

resource "aws_s3_bucket_cors_configuration" "storage" {
  bucket = aws_s3_bucket.storage.id

  cors_rule {
    allowed_origins = ["https://${aws_cloudfront_distribution.main.domain_name}"]
    allowed_methods = ["PUT"]
    allowed_headers = ["*"]
    expose_headers  = []
  }
}
