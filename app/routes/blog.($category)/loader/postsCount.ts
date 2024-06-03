import { Params } from "@remix-run/react";
import withTryCatch from "~/middlewares/withTryCatch";
import prisma from "~/services/prisma.server";

const postsCount = async (params: Params) =>
  await withTryCatch(
    prisma.post.count({
      where: {
        type: { title: "blog" },
        category: { title: params.category ? params.category : {} },
      },
    }),
    "Failed to fetch posts count"
  );

export default postsCount;
