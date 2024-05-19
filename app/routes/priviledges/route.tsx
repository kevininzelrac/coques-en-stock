import {
  ClientLoaderFunctionArgs,
  MetaFunction,
  useLoaderData,
} from "@remix-run/react";
import usePriviledges from "~/hooks/usePriviledges";

import sleep from "~/utils/sleep";
import Transition from "~/components/transition";
import Status from "./components/status";
import Audience from "./components/audience";

import loader from "./loader";
import action from "./action";
export { loader, action };

export const clientLoader = async ({
  serverLoader,
}: ClientLoaderFunctionArgs) => {
  await sleep();
  return await serverLoader<typeof loader>();
};

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
        <h1>Priviledges</h1>
        {!posts.length ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <article key={post.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>{post.title}</h2>
                <Status id={post.id} status={post.status} />
                <Audience id={post.id} audience={post.audience} />
              </div>
              <p>{post.content}</p>
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
