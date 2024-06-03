import { SerializeFrom } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "@prisma/client";

import { BiNoEntry } from "react-icons/bi";

import Badge from "~/components/badge";
import Status from "~/components/tools/status";
import Delete from "~/components/tools/delete";
import Like from "../components/like";
import Reply from "./reply";

import usePriviledges from "~/hooks/usePriviledges";
import loader from "../loader";

const Comments = ({
  level = 0,
  user,
  comments,
}: {
  level?: number;
  user: { id: User["id"]; role: User["role"] };
  comments: NonNullable<SerializeFrom<typeof loader>["comments"]["data"]>;
}) => {
  const { post } = useLoaderData<typeof loader>();
  // let isRoot = post.id === comments[0]?.parentId;
  const { isAdmin, isAuthor } = usePriviledges(user);
  level += 1;

  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="comment"
          // style={{ marginLeft: isRoot ? 0 : "1rem" }}
        >
          <header>
            <Badge author={comment.author} />
            {(isAdmin || isAuthor(comment.author.id)) && (
              <span className="tools">
                <Status
                  user={user}
                  data={{
                    id: comment.id,
                    status: comment.status,
                    type: { title: "comment" },
                  }}
                />
                <Delete id={comment.id} type="comment" />
              </span>
            )}
          </header>
          <p>{comment.content}</p>
          <div className="reply">
            {level <= 3 ? (
              <Reply user={user} postId={post.id} commentId={comment.id} />
            ) : (
              <BiNoEntry color="crimson" />
            )}
            <Like user={user} type="comment" data={comment} />
          </div>
          {comment.comments && level <= 4 && (
            <Comments user={user} comments={comment.comments} level={level} />
          )}
        </div>
      ))}
    </>
  );
};

export default Comments;
