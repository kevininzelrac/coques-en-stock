import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { userSession } from "~/services/session.server";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import bcrypt from "bcryptjs";

const action = async ({ request }: ActionFunctionArgs) => {
  const $user = await userSession.getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const userId = String(formData.get("id"));
  const password = String(formData.get("password"));
  const confirm = String(formData.get("confirm"));

  if (password !== confirm)
    return json(
      { error: { message: "Passwords do not match" } },
      { status: 400, statusText: "Bad Request" }
    );

  const credential = await withTryCatch(
    prisma.credential.update({
      where: { userId },
      data: { passwordHash: await bcrypt.hash(password, 10) },
      select: { updatedAt: true },
    }),
    "Failed to update password"
  );
  if (credential.error)
    return json({ error: credential.error }, { status: 400 });

  const message = `Your password has been updated, please Sign In to continue.`;
  return redirect(`/success?message=${message}`, {
    headers: {
      "Set-Cookie": await userSession.destroySession($user),
    },
  });
};
export default action;
