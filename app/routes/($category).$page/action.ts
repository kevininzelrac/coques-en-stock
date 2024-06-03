import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.json();

  // METHOD PATCH
  if (request.method === "PATCH") {
    const { action, type, ...data } = body;
    return json(
      await withTryCatch(
        prisma.post.update({
          where: { id: String(data.id) },
          data: data,
          select: { id: true, content: true },
        }),
        "Failed to update post."
      )
    );
  }

  // METHOD DELETE
  if (request.method === "DELETE") {
    if (body.action === "delete") {
      if (body.type === "page") {
        const post = await withTryCatch(
          prisma.post.delete({
            where: { id: String(body.id) },
            select: { id: true },
          }),
          "Failed to delete post."
        );
        if (post.error)
          return json(post, {
            status: 500,
            statusText: "Internal Server Error",
          });
        return redirect("/");
      }
    }
  }

  return json(null, { status: 405, statusText: "Method not allowed" });
};
export default action;
