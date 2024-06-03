import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id: userId } = await auth(request);

  let body = await request.json();

  //METHOD POST
  if (request.method === "POST") {
    // CATEGORY
    if (body.action === "create" && body.type === "blog") {
      const { category, title } = body;
      const post = await withTryCatch(
        prisma.post.create({
          data: {
            type: { connect: { title: "blog" } },
            category: { connect: { title: category } },
            author: { connect: { id: userId } },
            title: String(title),
            content: "enter content here",
          },
          select: { id: true, title: true },
        }),
        "Failed to create post."
      );
      if (post.error) return json(post, { status: 500 });
      return redirect(`/editor/blog/${category}/${post.data.title}`);
    }

    if (body.action === "create" && body.type === "category") {
      return json(
        await withTryCatch(
          prisma.category.create({
            data: {
              title: String(body.title),
            },
            select: { id: true, title: true },
          }),
          "Failed to create category."
        )
      );
    }
  }

  // METHOD PATCH
  if (request.method === "PATCH") {
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
        "Failed to update post."
      )
    );
  }

  // METHOD DELETE
  if (request.method === "DELETE") {
    if (body.action === "delete" && body.type === "blog") {
      return json(
        await withTryCatch(
          prisma.post.delete({
            where: { id: String(body.id) },
            select: { id: true },
          }),
          "Failed to delete post."
        )
      );
    }

    if (body.action === "delete" && body.type === "category") {
      const category = await withTryCatch(
        prisma.category.delete({
          where: { id: String(body.id) },
          select: { id: true, title: true },
        }),
        "Failed to delete category."
      );
      if (category.error) return json(category, { status: 500 });
      if (params.category === category.data.title) return redirect("/blog");
      return json(category);
    }
  }

  return json(
    { error: { message: "Method Not Allowed" } },
    { status: 405, statusText: "Method Not Allowed" }
  );
};
export default action;
