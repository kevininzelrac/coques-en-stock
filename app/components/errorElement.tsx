import { useAsyncError } from "@remix-run/react";

export default function ErrorElement() {
  const error = useAsyncError();
  return (
    <>
      {error instanceof Error ? (
        <span data-error>{error.message}</span>
      ) : (
        <span data-error>Unknown Error</span>
      )}
    </>
  );
}
