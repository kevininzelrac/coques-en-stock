import { useFetcher } from "@remix-run/react";
import { User, Post } from "@prisma/client";
import usePriviledges from "~/hooks/usePriviledges";
import { GiSandsOfTime } from "react-icons/gi";
import { MdGroups, MdPublic } from "react-icons/md";

export default function Audience({
  user,
  post,
}: {
  user: {
    id: User["id"];
    role: User["role"];
  };
  post: {
    id: Post["id"];
    audience: Post["audience"];
  };
}) {
  const fetcher = useFetcher();
  const { isAdmin } = usePriviledges(user);

  const isLoading = fetcher.state !== "idle";
  const isPublic = post.audience === "PUBLIC";

  const handleClick = () => {
    fetcher.submit(
      {
        id: post.id,
        audience: isPublic ? "PRIVATE" : "PUBLIC",
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
      ) : isPublic ? (
        <MdPublic color="#336699" />
      ) : (
        <MdGroups color="orange" />
      )}
    </button>
  );
}
