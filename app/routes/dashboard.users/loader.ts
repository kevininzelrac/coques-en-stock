import { Role } from "@prisma/client";
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

  const roles = Object.values(Role);

  const users = await prisma.user.findMany({ orderBy: { firstname: "asc" } });
  return json({ users, roles }, { headers });
};
export default loader;
