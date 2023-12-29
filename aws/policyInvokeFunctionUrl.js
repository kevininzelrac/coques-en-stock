import iamClient from "./IAM/iamClient.js";
import putRolePolicy from "./IAM/putRolePolicy.js";

const { appName, branch } = process.env;
const roleName = `${appName}-${branch}`;

const policyInvokeFunctionUrl = await putRolePolicy({
  client: iamClient,
  roleName: roleName,
  policyName: `${roleName}_invokeFunctionUrl`,
  policyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "lambda:InvokeFunctionUrl",
        Resource: "*",
      },
    ],
  }),
});
export default policyInvokeFunctionUrl;
