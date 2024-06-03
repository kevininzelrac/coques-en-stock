import { useFetcher } from "@remix-run/react";
import { User } from "@prisma/client";
import usePriviledges from "~/hooks/usePriviledges";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";

export default function Status({
  user,
  data,
}: {
  user: {
    id: User["id"];
    role: User["role"];
  };
  data: {
    id: string;
    status: string;
    type: {
      title: string;
    };
  };
}) {
  const fetcher = useFetcher();
  const { isAdmin } = usePriviledges(user);

  const isLoading = fetcher.state !== "idle";
  const isDraft = data.status === "DRAFT";

  const handleClick = () => {
    fetcher.submit(
      {
        action: "status",
        type: data.type.title,
        id: data.id,
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
        <MdOutlineUnpublished color="orange" />
      ) : (
        <MdPublishedWithChanges color="green" />
      )}
    </button>
  );
}
