import { LinksFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs, Outlet } from "@remix-run/react";

import Transition from "~/components/transition";
import sleep from "~/utils/sleep";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
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
  return <div data-loading></div>;
}

export default function Dashboard() {
  return (
    <Transition>
      <main>
        <Outlet />
      </main>
    </Transition>
  );
}
