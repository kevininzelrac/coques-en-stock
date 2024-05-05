import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
export { loader };

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
