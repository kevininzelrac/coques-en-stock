import iamClient from "./IAM/iamClient.js";
import createRole from "./IAM/createRole.js";

const { appName, branch } = process.env;
const roleName = `${appName}-${branch}`;

const IAM = await createRole({
  client: iamClient,
  roleName: roleName,
  assumeDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  }),
});
export default IAM;
