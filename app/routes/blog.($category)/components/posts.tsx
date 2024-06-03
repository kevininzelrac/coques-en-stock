import { Await, useLoaderData, useLocation } from "@remix-run/react";
import { Suspense } from "react";

import Transition from "~/components/transition";
import ErrorElement from "~/components/errorElement";
import Card from "./card";

import loader from "../loader";
import Pagination from "./pagination";

const Posts = () => {
  const { user, posts } = useLoaderData<typeof loader>();
  const { key } = useLocation();

  return (
    <Transition>
      <section>
        <Pagination />
        <Suspense fallback={<div data-loading></div>} key={key}>
          <Await
            resolve={posts}
            errorElement={
              <article>
                <ErrorElement />
              </article>
            }
          >
            {(posts) =>
              !posts.length ? (
                <article data-info>No posts found</article>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} user={user} post={post} />
                ))
              )
            }
          </Await>
        </Suspense>
      </section>
    </Transition>
  );
};
export default Posts;
