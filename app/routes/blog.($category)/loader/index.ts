import { LoaderFunctionArgs, defer } from "@remix-run/node";
import prisma from "~/services/prisma.server";
import auth from "~/services/auth.server";
import posts from "./posts";
import categories from "./categories";
import authors from "./authors";
import postsCount from "./postsCount";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user
        .findUnique({
          where: { id },
          select: {
            id: true,
            role: true,
          },
        })
        .catch(() => null)
    : null;

  return defer(
    {
      user: user,
      posts: posts(request, params, user),
      categories: await categories(user),
      authors: await authors(user),
      postsCount: await postsCount(params),
    },
    { headers, status: 200 }
  );
};
export default loader;
