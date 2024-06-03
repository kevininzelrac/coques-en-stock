import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useState } from "react";

import { CgClose } from "react-icons/cg";
import { MdMenu } from "react-icons/md";

import Categories from "./components/categories";
import Authors from "./components/authors";
import Posts from "./components/posts";
import sleep from "~/utils/sleep";

import CSSindex from "./styles/index.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: CSSindex }];

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

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

export default function Blog() {
  const [display, setDisplay] = useState(true);

  const handleClick = () => setDisplay(!display);

  return (
    <main>
      <Posts />
      <aside
        style={{
          transition: "margin 0.4s ease-in-out",
          marginRight: display ? "0%" : "-50%",
        }}
      >
        {display ? (
          <button className="close" onClick={handleClick}>
            <CgClose />
          </button>
        ) : (
          <button className="open" onClick={handleClick}>
            <MdMenu />
          </button>
        )}
        <Categories />
        <Authors />
      </aside>
    </main>
  );
}
