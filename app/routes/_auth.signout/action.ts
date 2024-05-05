import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { userSession } from "~/services/session.server";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const $user = await userSession.getSession(request.headers.get("Cookie"));
  const { id }: { id: string } = await request.json();

  const refreshToken = await withTryCatch(
    prisma.refreshToken.update({
      where: {
        userId: id,
        token: $user.get("refreshToken"),
      },
      data: {
        revoked: true,
      },
      select: {
        revoked: true,
      },
    }),
    "error updating refreshToken"
  );

  if (refreshToken.error)
    throw json(
      { error: refreshToken.error },
      { status: 404, statusText: "Not Found" }
    );

  return redirect("/", {
    headers: {
      "Set-Cookie": await userSession.destroySession($user),
    },
  });
};
export default action;
