import { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import isTouchScreenDevice from "~/utils/isTouchScreenDevice";
import Transition from "~/components/transition";

import Context from "./context";
import Pages from "./components/pages";
import Menu from "./components/menu";
import Trash from "./components/trash";
import Save from "./components/save";

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
import clientLoader from "./clientLoader";
export { loader, action, clientLoader, ErrorBoundary };

export function HydrateFallback() {
  return <div data-loading></div>;
}

export default function Index() {
  const { menu: _menu } = useLoaderData<typeof loader>();

  const [menu, setMenu] = useState<{ id: string; title: string }[]>(_menu);
  const isDraft = JSON.stringify(menu) !== JSON.stringify(_menu);

  const [index, setIndex] = useState<number | undefined>(undefined);
  const [id, setId] = useState("");
  const [origin, setOrigin] = useState("");

  const [target, setTarget] = useState<number | undefined>(undefined);
  const [hover, setHover] = useState("");

  const touchScreenMessage =
    "This page is not yet optimized for touch screen devices, please use a desktop or laptop computer.";

  if (isTouchScreenDevice())
    return (
      <main>
        <h3>{touchScreenMessage}</h3>
      </main>
    );

  return (
    <Context.Provider
      value={{
        menu,
        setMenu,
        isDraft,
        index,
        setIndex,
        id,
        setId,
        origin,
        setOrigin,
        target,
        setTarget,
        hover,
        setHover,
      }}
    >
      <Transition>
        <main>
          <Pages />
          <BsArrowRight size={32} />
          <Menu />
          <Trash />
          <Save />
        </main>
      </Transition>
    </Context.Provider>
  );
}
