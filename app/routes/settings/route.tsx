import {
  ClientLoaderFunctionArgs,
  NavLink,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
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
  return <p>Loading...</p>;
}

export default function Settings() {
  const { credential } = useLoaderData<typeof loader>();
  return (
    <main>
      <article>
        <h2>Settings</h2>
        <nav>
          <NavLink to="" end>
            Details
          </NavLink>
          {credential ? (
            <NavLink to="password/change">Change password</NavLink>
          ) : null}
          <NavLink to="account/delete">Delete account</NavLink>
        </nav>
        <Outlet />
      </article>
    </main>
  );
}
