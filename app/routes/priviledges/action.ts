import { Audience, Status } from "@prisma/client";
import { ActionFunctionArgs, json } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const action = async ({ request }: ActionFunctionArgs) => {
  let body: { id: string; status?: Status; audience?: Audience } =
    await request.json();
  const { id, ...data } = body;

  if (request.method === "PATCH") {
    await sleep(300);
    return json(
      await withTryCatch(
        prisma.post.update({
          where: { id },
          data: data,
          select: { id: true, content: true },
        }),
        "Failed to update post."
      )
    );
  }
  return json(null, { status: 405, statusText: "Method Not Allowed" });
};
export default action;
