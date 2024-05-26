import { useFetcher } from "@remix-run/react";
import { User, Post } from "@prisma/client";
import usePriviledges from "~/hooks/usePriviledges";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";

export default function Status({
  user,
  post,
}: {
  user: {
    id: User["id"];
    role: User["role"];
  };
  post: {
    id: Post["id"];
    status: Post["status"];
  };
}) {
  const fetcher = useFetcher();
  const { isAdmin } = usePriviledges(user);

  const isLoading = fetcher.state !== "idle";
  const isDraft = post.status === "DRAFT";

  const handleClick = () => {
    fetcher.submit(
      {
        id: post.id,
        status: isDraft ? "PUBLISHED" : "DRAFT",
      },
      { method: "PATCH", encType: "application/json" }
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isAdmin}
      style={{
        cursor: isAdmin ? "pointer" : "default",
      }}
    >
      {isLoading ? (
        <GiSandsOfTime />
      ) : isDraft ? (
        <MdOutlineUnpublished color="crimson" />
      ) : (
        <MdPublishedWithChanges color="green" />
      )}
    </button>
  );
}
