import { LoaderFunctionArgs, defer, json } from "@remix-run/node";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  if (!id)
    throw json(null, { status: 401, statusText: "Unauthorized", headers });

  const user = await prisma.user
    .findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        email: true,
        avatar: true,
        role: true,
      },
    })
    .catch(() => null);

  if (!user)
    throw json(null, { status: 401, statusText: "Unauthorized", headers });

  const users = !["ADMIN"].includes(user.role)
    ? Promise.resolve([])
    : prisma.user
        .findMany({
          select: {
            id: true,
            firstname: true,
            email: true,
            avatar: true,
            role: true,
          },
          orderBy: { firstname: "asc" },
        })
        .then((users) => users);

  const posts = !["ADMIN", "EDITOR"].includes(user.role)
    ? Promise.resolve([])
    : prisma.post
        .findMany({
          where: {
            authorId: user.role === "ADMIN" ? undefined : user.id,
            status: "DRAFT",
          },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true,
            title: true,
            status: true,
            category: {
              select: {
                title: true,
              },
            },
            type: {
              select: {
                title: true,
              },
            },
            createdAt: true,
            author: {
              select: {
                firstname: true,
                avatar: true,
              },
            },
          },
        })
        .then((posts) => posts);

  const comments = ["FOLLOWER"].includes(user?.role)
    ? Promise.resolve([])
    : prisma.comment
        .findMany({
          where:
            user.role === "ADMIN"
              ? { status: "DRAFT" }
              : {
                  OR: [
                    { authorId: user.id, status: "DRAFT" },
                    { status: "PUBLISHED" },
                  ],
                },

          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true,
            content: true,
            createdAt: true,
            status: true,
            comment: {
              select: {
                content: true,
                author: {
                  select: {
                    id: true,
                    firstname: true,
                  },
                },
              },
            },
            author: {
              select: {
                id: true,
                firstname: true,
                avatar: true,
              },
            },
            post: {
              select: {
                title: true,
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
                  },
                },
              },
            },
          },
        })
        .then((comments) => comments);

  const likes = prisma.like
    .findMany({
      where:
        user.role === "ADMIN"
          ? {}
          : {
              OR: [
                { authorId: user.id },
                { post: { authorId: user.id } },
                { comment: { authorId: user.id } },
              ],
            },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            firstname: true,
            avatar: true,
          },
        },
        post: {
          select: {
            title: true,
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
              },
            },
          },
        },
        comment: {
          select: {
            content: true,
            author: {
              select: {
                id: true,
                firstname: true,
              },
            },
            post: {
              select: {
                title: true,
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
              },
            },
          },
        },
      },
    })
    .then((likes) => likes);

  return defer({ user, users, posts, likes, comments }, { headers });
};
export default loader;
