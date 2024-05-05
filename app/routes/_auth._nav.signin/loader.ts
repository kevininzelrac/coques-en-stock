import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (id) throw redirect("/", { headers });

  return json({
    id,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
  });
};
export default loader;
