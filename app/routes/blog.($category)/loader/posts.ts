import { Role } from "@prisma/client";
import { Params } from "@remix-run/react";
import withPriviledges from "~/middlewares/withPriviledges";
import prisma from "~/services/prisma.server";
// import sleep from "~/utils/sleep";

const posts = async (
  request: Request,
  params: Params,
  user: { id: string; role: Role } | null
) => {
  const author = new URL(request.url).searchParams.get("author");
  const take = Number(new URL(request.url).searchParams.get("take")) || 5;
  const skip = Number(new URL(request.url).searchParams.get("skip")) || 0;

  // await sleep(600);

  return prisma.post
    .findMany({
      where: withPriviledges(user, {
        //id: "te",
        typeTitle: "blog",
        category: params.category ? { title: params.category } : {},
        author: author ? { firstname: author } : {},
      }),
      take: take,
      skip: take * skip,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        audience: true,
        createdAt: true,
        type: {
          select: {
            title: true,
          },
        },
        category: {
          select: {
            title: true,
          },
        },
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            avatar: true,
            role: true,
          },
        },
        likes: {
          select: {
            author: {
              select: {
                id: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            status: true,
            author: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })
    .then((posts) => posts);
};
export default posts;
