import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  useLoaderData,
} from "@remix-run/react";
import usePriviledges from "~/hooks/usePriviledges";

import sleep from "~/utils/sleep";
import Transition from "~/components/transition";
import Status from "../../components/tools/status";
import Audience from "../../components/tools/audience";
import ClientOnly from "~/utils/clientOnly";
import ReadOnly from "~/components/slate/readOnly";

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
  return <p>Loading...</p>;
}

export const meta: MetaFunction = () => [
  { title: "Coques en Stock • Priviledges" },
  { name: "description", content: "Coques en Stock • Priviledges" },
];

export default function Priviledges() {
  const { user, posts } = useLoaderData<typeof loader>();
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user);
  return (
    <Transition>
      <main>
        <h2>Priviledges</h2>
        {!posts.length ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <article key={post.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>{post.title}</h2>
                {(isAdmin || (isEditor && isAuthor(post.author.id))) && (
                  <>
                    <Status user={user} post={post} />
                    <Audience user={user} post={post} />
                  </>
                )}
              </div>
              <ClientOnly fallback={<div data-loading></div>}>
                <ReadOnly>{post.content}</ReadOnly>
              </ClientOnly>
              {isAuthor(post.author.id) ? (
                <p>You are the author of this post</p>
              ) : (
                <p>Written by : {post.author.firstname}</p>
              )}

              {isAdmin || (isEditor && isAuthor(post.author.id)) ? (
                <p style={{ color: "green" }}>
                  You have the required priviledges to edit this post
                </p>
              ) : (
                <p style={{ color: "red" }}>
                  You do not have the required priviledges to edit this post
                </p>
              )}
            </article>
          ))
        )}
      </main>
    </Transition>
  );
}
