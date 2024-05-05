import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import jwt, { JwtPayload } from "jsonwebtoken";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const loader = async ({ params }: LoaderFunctionArgs) => {
  let token = params.token;
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

  const id = Math.floor(Math.random() * 1000);

  const user = await withTryCatch(
    prisma.user.create({
      data: {
        email: verified.email,
        fullname: verified.firstname + " " + verified.lastname,
        firstname: verified.firstname,
        lastname: verified.lastname,
        avatar: `https://picsum.photos/id/${id}/400`,
        credential: {
          create: {
            passwordHash: verified.passwordHash,
          },
        },
      },
      select: { email: true },
    }),
    "Failed to create user"
  );
  if (user.error)
    return json(
      { success: null, error: user.error },
      { status: 400, statusText: "Bad Request" }
    );

  const message = `Welcome Aboard ! Please Sign In to continue`;
  return redirect(`/success?message=${message}`);
};
export default loader;
