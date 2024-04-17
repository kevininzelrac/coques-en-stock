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