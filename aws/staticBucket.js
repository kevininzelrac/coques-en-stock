import s3Client from "./S3/s3Client.js";
import createBucket from "./S3/createBucket.js";

const { appName, branch } = process.env;
const bucketName = `${appName}-${branch}`;

const staticBucket = await createBucket({
  client: s3Client,
  bucketName: `${bucketName}-static`,
});
export default staticBucket;
