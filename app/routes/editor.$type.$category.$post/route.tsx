import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";

import Editor from "~/components/slate/editor";
import Transition from "~/components/transition";
import Badge from "~/components/badge";
import Tools from "~/components/tools";

import ClientOnly from "~/utils/clientOnly";
import sleep from "~/utils/sleep";
import idb from "~/services/idb.client";

import CSSstyles from "./styles.css?url";

export let links: LinksFunction = () => [
  { rel: "stylesheet", href: CSSstyles },
];

import loader from "./loader";
import action from "./action";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, ErrorBoundary };

export const clientAction = async ({
  serverAction,
}: ClientActionFunctionArgs) => {
  const fetcher = await serverAction<typeof action>();
  if (!fetcher || fetcher.error) return fetcher;
  if ("data" in fetcher) return fetcher;

  const image = await idb.get("images", fetcher.filename);
  await fetch(fetcher.url, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    body: image,
  });
  await idb.delete("images", fetcher.filename);

  return fetcher;
};
clientAction.hydrate = true;

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

export default function Edit() {
  const { user, post } = useLoaderData<typeof loader>();
  const [isDraft, setIsDraft] = useState(false);

  return (
    <Transition>
      <main>
        <article>
          <header>
            <div>
              <Badge author={post.author} />
              <Tools
                user={user}
                data={post}
                isDraft={isDraft}
                setIsDraft={setIsDraft}
              />
            </div>
            <span>
              <p>{post.category.title}</p>
              <time>
                <CiCalendar />
                {new Date(post.createdAt).toLocaleDateString("fr")}
              </time>
            </span>
            <h3>{post.title}</h3>
          </header>
          <ClientOnly fallback={<div data-loading></div>}>
            <Editor
              setIsDraft={setIsDraft}
              color="#FFFFFF"
              get={async (store, key) => await idb.get(store, key)}
              put={async (s, k, v) => await idb.put(s, k, v)}
              remove={async (s, k) => await idb.delete(s, k)}
            >
              {post.content}
            </Editor>
          </ClientOnly>
        </article>
      </main>
    </Transition>
  );
}
