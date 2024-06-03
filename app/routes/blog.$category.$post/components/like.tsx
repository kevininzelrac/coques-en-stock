import { User } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { BiLike } from "react-icons/bi";

type fetcherType =
  | {
      data: unknown;
      error: null;
    }
  | {
      data: null;
      error: {
        message: string;
      };
    }
  | null;

const Like = ({
  user,
  type,
  data,
}: {
  user: {
    id: User["id"];
    role: User["role"];
  };
  type: "comment" | "blog";
  data: {
    id: string;
    likes: { author: { id: string } }[];
    _count: { likes: number };
  };
}) => {
  const fetcher = useFetcher<fetcherType>();
  const handleSubmit = () => {
    fetcher.submit(
      {
        action: "like",
        type,
        userId: user.id,
        id: data.id,
      },
      {
        method: data.likes.some(({ author }) => author.id === user.id)
          ? "DELETE"
          : "POST",
        encType: "application/json",
      }
    );
  };

  return (
    <>
      <button
        className="like"
        onClick={handleSubmit}
        style={{
          color: "ghostwhite",
        }}
      >
        <BiLike
          color={
            data.likes.some(({ author }) => author.id === user.id)
              ? "var(--primary)"
              : "ghostwhite"
          }
        />
        &nbsp;
        {data._count.likes}
      </button>
      {fetcher.data?.error && (
        <span data-error>{fetcher.data.error.message}</span>
      )}
    </>
  );
};
export default Like;
