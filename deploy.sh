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