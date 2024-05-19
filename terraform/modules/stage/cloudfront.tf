## ORIGIN ACCESS CONTROL FOR ASSETS
resource "aws_cloudfront_origin_access_control" "assets" {
  name                              = aws_s3_bucket.assets.bucket_regional_domain_name
  description                       = aws_s3_bucket.assets.bucket_regional_domain_name
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

## ORIGIN ACCESS CONTROL FOR STORAGE
resource "aws_cloudfront_origin_access_control" "storage" {
  name                              = aws_s3_bucket.storage.bucket_regional_domain_name
  description                       = aws_s3_bucket.storage.bucket_regional_domain_name
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

## CACHE POLICY ID FOR STORAGE
data "aws_cloudfront_cache_policy" "CachingDisabled" {
name = "Managed-CachingDisabled"
}

## CLOUDFRONT DISTRIBUTION
resource "aws_cloudfront_distribution" "main" {
    enabled             = true
    is_ipv6_enabled     = true
    comment             = "${var.app_name}-${local.environment}"
    price_class         = "PriceClass_All"
    http_version        = "http2"

    viewer_certificate {
        cloudfront_default_certificate = true
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }

    ## LAMBDA FUNCTION URL ORIGIN
    origin {
        domain_name = replace(replace(aws_lambda_function_url.server.function_url, "https://", ""), "/", "")
        origin_id   = "lambda"

        custom_origin_config {
            http_port              = 80
            https_port             = 443
            origin_protocol_policy = "https-only"
            origin_ssl_protocols   = ["TLSv1.2"]
        }
    }
    
    ## S3 ORIGIN FOR ASSETS
    origin {
        origin_id   = "assets"
        domain_name = aws_s3_bucket.assets.bucket_regional_domain_name

        s3_origin_config {
            origin_access_identity = ""
        }
        origin_access_control_id = aws_cloudfront_origin_access_control.assets.id
    }
    
    ## S3 ORIGIN FOR STORAGE
    origin {
        origin_id   = "storage"
        domain_name = aws_s3_bucket.storage.bucket_regional_domain_name

        s3_origin_config {
            origin_access_identity = ""
        }
        origin_access_control_id = aws_cloudfront_origin_access_control.storage.id
    }

    ## DEFAULT CACHE BEHAVIOR
    default_cache_behavior {
        target_origin_id            = "lambda"
        compress                    = true
        viewer_protocol_policy      = "redirect-to-https"
        allowed_methods             = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
        cached_methods              = ["GET", "HEAD"]
        cache_policy_id             = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
        origin_request_policy_id    = "b689b0a8-53d0-40ab-baf2-68738e2966ac"
        smooth_streaming            = false
        default_ttl                 = 0
        max_ttl                     = 0

        lambda_function_association {
            event_type   = "origin-request"
            # lambda_arn   = "${aws_lambda_function.signV4.arn}:1"
            lambda_arn   = "${aws_lambda_function.signV4.arn}:${aws_lambda_function.signV4.version}"
            include_body = true
        }
    }

    ## FAVICON CACHE BEHAVIOR
    ordered_cache_behavior {
        path_pattern            = "/favicon.ico"
        target_origin_id        = "assets"
        viewer_protocol_policy  = "redirect-to-https"
        allowed_methods         = ["GET", "HEAD"]
        cached_methods          = ["GET", "HEAD"]
        compress                = true
        smooth_streaming        = false
        cache_policy_id         = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    }

    ## ASSETS CACHE BEHAVIOR
    ordered_cache_behavior {
        path_pattern           = "/assets/*"
        target_origin_id       = "assets"
        viewer_protocol_policy = "redirect-to-https"
        allowed_methods        = ["GET", "HEAD"]
        cached_methods         = ["GET", "HEAD"]
        compress               = true
        smooth_streaming       = false
        cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    }
    
    ## STORAGE CACHE BEHAVIOR
    ordered_cache_behavior {
        path_pattern           = "/storage/*"
        target_origin_id       = "storage"
        viewer_protocol_policy = "redirect-to-https"
        allowed_methods        = ["GET", "HEAD"]
        cached_methods         = ["GET", "HEAD"]
        compress               = true
        smooth_streaming       = false
        cache_policy_id        = data.aws_cloudfront_cache_policy.CachingDisabled.id
    }
}
