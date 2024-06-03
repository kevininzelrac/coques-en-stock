import { SerializeFrom } from "@remix-run/node";
import loader from "../loader";
import Img from "~/components/img";
import { Link, useLoaderData } from "@remix-run/react";

export default function Likes({
  likes,
}: {
  likes: Awaited<SerializeFrom<typeof loader>["likes"]>;
}) {
  return (
    <article>
      <h3>
        Likes
        <small> {likes.length}</small>
      </h3>
      <div className="scroll">
        {!likes.length ? (
          <p>No pending likes</p>
        ) : (
          likes.map((like) =>
            like.post ? (
              <Post data={like} key={like.id} />
            ) : (
              <Comment data={like} key={like.id} />
            )
          )
        )}
      </div>
    </article>
  );
}

const Post = ({
  data,
}: {
  data: Awaited<SerializeFrom<typeof loader>["likes"]>[0];
}) => {
  const { user } = useLoaderData<typeof loader>();
  if (!data.post) return null;
  const { author, post, createdAt } = data;

  const isAuthor = author.id === user.id;
  const Author = () => <strong>{isAuthor ? "You" : author.firstname}</strong>;

  const isPostAuthor = post.author.id === user.id;
  const PostAuthor = () => {
    if (isPostAuthor) {
      return <strong>your</strong>;
    } else {
      return (
        <span>
          <strong>{post.author.firstname}</strong>'s
        </span>
      );
    }
  };
  const isBlog = post.type.title === "blog";
  const Title = () => {
    return isBlog ? (
      <Link to={`/blog/${post.category.title}/${post.title}`}>
        {post.title}
      </Link>
    ) : (
      <strong>{post.title}</strong>
    );
  };

  const PostDate = () => new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <Img src={author.avatar} alt={author.firstname} />
      <div>
        <Author /> liked <PostAuthor /> post <Title /> on <PostDate />
      </div>
    </div>
  );
};

const Comment = ({
  data,
}: {
  data: Awaited<SerializeFrom<typeof loader>["likes"]>[0];
}) => {
  if (!data.comment) return null;
  const { author, comment, createdAt } = data;
  const { user } = useLoaderData<typeof loader>();

  const isAuthor = author.id === user.id;
  const Author = () => <strong>{isAuthor ? "You" : author.firstname}</strong>;

  const isCommentAuthor = comment.author.id === user.id;
  const CommentAuthor = () => {
    if (isCommentAuthor) {
      return <strong>your</strong>;
    } else {
      return (
        <span>
          <strong>{comment.author.firstname}</strong>'s
        </span>
      );
    }
  };

  const Content = () => <i>'{comment.content}'</i>;

  const isBlog = comment.post.type.title === "blog";
  const Title = () => {
    if (isBlog) {
      return (
        <Link to={`/blog/${comment.post.category.title}/${comment.post.title}`}>
          {comment.post.title}
        </Link>
      );
    } else {
      return <strong>{comment.post.title}</strong>;
    }
  };

  const CommentDate = () => new Date(createdAt).toLocaleDateString();

  return (
    <div>
      <Img src={author.avatar} alt={author.firstname} />
      <div>
        <Author /> liked <CommentAuthor /> comment <Content /> in post <Title />{" "}
        on <CommentDate />
      </div>
    </div>
  );
};
