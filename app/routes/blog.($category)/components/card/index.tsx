import { SerializeFrom } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { CiCalendar } from "react-icons/ci";

import Badge from "~/components/badge";
import Tools from "~/components/tools";
import Excerpt from "./excerpt";
import Cover from "./cover";

import loader from "../../loader";
import Comments from "./comments";
import Likes from "./likes";

const Card = ({
  user,
  post,
}: {
  user: SerializeFrom<typeof loader>["user"];
  post: Awaited<SerializeFrom<typeof loader>["posts"]>[0];
}) => {
  const to = useNavigate();

  return (
    <article>
      <Cover content={post.content} />
      <section>
        <header>
          <div>
            <Badge author={post.author} />
            {user && <Tools user={user} data={post} />}
          </div>
          <span>
            <p>{post.category.title}</p>
            <time>
              <CiCalendar />
              {new Date(post.createdAt!).toLocaleDateString("fr")}
            </time>
            <small>
              {user && (
                <>
                  <Comments user={user} comments={post.comments} />
                  &nbsp;
                  <Likes user={user} likes={post.likes} />
                </>
              )}
            </small>
          </span>
          <h3>{post.title}</h3>
        </header>
        <Excerpt content={post.content} />
        <footer>
          <button
            data-primary
            onClick={() => {
              to(`/blog/${post.category.title}/${post.title}`);
            }}
          >
            Lire
          </button>
        </footer>
      </section>
    </article>
  );
};
export default Card;
