import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Coques en Stock" },
    { name: "description", content: "Home" },
  ];
};

import loader from "./loader";
export { loader };

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      {posts.error ? (
        <div style={{ color: "crimson" }}>{posts.error.message}</div>
      ) : (
        posts.data.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </main>
  );
}
