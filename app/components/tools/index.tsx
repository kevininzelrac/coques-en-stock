import {
  User,
  Role,
  Post,
  Type,
  Category,
  Audience as prismaAudience,
  Status as prismaStatus,
} from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { BsEscape } from "react-icons/bs";

import usePriviledges from "~/hooks/usePriviledges";

import Status from "./status";
import Audience from "./audience";
import Edit from "./edit";
import Delete from "./delete";
import Update from "./update";

export default function Tools({
  user,
  data,
  isDraft,
  setIsDraft,
}: {
  user: { id: User["id"]; role: Role };
  data: {
    id: Post["id"];
    title: Post["title"];
    category: {
      title: Category["title"];
    };
    type: {
      title: Type["title"];
    };

    author: { id: User["id"] };
    status: prismaStatus;
    audience: prismaAudience;
  };
  isDraft?: boolean;
  setIsDraft?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isAdmin, isEditor, isAuthor } = usePriviledges(user);
  const isEditing = isDraft !== undefined && setIsDraft !== undefined;
  const to = useNavigate();

  const Exit = () => (
    <button onClick={() => to(-1)} data-tooltip="Exit">
      <BsEscape />
    </button>
  );

  return (
    <nav className="tools" style={styles.nav}>
      <span style={styles.span}>
        {(isAdmin || (isEditor && isAuthor(data.author.id))) && (
          <Status user={user} data={data} />
        )}
        {(isAdmin || isEditor) && <Audience user={user} data={data} />}
      </span>
      {isEditing ? (
        <span style={styles.span}>
          {(isAdmin || isEditor) && isAuthor(data.author.id) && (
            <>
              <Exit />
              <Update post={data} isDraft={isDraft} setIsDraft={setIsDraft} />
            </>
          )}
        </span>
      ) : (
        <span style={styles.span}>
          {(isAdmin || isEditor) && isAuthor(data.author.id) && (
            <Edit
              to={`${data.type.title}/${data.category.title}/${data.title}`}
            />
          )}
          {(isAdmin || (isEditor && isAuthor(data.author.id))) && (
            <Delete id={data.id} type={data.type.title} />
          )}
        </span>
      )}
    </nav>
  );
}

const nav: React.CSSProperties = {
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const span: React.CSSProperties = {
  width: "fit-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
};

const styles = {
  nav,
  span,
};
