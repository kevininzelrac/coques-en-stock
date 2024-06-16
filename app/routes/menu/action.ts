import { ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "~/services/prisma.server";

const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;
  const body = await request.json();
  const data = body.map((item: any, index: number) => ({
    index,
    ...item,
  }));

  switch (method) {
    case "POST":
      const result = await prisma.$transaction([
        prisma.menu.deleteMany(),
        prisma.menu.createMany({ data }),
      ]);
      return json(result, { status: 201, statusText: "Created" });

    default:
      return json({ message: `Method ${method} Not Allowed` }, { status: 405 });
  }
};
export default action;

// Working version based on iteration
//
// const result = await prisma.$transaction([
// prisma.menu.deleteMany(),
// ...data.map((item: any, index: number) =>
//     prisma.menu.create({
//     data: {
//         id: item.id,
//         index: index,
//         //post: {
//         //  connect: {
//         //    id: item.id,
//         //  },
//         //},
//     },
//     })
// ),
// ]);
