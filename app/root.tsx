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
import { LoaderFunctionArgs } from "@remix-run/node";

import links from "./styles/index";
export { links };

import bkgrd from "./src/bkgrd.jpg";
import Header from "./components/header";
import Footer from "./components/footer";
import auth from "./services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { id, firstname, email, avatar, headers } = await auth(request);
  const user = id ? { id, firstname, email, avatar } : null;

  return json({ user }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        style={{
          background: `url(${bkgrd})`,
        }}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
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
        <Footer user={null} />

        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <Outlet />
      <Footer user={user} />
    </>
  );
}
