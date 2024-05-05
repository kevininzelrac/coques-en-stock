import { Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Auth() {
  return (
    <main>
      <article>
        <Outlet />
      </article>
    </main>
  );
}
