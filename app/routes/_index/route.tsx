import { LinksFunction, type MetaFunction } from "@remix-run/node";
import Transition from "~/components/transition";
import sleep from "~/utils/sleep";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import ErrorBoundary from "~/components/errorBoundary";
export { ErrorBoundary };

export const clientLoader = async () => {
  await sleep();
  return null;
};
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <p>Loading...</p>;
}

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Home" },
  { name: "description", content: "Coques en Stock • Home" },
];

export default function Index() {
  return (
    <Transition>
      <main>
        <h4>En pleine refonte !</h4>
        <p>
          Notre site se métamorphose pour vous offrir une expérience encore plus
          palpitante.
        </p>
        <p>Préparez-vous à hisser de nouvelles voiles virtuelles.</p>
        <p>En attendant, restez connectés!</p>
      </main>
    </Transition>
  );
}
