import { Role } from "@prisma/client";
import withPriviledges from "~/middlewares/withPriviledges";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const categories = async (user: { id: string; role: Role } | null) =>
  await withTryCatch(
    prisma.category.findMany({
      //where: { id: "te" },
      where: {
        OR: [
          { posts: { some: { type: { title: "blog" } } } },
          { posts: { none: {} } },
        ],
      },
      distinct: ["title"],
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            posts: {
              where: withPriviledges(user, {
                type: { title: "blog" },
              }),
            },
          },
        },
      },
    }),
    "Failed to load categories."
  );
export default categories;
