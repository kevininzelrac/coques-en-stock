import { CloudFrontClient } from "@aws-sdk/client-cloudfront";
import createOriginAccessControl from "./CloudFront/createOriginAccess.js";

const { appName, branch, region } = process.env;
const name = `${appName}-${branch}`;

const cloudFrontClient = new CloudFrontClient({ region });

const { OriginAccessControl } = await createOriginAccessControl({
  client: cloudFrontClient,
  id: `${name}-static.s3.${region}.amazonaws.com`,
  description: `${name}-static`,
});
export default OriginAccessControl;
