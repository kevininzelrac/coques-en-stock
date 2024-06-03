import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { CiCalendar } from "react-icons/ci";

import Badge from "~/components/badge";
import Back from "~/components/back";
import ReadOnly from "~/components/slate/readOnly";
import Transition from "~/components/transition";
import Tools from "~/components/tools";
import Comments from "./components/comments";
import Reply from "./components/reply";
import Like from "./components/like";

import usePriviledges from "~/hooks/usePriviledges";
import ClientOnly from "~/utils/clientOnly";
import sleep from "~/utils/sleep";

import CSSindex from "./styles/index.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: CSSindex }];

export const meta: MetaFunction = ({ params }) => [
  { title: params.post },
  { name: "description", content: params.post },
];

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

export default function Index() {
  const { user, post, comments } = useLoaderData<typeof loader>();
  const { isFollower } = usePriviledges(user);

  return (
    <Transition>
      <main>
        <Back />
        <article>
          <header>
            <div>
              <Badge author={post.author} />
              {user && <Tools user={user} data={post} />}
            </div>
            <span>
              <p>{post.category.title}</p>
              <time>
                <CiCalendar />
                {new Date(post.createdAt).toLocaleDateString("fr")}
              </time>
              {user && <Like user={user} type="blog" data={post} />}
            </span>
            <h3>{post.title}</h3>
          </header>
          <ClientOnly fallback={<div data-loading></div>}>
            <ReadOnly>{post.content}</ReadOnly>
          </ClientOnly>
          {user && !isFollower && (
            <footer className="comments">
              <h4>Comments</h4>
              {comments.error ? (
                <div data-error>{comments.error.message}</div>
              ) : !comments.data.length ? (
                <div>No comments yet</div>
              ) : (
                <Comments user={user} comments={comments.data} />
              )}
              <div className="reply">
                <Reply user={user} postId={post.id} />
              </div>
            </footer>
          )}
        </article>
      </main>
    </Transition>
  );
}
