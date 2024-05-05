import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id) return redirect("/signin", { headers });

  const user = await withTryCatch(
    prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    }),
    "Failed to load user"
  );
  if (user.error || !user.data) return redirect("/signin");

  const credential = await withTryCatch(
    prisma.credential.findUnique({
      where: { userId: id },
      select: {
        id: true,
      },
    }),
    "Failed to load user credential"
  );

  return json(
    {
      user: user.data,
      credential: !!credential?.data,
    },
    { headers }
  );
};
export default loader;
