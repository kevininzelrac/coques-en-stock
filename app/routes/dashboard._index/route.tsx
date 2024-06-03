import { LinksFunction } from "@remix-run/node";
import {
  Await,
  ClientLoaderFunctionArgs,
  useLoaderData,
} from "@remix-run/react";
import { Suspense } from "react";

import usePriviledges from "~/hooks/usePriviledges";
import sleep from "~/utils/sleep";

import Users from "./components/users";
import Posts from "./components/posts";
import Likes from "./components/likes";
import Comments from "./components/comments";
import ErrorElement from "~/components/errorElement";
import Transition from "~/components/transition";

import styles from "./styles.css?url";
export let links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

import loader from "./loader";
export { loader };

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
  const { user, users, posts, comments, likes } =
    useLoaderData<typeof loader>();
  const { isAdmin, isEditor, isGuest } = usePriviledges(user);
  return (
    <Transition>
      <section>
        {isAdmin && (
          <Suspense fallback={<div data-loading></div>}>
            <Await resolve={users} errorElement={<ErrorElement />}>
              {(users) => <Users users={users} />}
            </Await>
          </Suspense>
        )}
        {(isAdmin || isEditor) && (
          <Suspense fallback={<div data-loading></div>}>
            <Await resolve={posts} errorElement={<ErrorElement />}>
              {(posts) => <Posts posts={posts} />}
            </Await>
          </Suspense>
        )}
        {(isAdmin || isEditor || isGuest) && (
          <Suspense fallback={<div data-loading></div>}>
            <Await resolve={comments} errorElement={<ErrorElement />}>
              {(comments) => <Comments comments={comments} />}
            </Await>
          </Suspense>
        )}
        <Suspense fallback={<div data-loading></div>}>
          <Await resolve={likes} errorElement={<ErrorElement />}>
            {(likes) => <Likes likes={likes} />}
          </Await>
        </Suspense>
      </section>
    </Transition>
  );
}
