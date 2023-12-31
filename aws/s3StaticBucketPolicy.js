import s3Client from "./S3/s3Client.js";
import putBucketPolicy from "./S3/putBucketPolicy.js";

const { appName, branch } = process.env;
const roleName = `${appName}-${branch}`;

import DistributionList from "./CloudFront/distributionList.js";
const { ARN } = DistributionList.Items.find(
  ({ Comment }) => Comment === roleName
);

const s3StaticBucketPolicy = await putBucketPolicy({
  client: s3Client,
  name: `${roleName}-static`,
  document: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AllowCloudFrontServicePrincipal",
        Effect: "Allow",
        Principal: {
          Service: "cloudfront.amazonaws.com",
        },
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${roleName}-static/*`,
        Condition: {
          StringEquals: {
            "AWS:SourceArn": ARN,
          },
        },
      },
    ],
  }),
});
export default s3StaticBucketPolicy;
