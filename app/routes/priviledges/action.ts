import { ActionFunctionArgs, json } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";
import sleep from "~/utils/sleep";

const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "PATCH") {
    await sleep(300);
    let body = await request.json();
    const { id, ...data } = body;
    const select = Object.fromEntries(
      Object.keys(body).map((key) => [key, true])
    );
    return json(
      await withTryCatch(
        prisma.post.update({
          where: { id },
          data: data,
          select: select,
        }),
        "Failed to update post."
      )
    );
  }
  return json(null, { status: 405, statusText: "Method Not Allowed" });
};
export default action;
