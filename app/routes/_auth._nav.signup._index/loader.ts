import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import auth from "~/services/auth.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id } = await auth(request);
  if (id) return redirect("/");

  return json({ id });
};
export default loader;
