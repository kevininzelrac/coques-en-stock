data "aws_caller_identity" "current" {}

module "stage"{
    source = "./modules/stage"
    aws_region = var.aws_region
    app_name = var.app_name
    my_ip = var.my_ip
    account_id = data.aws_caller_identity.current.account_id
    db_username = var.db_username
    db_password = var.db_password
}
