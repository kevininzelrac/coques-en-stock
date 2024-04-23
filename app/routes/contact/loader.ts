import { json } from "@remix-run/node";

const loader = async () => {
  return json({
    siteKey: process.env.CLOUDFLARE_SITE_KEY,
  });
};
export default loader;
