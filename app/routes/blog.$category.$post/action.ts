import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.json();

  // METHOD POST
  if (request.method === "POST") {
    const { action, type, ...data } = body;

    if (action === "like") {
      return json(
        await withTryCatch(
          prisma.like.create({
            data: {
              author: { connect: { id: String(body.userId) } },
              post:
                body.type === "blog"
                  ? { connect: { id: String(body.id) } }
                  : undefined,
              comment:
                body.type === "comment"
                  ? { connect: { id: String(body.id) } }
                  : undefined,
            },
            select: { id: true },
          }),
          "Failed to create like."
        )
      );
    }

    if (action === "create") {
      if (type === "comment") {
        return json(
          await withTryCatch(
            prisma.comment.create({
              data: data,
              select: { id: true },
            }),
            "Failed to create comment."
          )
        );
      }
    }
  }

  // METHOD PATCH
  if (request.method === "PATCH") {
    const { action, type, ...data } = body;

    if (type === "blog") {
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

    if (type === "comment") {
      return json(
        await withTryCatch(
          prisma.comment.update({
            where: { id: String(data.id) },
            data: data,
            select: { id: true },
          }),
          "Failed to update comment."
        )
      );
    }
  }

  // METHOD DELETE
  if (request.method === "DELETE") {
    if (body.action === "like") {
      if (body.type === "blog") {
        return json(
          await withTryCatch(
            prisma.like.delete({
              where: {
                postId_authorId: {
                  authorId: String(body.userId),
                  postId: String(body.id),
                },
              },
            }),
            "Failed to delete like."
          )
        );
      }
    }

    if (body.action === "like") {
      if (body.type === "comment") {
        return json(
          await withTryCatch(
            prisma.like.delete({
              where: {
                commentId_authorId: {
                  authorId: String(body.userId),
                  commentId: String(body.id),
                },
              },
            }),
            "Failed to delete like."
          )
        );
      }
    }

    if (body.action === "delete") {
      if (body.type === "blog") {
        const post = await withTryCatch(
          prisma.post.delete({
            where: { id: String(body.id) },
            select: { id: true },
          }),
          "Failed to delete post."
        );
        if (post.error) return json(post, { status: 500 });
        return redirect("/blog");
      }
    }

    if (body.action === "delete") {
      if (body.type === "comment") {
        return await withTryCatch(
          prisma.comment.delete({
            where: { id: String(body.id) },
            select: { id: true },
          }),
          "Failed to delete comment."
        );
      }
    }
  }

  return null;
};
export default action;

// Thanks to the following snippet, we can now delete nested comments:

//  /* prisma.schema */
//  model Comment {
//  comment   Comment?  @relation("CommentToComment", fields: [commentId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// ...
//}
// const recursiveDelete = async (id: string) => {
//   const comment = await withTryCatch(
//     prisma.comment.delete({
//       where: { id: id },
//       select: { id: true },
//     }),
//     "Failed to delete comment."
//   );
//   if (comment.error) throw comment;

//   const children = await withTryCatch(
//     prisma.comment.findMany({
//       where: { commentId: comment.data.id },
//       select: { id: true },
//     }),
//     "Failed to delete nested likes."
//   );
//   if (children.error) throw children;

//   for (const child of children.data) {
//     await recursiveDelete(child.id);
//   }

//   return comment;
// };
// return json(await recursiveDelete(String(body.id)));
