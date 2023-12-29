import cloudFrontClient from "./CloudFront/cloudfrontClient.js";
import getFunctionUrl from "./Lambda/getFunctionUrl.js";
import OriginAccessControlList from "./CloudFront/OriginAccessControlList.js";
import createDistribution from "./CloudFront/createDistribution.js";

const { appName, branch } = process.env;
const name = `${appName}-${branch}`;

const { FunctionUrl } = await getFunctionUrl({ FunctionName: name });

const STATIC = OriginAccessControlList.Items.find(
  ({ Description }) => Description === `${name}-static`
);
const STORAGE = OriginAccessControlList.Items.find(
  ({ Description }) => Description === `${name}-storage`
);

const cloudfront = await createDistribution({
  client: cloudFrontClient,
  name: name,
  staticOriginDomain: STATIC.Name,
  staticOAC_ID: STATIC.Id,
  storageOriginDomain: STORAGE.Name,
  storageOAC_ID: STORAGE.Id,
  lambdaUrlOriginDomain: new URL(FunctionUrl).hostname,
});
export default cloudfront;
