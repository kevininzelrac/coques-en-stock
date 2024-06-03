import { Link, useLoaderData } from "@remix-run/react";
import { SerializeFrom } from "@remix-run/node";

import Img from "~/components/img";
import loader from "../loader";

export default function Comments({
  comments,
}: {
  comments: Awaited<SerializeFrom<typeof loader>["comments"]>;
}) {
  return (
    <article>
      <h3>
        Comments
        <small> {comments.length}</small>
      </h3>
      <div className="scroll">
        {!comments.length ? (
          <p>No pending comments</p>
        ) : (
          comments.map((comment) =>
            comment.comment ? (
              <Comment data={comment} key={comment.id} />
            ) : (
              <Post data={comment} key={comment.id} />
            )
          )
        )}
      </div>
    </article>
  );
}

const MAX_LENGTH = 40;

const Post = ({
  data,
}: {
  data: Awaited<SerializeFrom<typeof loader>["comments"]>[0];
}) => {
  const { user } = useLoaderData<typeof loader>();
  const { status, author, post, createdAt, content } = data;

  const isDraft = status === "DRAFT";
  const isAuthor = author.id === user.id;
  const Author = () => {
    return <strong>{isAuthor ? "You" : author.firstname}</strong>;
  };

  const Content = () => {
    if (content.length > MAX_LENGTH) {
      return <i>'{content.substring(0, MAX_LENGTH)}...'</i>;
    } else {
      return <i>'{content}'</i>;
    }
  };

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
    if (isBlog) {
      return (
        <Link to={`/blog/${post.category.title}/${post.title}`}>
          {post.title}
        </Link>
      );
    } else {
      return <strong>{post.title}</strong>;
    }
  };

  const CommentDate = () => new Date(createdAt).toLocaleDateString();

  return (
    <div
      style={{
        borderLeft: isDraft ? "5px solid orange" : "none",
      }}
    >
      <Img src={author.avatar} alt={author.firstname} />
      <div>
        <Author /> commented <Content /> in <PostAuthor /> post <Title /> on{" "}
        <CommentDate />
      </div>
    </div>
  );
};

const Comment = ({
  data,
}: {
  data: Awaited<SerializeFrom<typeof loader>["comments"]>[0];
}) => {
  if (!data.comment) return null;
  const { status, author, comment, post, createdAt, content } = data;
  const { user } = useLoaderData<typeof loader>();

  const isDraft = status === "DRAFT";
  const isAuthor = author.id === user.id;
  const Author = () => {
    return <strong>{isAuthor ? "You" : author.firstname}</strong>;
  };

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

  const Content = () => {
    if (content.length > MAX_LENGTH) {
      return <i>'{content.substring(0, MAX_LENGTH)}...'</i>;
    } else {
      return <i>'{content}'</i>;
    }
  };

  const CommentContent = () => {
    if (comment.content.length > MAX_LENGTH) {
      return <i>'{comment.content.substring(0, MAX_LENGTH)}...'</i>;
    } else {
      return <i>'{comment.content}'</i>;
    }
  };

  const isBlog = post.type.title === "blog";
  const Title = () => {
    if (isBlog) {
      return (
        <Link to={`/blog/${post.category.title}/${post.title}`}>
          {post.title}
        </Link>
      );
    } else {
      return <strong>{post.title}</strong>;
    }
  };

  const CommentDate = () => new Date(createdAt).toLocaleDateString();

  return (
    <div
      style={{
        borderLeft: isDraft ? "5px solid orange" : "none",
      }}
    >
      <Img src={author.avatar} alt={author.firstname} />
      <div>
        <Author /> replied <Content /> to <CommentAuthor /> comment{" "}
        <CommentContent /> in post <Title /> on <CommentDate />
      </div>
    </div>
  );
};
