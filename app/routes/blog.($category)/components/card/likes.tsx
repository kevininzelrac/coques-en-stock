import { Role } from "@prisma/client";
import { BiLike } from "react-icons/bi";

export default function Likes({
  user,
  likes,
}: {
  user: {
    id: string;
    role: Role;
  };
  likes: {
    author: {
      id: string;
    };
  }[];
}) {
  const isAuthor = likes.some(({ author }) => author.id === user!.id);

  return (
    <>
      <BiLike color={isAuthor ? "var(--primary)" : "ghostwhite"} />
      <span>{likes.length}</span>
    </>
  );
}
