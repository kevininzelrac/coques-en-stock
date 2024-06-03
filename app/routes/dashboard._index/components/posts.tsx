import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Img from "~/components/img";
import loader from "../loader";

export default function Posts({
  posts,
}: {
  posts: Awaited<SerializeFrom<typeof loader>["posts"]>;
}) {
  return (
    <article>
      <h3>
        Posts <small>{posts.length}</small>
      </h3>
      <div className="scroll">
        {!posts.length ? (
          <p>No pending posts</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                borderLeft:
                  post.status === "DRAFT" ? "5px solid orange" : "none",
              }}
            >
              <Img src={post.author.avatar} alt={post.author.firstname} />
              <div>
                <h4>
                  {post.type.title === "blog" && (
                    <Link to={`/blog/${post.category.title}/${post.title}`}>
                      {post.title}
                    </Link>
                  )}
                </h4>
                <p>
                  written by <strong>{post.author.firstname}</strong>
                </p>
                <p>
                  {post.type.title} • {post.category.title} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
