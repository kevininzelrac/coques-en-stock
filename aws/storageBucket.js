import s3Client from "./S3/s3Client.js";
import createBucket from "./S3/createBucket.js";

const { appName, branch } = process.env;
const bucketName = `${appName}-${branch}`;

const storageBucket = await createBucket({
  client: s3Client,
  bucketName: `${bucketName}-storage`,
});

export default storageBucket;
