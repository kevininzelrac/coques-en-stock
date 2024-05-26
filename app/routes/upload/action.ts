import { ActionFunctionArgs, json } from "@remix-run/node";
import { S3SignedUrl } from "~/services/s3.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = await S3SignedUrl(String(formData.get("key")));
  if (!data)
    return json({
      error: { message: "Woops, something went wrong !!" },
      key: null,
      url: null,
    });

  return json({
    error: null,
    key: data.key,
    url: data.url,
  });
};
export default action;
