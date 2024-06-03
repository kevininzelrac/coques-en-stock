import { Role } from "@prisma/client";
import { BiComment } from "react-icons/bi";
import usePriviledges from "~/hooks/usePriviledges";

export default function Comments({
  user,
  comments,
}: {
  user: {
    id: string;
    role: Role;
  };
  comments: {
    id: string;
    status: string;
  }[];
}) {
  const { isAdmin, isEditor, isGuest } = usePriviledges(user);
  const isDraft = comments.some(({ status }) => status === "DRAFT");

  return (
    <>
      {isAdmin ? (
        <>
          <BiComment color={isDraft ? "orange" : "ghostwhite"} />
          {isDraft ? (
            <>
              <span style={{ color: "orange" }}>
                {comments.filter(({ status }) => status === "DRAFT").length}
              </span>
              •
            </>
          ) : null}
          <span>
            {comments.filter(({ status }) => status === "PUBLISHED").length}
          </span>
        </>
      ) : isEditor || isGuest ? (
        <>
          <BiComment />
          <span>
            {comments.filter(({ status }) => status === "PUBLISHED").length}
          </span>
        </>
      ) : null}
    </>
  );
}
