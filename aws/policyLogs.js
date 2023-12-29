import iamClient from "./IAM/iamClient.js";
import putRolePolicy from "./IAM/putRolePolicy.js";
import account from "./account.js";

const AWS_ID = await account();

const { region, appName, branch } = process.env;
const roleName = `${appName}-${branch}`;

const policyLogs = await putRolePolicy({
  client: iamClient,
  roleName: roleName,
  policyName: `${roleName}_lambda`,
  policyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        Resource: `arn:aws:logs:${region}:${AWS_ID}:log-group:/aws/lambda/${roleName}:*`,
      },
    ],
  }),
});
export default policyLogs;
