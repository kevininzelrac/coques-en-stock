npm run build
zip -r function.zip node_modules package.json index.js

echo Update the lambda function
aws lambda update-function-code \
--function-name $APP_NAME-$BRANCH_NAME-signV4 \
--zip-file fileb://function.zip \
--publish --region us-east-1 --no-cli-pager

rm function.zip