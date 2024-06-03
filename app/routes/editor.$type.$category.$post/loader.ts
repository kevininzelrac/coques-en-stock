import { LoaderFunctionArgs, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    throw json("Unauthorized", { status: 401, statusText: "Unauthorized" });

  const user = await prisma.user
    .findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        email: true,
        avatar: true,
        role: true,
      },
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof Error) return error;
      return null;
    });

  if (user instanceof Error)
    throw json("Wooops, something went wrong !", {
      status: 500,
      statusText: "Internal Server Error",
    });

  if (!user)
    throw json("User not found", { status: 404, statusText: "Not Found" });

  const post = await prisma.post
    .findUnique({
      where: {
        type: { title: params.type },
        category: { title: params.category },
        title: params.post?.replaceAll("%20", " "),
      },
      select: {
        id: true,
        title: true,
        type: {
          select: {
            title: true,
          },
        },
        category: {
          select: {
            title: true,
          },
        },
        content: true,
        createdAt: true,
        status: true,
        audience: true,
        author: {
          select: {
            id: true,
            role: true,
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
      },
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof Error) return error;
      return null;
    });

  if (post instanceof Error)
    throw json("Wooops, something went wrong !", {
      status: 500,
      statusText: "Internal Server Error",
    });

  if (!post)
    throw json("Post not found", { status: 404, statusText: "Not Found" });

  return json({ user, post }, { headers });
};
export default loader;
