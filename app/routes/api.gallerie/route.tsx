import { json } from "@remix-run/node";
import { useEffect } from "react";
import { listStorageObjects } from "~/services/s3.server";

export const loader = async () => {
  const gallerie = await listStorageObjects();

  if (gallerie?.Contents) {
    gallerie.Contents.sort((a: any, b: any) => b.LastModified - a.LastModified);

    const origin = process.env.STAGE_ORIGIN;
    gallerie?.Contents.forEach((item: any) => {
      item.url = `${origin}/${item.Key}`;
    });
  }
  return json({ gallerie: gallerie?.Contents });
};

export default function Index() {
  useEffect(() => window.history.back(), []);
  return null;
}
