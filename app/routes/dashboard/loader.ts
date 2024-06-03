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
  if (!user)
    throw json(null, { status: 401, statusText: "Unauthorized", headers });

  return json({ user }, { headers });
};
export default loader;
