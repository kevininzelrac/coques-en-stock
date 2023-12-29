import iamClient from "./IAM/iamClient.js";
import putRolePolicy from "./IAM/putRolePolicy.js";

const { appName, branch } = process.env;
const roleName = `${appName}-${branch}`;

const policyStaticBucket = await putRolePolicy({
  client: iamClient,
  roleName: roleName,
  policyName: `${roleName}_staticBucket`,
  policyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${roleName}-static/*`,
      },
    ],
  }),
});
export default policyStaticBucket;
