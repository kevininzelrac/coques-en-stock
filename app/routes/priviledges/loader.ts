import { LoaderFunctionArgs, json } from "@remix-run/node";
import withPriviledges from "~/middlewares/withPriviledges";
import withTryCatch from "~/middlewares/withTryCatch";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id } = await auth(request);
  if (!id) throw new Error("Unauthorized");

  const user = await withTryCatch(
    prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true },
    }),
    "Failed to load user"
  );
  if (user.error) throw new Error(user.error.message);

  const posts = await withTryCatch(
    prisma.post.findMany({
      where: withPriviledges(user.data, {}),
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        audience: true,
        author: { select: { id: true, firstname: true } },
      },
    }),
    "Failed to load posts"
  );
  if (posts.error) throw new Error(posts.error.message);
  return json({ user: user.data, posts: posts.data });
};
export default loader;
