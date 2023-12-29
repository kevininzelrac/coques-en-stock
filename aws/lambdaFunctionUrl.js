import lambdaClient from "./Lambda/lambdaClient.js";
import createFunctionUrlConfig from "./Lambda/createFunctionUrlConfig.js";

const { appName, branch } = process.env;
const FunctionName = `${appName}-${branch}`;

const lambdaFunctionUrl = await createFunctionUrlConfig({
  client: lambdaClient,
  FunctionName: FunctionName,
});
export default lambdaFunctionUrl;
