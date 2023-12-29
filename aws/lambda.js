import lambdaClient from "./Lambda/lambdaClient.js";
import createFunction from "./Lambda/createFunction.js";
import getRole from "./IAM/getRole.js";

const { appName, branch } = process.env;
const roleName = `${appName}-${branch}`;

export const IAM = await getRole({ RoleName: roleName });

const lambda = await createFunction({
  client: lambdaClient,
  name: roleName,
  roleArn: IAM.Role.Arn,
});
export default lambda;
