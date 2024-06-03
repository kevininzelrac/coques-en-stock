import { LoaderFunctionArgs, json } from "@remix-run/node";
import withTryCatch from "~/middlewares/withTryCatch";
import auth from "~/services/auth.server";
import prisma from "~/services/prisma.server";

const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);

  const user = id
    ? await prisma.user
        .findUnique({
          where: { id },
          select: {
            id: true,
            role: true,
          },
        })
        .catch(() => null)
    : null;

  const post = await prisma.post.findUnique({
    where: {
      //id: "te",
      typeTitle: "blog",
      categoryTitle: params.category,
      title: params.post,
    },
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
      _count: {
        select: { likes: true, comments: true },
      },
    },
  });
  if (!post)
    throw json(null, {
      status: 404,
      statusText: "Post Not Found",
    });

  const select = {
    id: true,
    commentId: true,
    status: true,
    content: true,
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
        id: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    },
    _count: {
      select: {
        likes: true,
      },
    },
  };

  const comments =
    user?.role === "FOLLOWER"
      ? { data: [], error: null }
      : await withTryCatch(
          prisma.comment.findMany({
            where:
              user?.role === "ADMIN"
                ? { postId: post.id, comment: null }
                : {
                    OR: [
                      { postId: post.id, comment: null, status: "PUBLISHED" },
                      { postId: post.id, comment: null, authorId: id },
                    ],
                  },

            select: {
              ...select,
              comments: {
                select: {
                  ...select,
                  comments: {
                    select: {
                      ...select,
                      comments: {
                        select: select,
                      },
                    },
                  },
                },
              },
            },
          }),
          "Comments Not Found"
        );

  return json({ user, post, comments }, { headers });
};
export default loader;

// OTHER OPTION WOULD BE TO USE RECURSIVE FUNCTION
// const recursive = (root: any[], parent: string | null): any[] =>
//   root
//     .filter(({ parentId }: any) => parentId === parent)
//     .map((comment: any) => ({
//       ...comment,
//       children: recursive(root, comment.id),
//     }));

//const comments = rawComments.error
//  ? { data: null, error: rawComments.error }
//  : { data: recursive(rawComments.data, null), error: null };
