import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
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
    </>
  );
}
