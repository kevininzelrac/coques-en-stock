import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import jwt, { JwtPayload } from "jsonwebtoken";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import { userSession } from "~/services/session.server";
import auth from "~/services/auth.server";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const $user = await userSession.getSession(request.headers.get("Cookie"));
  const { id, headers } = await auth(request);
  if (!id) throw redirect("/signin", { headers });

  const token = params.token;
  if (!token)
    throw json(
      { error: { message: "No token found" } },
      { status: 400, statusText: "Bad Request" }
    );

  const verified = jwt.verify(token, process.env.ACCESS_SECRET) as JwtPayload;

  if (!verified)
    throw json(
      { error: { message: "Token is invalid" } },
      { status: 400, statusText: "Bad Request" }
    );

  if (verified.id !== id)
    throw json(
      { error: { message: "ids don't match" } },
      { status: 400, statusText: "Bad Request" }
    );

  const user = await withTryCatch(
    prisma.user.delete({
      where: { id: id },
      select: { email: true },
    }),
    "Failed to delete user"
  );
  if (user.error)
    throw json(user.error, { status: 400, statusText: "Bad Request" });

  const message = `Your acount ${user.data.email} has been deleted. So Long!`;
  return redirect(`/success?message=${message}`, {
    headers: {
      "Set-Cookie": await userSession.destroySession($user),
    },
  });
};
export default loader;
