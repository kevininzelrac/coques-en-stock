import { Post, Audience as PrismaAudience } from "@prisma/client";
import { useFetcher, useLoaderData } from "@remix-run/react";
import loader from "../loader";
import usePriviledges from "~/hooks/usePriviledges";
import { GiSandsOfTime } from "react-icons/gi";
import { MdGroups, MdPublic } from "react-icons/md";

export default function Audience({
  id,
  audience,
}: {
  id: Post["id"];
  audience: PrismaAudience;
}) {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { isAdmin } = usePriviledges(user);

  const isLoading = fetcher.state !== "idle";
  const isPublic = audience === "PUBLIC";

  const handleClick = () => {
    fetcher.submit(
      {
        id,
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
