import { Post, Status as PrismaStatus } from "@prisma/client";
import { useFetcher, useLoaderData } from "@remix-run/react";
import loader from "../loader";
import usePriviledges from "~/hooks/usePriviledges";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";

export default function Status({
  id,
  status,
}: {
  id: Post["id"];
  status: PrismaStatus;
}) {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { isAdmin } = usePriviledges(user);

  const isLoading = fetcher.state !== "idle";
  const isDraft = status === "DRAFT";

  const handleClick = () => {
    fetcher.submit(
      {
        id,
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
