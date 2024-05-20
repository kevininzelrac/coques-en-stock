import { MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";

import sleep from "~/utils/sleep";
import useTypedRouteLoaderData from "~/hooks/useTypedRouteLoaderData";
import Transition from "~/components/transition";
import Img from "~/components/img";

import loader from "../settings/loader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, ErrorBoundary };

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Details" },
  { name: "description", content: "Coques en Stock • Details" },
];

export default function Index() {
  const { user } = useTypedRouteLoaderData<typeof loader>("routes/settings")!;
  return (
    <Transition>
      <div className="badge">
        <div>
          <strong>
            {user.firstname} {user.lastname}
          </strong>
          <p>{user.email}</p>
          <span>{user.role}</span>
          <time>
            membre depuis le {new Date(user.createdAt).toLocaleDateString()}
          </time>
        </div>
        <Img src={user.avatar} alt={user.firstname} width={80} />
      </div>
    </Transition>
  );
}
