import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import prisma from "./services/prisma.server";
import withTryCatch from "./middlewares/withTryCatch";
import withPriviledges from "./middlewares/withPriviledges";

import Header from "./components/header";
import Footer from "./components/footer";
import auth from "./services/auth.server";
import Nav from "./components/nav";

import links from "./styles/index";
export { links };

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, headers } = await auth(request);
  const user = id
    ? await prisma.user
        .findUnique({
          where: { id },
          select: {
            id: true,
            role: true,
            firstname: true,
            email: true,
            avatar: true,
          },
        })
        .catch(() => null)
    : null;

  const menu = await prisma.menu
    .findMany({
      where: { post: withPriviledges(user, {}) },
      select: { id: true, title: true },
      orderBy: { index: "asc" },
    })
    .catch(() => null);

  return json({ user, menu }, { headers });
};

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { id: userId } = await auth(request);
  const body = await request.json();

  if (request.method === "POST") {
    if (body.action === "create") {
      if (body.type === "page") {
        const { category, title } = body;
        const post = await withTryCatch(
          prisma.post.create({
            data: {
              type: { connect: { title: "page" } },
              category: { connect: { title: category } },
              author: { connect: { id: userId } },
              title: String(title),
              content: "enter content here",
            },
            select: { id: true, title: true },
          }),
          "Failed to create post."
        );
        if (post.error) return json(post, { status: 500 });
        return redirect(`/editor/page/${category}/${post.data.title}`);
      }
    }
  }
  return json(null, { status: 405, statusText: "Method Not Allowed" });
};

export default function App() {
  const { user, menu } = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <Nav user={user} menu={menu} />
      <Outlet />
      <Footer />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("ERROR ", error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Nav user={null} menu={null} />
        {isRouteErrorResponse(error) ? (
          error.status >= 400 && error.status <= 499 ? (
            <article data-warning>
              &nbsp;
              <strong>
                {error.status} • {error.statusText}
              </strong>
              &nbsp;
              <i>{error.data}</i>
            </article>
          ) : error.status >= 500 && error.status <= 599 ? (
            <article data-error>
              &nbsp;
              <strong>
                {error.status} • {error.statusText}
              </strong>
              &nbsp;
              <i>{error.data}</i>
            </article>
          ) : null
        ) : error instanceof Error ? (
          <article data-error>{error.message}</article>
        ) : (
          <article data-error>Unknown Error</article>
        )}
        <Footer />

        <Scripts />
      </body>
    </html>
  );
}
