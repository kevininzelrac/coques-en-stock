import { Role, User } from "@prisma/client";
import { ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const body: { id: User["id"]; role: Role } = await request.json();
  // const { id, ...data } = body;

  const user = await prisma.user.update({
    where: { id: body.id },
    data: { role: body.role },
    select: { id: true, role: true },
  });
  return json({ user });
};
export default action;
