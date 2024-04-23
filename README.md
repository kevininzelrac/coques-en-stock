# Coques en Stock

## 🚀 Database

### dev database with docker compose

```yml
version: "3.9"

services:
  postgres:
    container_name: postgres
    image: postgres:16.2
    ports:
      - 5432:5432
    volumes:
      - postgres:/var/lib/postgresql/data
    env_file:
      - .env
    #environment:
    #  - POSTGRES_PASSWORD=password
    #  - POSTGRES_USER=user
    #  - POSTGRES_DB=database

volumes:
  postgres:
```

### Prisma ORM

```sh
npm i prisma tsx -D
npx prisma init
npx prisma migrate dev --name 'init'
```

## 🚀 AWS Infrastructure w/ terraform

### Staging

- Backend on lambda function w/ response stream and lambda function url
- Frontend on S3 Bucket
- Cloudfront distribution
- Lambda:Edge Function triggered on CloudFront Origin Request to restrict lambda access to Cloudfront w/ @aws/signatureV4
- Custom VPC, Subnets & Security Groups for RDS
- RDS Postgres database
- CloudFlare turnstile reCaptcha
- Contact Form with AWS Simple Email Service

### Prod

- Backend on lambda function w/ response stream and lambda function url
- Frontend on S3 Bucket
- Cloudfront distribution
- Lambda:Edge Function triggered on CloudFront Origin Request to restrict lambda access to Cloudfront w/ @aws/signatureV4
- Custom VPC, Subnets & Security Groups for RDS
- RDS Postgres database
- SSL certificate with AWS CertBot
- Route53 domain & hosted zone
- CloudFlare turnstile reCaptcha
- Contact Form with AWS Simple Email Service

## 🚀 CI/CD

### Github actions

- Stage Environment
- Prod Environment

### Test deployment bash script & npn run deploy

```sh
npm run build
npm prune --omit dev
zip -r function.zip package.json node_modules build/server .env index.js

echo Deploy the function.zip to lambda bucket
aws s3 cp function.zip s3://$APP_NAME-$BRANCH_NAME-lambda

echo Update the lambda function
aws lambda update-function-code \
--function-name $APP_NAME-$BRANCH_NAME \
--s3-bucket $APP_NAME-$BRANCH_NAME-lambda \
--s3-key function.zip \
--no-cli-pager

echo Deploy build/client to assets bucket
aws s3 sync build/client/ s3://$APP_NAME-$BRANCH_NAME-assets --delete

rm function.zip
npm i
```
