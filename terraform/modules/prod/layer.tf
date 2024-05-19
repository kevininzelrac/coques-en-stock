## CREATE node_modules.zip
data "archive_file" "node_modules_zip" {
  type  = "zip"
  source {
    filename    = "index.mjs"
    content     = "export const handler = async () => ({statusCode: 200, body: 'Maintenance in progress, please try again later'})"
  }
    output_path = "modules/${local.environment}/node_modules.zip"
}

## CREATE S3 BUCKET TO STORE LAMBDA FUNCTION
resource "aws_s3_bucket" "layer" {
    bucket = "${var.app_name}-${local.environment}-layer"
    force_destroy = true
}

## UPLOAD ZIP TO S3 BUCKET
resource "aws_s3_object" "layer_zip" {
    bucket = aws_s3_bucket.layer.id
    key    = "function.zip"
    source = data.archive_file.lambda_zip.output_path
    acl    = "private"
}

resource "aws_lambda_layer_version" "main" {
    layer_name          = "${var.app_name}-${local.environment}-layer"
    description         = "${var.app_name}-${local.environment}-layer"
    s3_bucket           = aws_s3_bucket.layer.id
    s3_key              = aws_s3_object.layer_zip.key
    compatible_runtimes = ["nodejs18.x", "nodejs20.x"]
}