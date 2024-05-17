import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { listStorageObjects } from "~/services/s3.server";
import auth from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) return redirect("/", { headers });

  const origin =
    process.env.NODE_ENV === "development"
      ? process.env.STAGE_ORIGIN
      : process.env.ORIGIN;

  const gallerie = await listStorageObjects();

  // SORT BY DESCENDING DATE
  if (gallerie?.Contents) {
    gallerie.Contents.sort((a: any, b: any) => b.LastModified - a.LastModified);
  }

  return json({ origin, gallerie: gallerie?.Contents });
};
export default loader;
