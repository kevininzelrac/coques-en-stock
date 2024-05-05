import { MetaFunction, useFetcher } from "@remix-run/react";
import useTypedRouteLoaderData from "~/hooks/useTypedRouteLoaderData";

import loader from "../settings/loader";
import action from "./action";
export { loader, action };

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Delete Account" },
  { name: "description", content: "Coques en Stock • Delete Account" },
];

export default function Delete() {
  const { user } = useTypedRouteLoaderData<typeof loader>("routes/settings")!;
  const fetcher = useFetcher<typeof action>();

  return (
    <>
      {fetcher.data?.success ? (
        <div>{fetcher.data.success.message}</div>
      ) : (
        <button
          data-primary
          onClick={() =>
            fetcher.submit(
              { id: user.id, firstname: user.firstname, email: user.email },
              { method: "post", encType: "application/json" }
            )
          }
        >
          Delete account
        </button>
      )}
      {fetcher.state !== "idle" ? <div>{fetcher.state}...</div> : null}
      {fetcher.data?.error ? <div>{fetcher.data.error.message}</div> : null}
    </>
  );
}
