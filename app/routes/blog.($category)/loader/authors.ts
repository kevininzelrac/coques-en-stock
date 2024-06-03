import { Role } from "@prisma/client";
import withPriviledges from "~/middlewares/withPriviledges";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const authors = async (user: { id: string; role: Role } | null) =>
  await withTryCatch(
    prisma.user.findMany({
      //where: { id: "te" },
      where: {
        posts: { some: withPriviledges(user, { type: { title: "blog" } }) },
      },
      select: {
        id: true,
        firstname: true,
        _count: {
          select: {
            posts: {
              where: withPriviledges(user, { type: { title: "blog" } }),
            },
          },
        },
      },
    }),
    "An error occured while fetching authors"
  );

export default authors;
