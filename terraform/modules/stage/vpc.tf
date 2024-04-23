resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  instance_tenancy = "dedicated"
  tags = {
    Name = "${var.app_name}-${local.environment}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.app_name}-${local.environment}-postgres-subnet-group"
  subnet_ids = [aws_subnet.db1.id, aws_subnet.db2.id]
}

resource "aws_subnet" "db1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "db2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true
}

resource "aws_route" "gateway" {
route_table_id = aws_vpc.main.default_route_table_id
destination_cidr_block = "0.0.0.0/0"
gateway_id = aws_internet_gateway.main.id
}

resource "aws_security_group" "postgres" {
  name        = "${var.app_name}-${local.environment}-postgres"
  description = "Allow inbound traffic for PG"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ## GET DEFAULT VPC
# data "aws_vpc" "default" {
#   default = true
# }

# ## GET DEFAULT SUBNET LIST
# data "aws_subnets" "default" {
#   filter {
#     name   = "vpc-id"
#     values = [data.aws_vpc.default.id]
#   }
# }

# ## CREATE SECURITY GROUP FOR POSTGRES
# resource "aws_security_group" "postgres" {
#   name        = "${var.app_name}-${local.environment}-postgres"
#   description = "Security group for ${var.app_name}-${local.environment}-postgres db instance"
#   vpc_id      = data.aws_vpc.default.id

#   ingress {
#     description = "Allow traffic from my IP address to postgres db instance"
#     from_port   = "5432"
#     to_port     = "5432"
#     protocol    = "tcp"
#     cidr_blocks = [var.my_ip]
#   }

#   ingress {
#     description = "Allow traffic from the security group itself to postgres db instance"
#     from_port   = "5432"
#     to_port     = "5432"
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     //self        = true
#   }

#   egress {
#     description = "Allow traffic from the security group itself to postgres db instance"
#     from_port   = "5432"
#     to_port     = "5432"
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     //self        = true
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }