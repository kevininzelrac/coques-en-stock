import { LoaderFunctionArgs, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    throw json(null, { status: 401, statusText: "Unauthorized", headers });

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
    .catch(() => null);

  if (!user || user.role !== "ADMIN")
    throw json(null, { status: 401, statusText: "Unauthorized", headers });

  const pages = await prisma.post.findMany({
    where: { typeTitle: "page" },
    select: {
      id: true,
      title: true,
    },
  });

  const menu = await prisma.menu.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return json({ pages, menu }, { headers });
};
export default loader;
