import { useLoaderData, useLocation } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";

import { CiCalendar } from "react-icons/ci";

import usePriviledges from "~/hooks/usePriviledges";
import Transition from "~/components/transition";
import Badge from "~/components/badge";
import Tools from "~/components/tools";
import ClientOnly from "~/utils/clientOnly";
import ReadOnly from "~/components/slate/readOnly";

export const meta: MetaFunction = ({ params }) => [
  { title: params.page },
  { name: "description", content: params.page },
];

import styles from "./styles/index.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
import action from "./action";
import clientLoader from "./clientLoader";
import ErrorBoundary from "~/components/errorBoundary";
export { loader, action, clientLoader, ErrorBoundary };

export function HydrateFallback() {
  return <div data-loading></div>;
}

export default function Index() {
  const { user, page } = useLoaderData<typeof loader>();
  const { key } = useLocation();
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user);

  return (
    <Transition>
      <main key={key}>
        <article>
          {user ? (
            isAdmin || (isEditor && isAuthor(page.author.id)) ? (
              <header>
                <div>
                  <Badge author={page.author} />
                  <Tools user={user} data={page} />
                </div>
                <span>
                  <p>{page.category.title}</p>
                  <time>
                    <CiCalendar />
                    {new Date(page.createdAt).toLocaleDateString("fr")}
                  </time>
                </span>
              </header>
            ) : null
          ) : null}
          <h3>{page.title}</h3>
          <ClientOnly fallback={<div data-loading></div>}>
            <ReadOnly>{page.content}</ReadOnly>
          </ClientOnly>
        </article>
      </main>
    </Transition>
  );
}
