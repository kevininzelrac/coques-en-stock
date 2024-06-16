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
- Node Modules in lambda layer
- Frontend on S3 Bucket
- Upload file w/ pre signed url on Storage dedicated S3 Bucket
- Cloudfront distribution
- Lambda:Edge Function triggered on CloudFront Origin Request to restrict lambda access to Cloudfront w/ @aws/signatureV4
- Custom VPC, Subnets & Security Groups for RDS
- RDS Postgres database
- CloudFlare turnstile reCaptcha
- Contact Form with AWS Simple Email Service
- Dialog box w/ default 250ms opacity animation duration based on useState
- Transitions Animation Component for route navigation, based on React.CloneElement
- Error Boundary Component based on Remix useRouteError
- Slate Rich Text Editor
- Content Privacy based on Priviledges and Roles : ADMIN, EDITOR, GUEST, FOLLOWER
- Multi User Blog w/ Posts, Pagination, Likes, Comments, Filter by Authors, Types & Categories
- Dashboard w/ Users, Posts, Comments & Likes Reviews
- Dynamic and Responsive Navigation Bar w/ animated background color & logo on scroll
- Dropdown Account menu w/ Review & Edition Tools
- Drag and Drop Menu Route for easy selection and reordering of navigation items.

### Prod

- Backend on lambda function w/ response stream and lambda function url
- Node Modules in lambda layer
- Frontend on S3 Bucket
- Upload file w/ pre signed url on Storage dedicated S3 Bucket
- Cloudfront distribution
- Lambda:Edge Function triggered on CloudFront Origin Request to restrict lambda access to Cloudfront w/ @aws/signatureV4
- Custom VPC, Subnets & Security Groups for RDS
- RDS Postgres database
- SSL certificate with AWS CertBot
- Route53 domain & hosted zone
- CloudFlare turnstile reCaptcha
- Contact Form with AWS Simple Email Service
- Dialog box w/ default 250ms opacity animation duration based on useState
- Transitions Animation Component for route navigation, based on React.CloneElement
- Error Boundary Component based on Remix useRouteError
- Slate Rich Text Editor
- Content Privacy based on Priviledges and Roles : ADMIN, EDITOR, GUEST, FOLLOWER
- Multi User Blog w/ Posts, Pagination, Likes, Comments, Filter by Authors, Types & Categories
- Dashboard w/ Users, Posts, Comments & Likes Reviews
- Dynamic and Responsive Navigation Bar w/ animated background color & logo on scroll
- Dropdown Account menu w/ Review & Edition Tools
- Drag and Drop Menu Route for easy selection and reordering of navigation items.

## 🚀 CI/CD

### Github actions

- Stage Environment
- Prod Environment

### Test deployment bash script & npn run deploy

```sh
#!/bin/bash

echo Generate the prisma client
npx prisma generate

echo Build the project
npm run build

echo Prune dev deps
npm prune --omit dev

echo Zip the function
zip -r function.zip package.json build/server .env index.js

echo Zip the node_modules
zip -r node_modules.zip node_modules .env

echo Deploy the node_modules.zip to layer bucket
aws s3 cp node_modules.zip s3://$APP_NAME-$BRANCH_NAME-layer

echo Deploy the node_modules.zip to lambda layer
layer=$(aws lambda publish-layer-version \
    --layer-name $APP_NAME-$BRANCH_NAME-layer \
    --content S3Bucket=$APP_NAME-$BRANCH_NAME-layer,S3Key=node_modules.zip \
    --query 'LayerVersionArn' --output text)

echo Deploy the function.zip to lambda function
aws lambda update-function-code \
    --function-name $APP_NAME-$BRANCH_NAME \
    --zip-file fileb://function.zip \
    --no-cli-pager

echo Wait for the function to be updated
aws lambda wait function-updated \
    --function-name $APP_NAME-$BRANCH_NAME \
    --no-cli-pager

echo Update the lambda function configuration
aws lambda update-function-configuration \
    --function-name $APP_NAME-$BRANCH_NAME \
    --layers "$layer" \
    --no-cli-pager

echo Deploy build/client to assets bucket
aws s3 sync build/client/ s3://$APP_NAME-$BRANCH_NAME-assets --delete

rm function.zip
rm node_modules.zip
npm i
```
