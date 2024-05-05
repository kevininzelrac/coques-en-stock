import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import jwt, { JwtPayload } from "jsonwebtoken";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import bcrypt from "bcryptjs";
import { userSession } from "~/services/session.server";

const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const $user = await userSession.getSession(request.headers.get("Cookie"));
  if (!$user) return redirect("/signin");

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

  const password = await withTryCatch(
    prisma.credential.update({
      where: { userId: verified.id },
      data: { passwordHash: await bcrypt.hash(verified.password, 10) },
      select: { updatedAt: true },
    }),
    "Failed to update password"
  );
  if (password.error)
    throw json(password.error, { status: 400, statusText: "Bad Request" });

  const revokedToken = await withTryCatch(
    prisma.refreshToken.update({
      where: {
        userId: verified.id,
        token: $user.get("refreshToken"),
      },
      data: {
        revoked: true,
      },
      select: {
        revoked: true,
      },
    }),
    "Internal Server Error"
  );
  if (revokedToken.error)
    throw json(revokedToken.error, {
      status: 500,
      statusText: "Internal Server Error",
    });

  const message = "Your password has been updated, please Sign In to continue";
  return redirect(`/success?message=${message}`, {
    headers: {
      "Set-Cookie": await userSession.destroySession($user),
    },
  });
};
export default loader;
