locals {
  environment = basename(abspath(path.module))
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "aws_profile" {
  description = "AWS account profile"
  type        = string
}

variable "my_ip" {
  description = "My IP address"
  type        = string 
}

variable "account_id" {
  description = "AWS account ID"
  type        = string
}

variable "db_username" {
  description = "Database administrator username"
  type        = string
}

variable "db_password" {
  description = "Database administrator password"
  type        = string
}
