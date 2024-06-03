import { ActionFunctionArgs, json } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import { S3SignedUrl } from "~/services/s3.server";

const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "POST") {
    const { key }: { key: string } = await request.json();
    const data = await S3SignedUrl(key);
    if (!data)
      return json({
        error: { message: "Woops, something went wrong !!" },
        filename: null,
        key: null,
        url: null,
      });

    return json({
      error: null,
      filename: data.filename,
      key: data.key,
      url: data.url,
    });
  }

  // update status || audience || content
  if (request.method === "PATCH") {
    let body = await request.json();
    const { action, type, ...data } = body;
    const select = Object.fromEntries(
      Object.keys(data).map((key) => [key, true])
    );
    return json(
      await withTryCatch(
        prisma.post.update({
          where: { id: String(data.id) },
          data: data,
          select: select,
        }),
        "Failed to update post"
      )
    );
  }

  return json(null, { status: 405, statusText: "Method Not Allowed" });
};
export default action;
