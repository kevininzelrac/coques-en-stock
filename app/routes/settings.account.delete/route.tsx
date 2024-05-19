import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  useFetcher,
} from "@remix-run/react";

import sleep from "~/utils/sleep";
import Transition from "~/components/transition";
import useTypedRouteLoaderData from "~/hooks/useTypedRouteLoaderData";

import loader from "../settings/loader";
import action from "./action";
export { loader, action };

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};

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
        <Transition>
          <div>{fetcher.data.success.message}</div>
        </Transition>
      ) : (
        <Transition>
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
        </Transition>
      )}
      {fetcher.state !== "idle" ? <div>{fetcher.state}...</div> : null}
      {fetcher.data?.error ? <div>{fetcher.data.error.message}</div> : null}
    </>
  );
}
