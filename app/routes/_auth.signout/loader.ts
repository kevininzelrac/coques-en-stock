import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) return redirect("/", { headers });
  return json({ id });
};

export default loader;
