import { useFetcher } from "@remix-run/react";
import { User } from "@prisma/client";
import usePriviledges from "~/hooks/usePriviledges";
import { GiSandsOfTime } from "react-icons/gi";
import { MdGroups, MdPublic } from "react-icons/md";

export default function Audience({
  user,
  data,
}: {
  user: {
    id: User["id"];
    role: User["role"];
  };
  data: {
    id: string;
    audience: string;
    type: {
      title: string;
    };
  };
}) {
  const fetcher = useFetcher();
  const { isAdmin } = usePriviledges(user);

  const isLoading = fetcher.state !== "idle";
  const isPublic = data.audience === "PUBLIC";

  const handleClick = () => {
    fetcher.submit(
      {
        action: "audience",
        type: data.type.title,
        id: data.id,
        audience: isPublic ? "PRIVATE" : "PUBLIC",
      },
      { method: "PATCH", encType: "application/json" }
    );
  };

  return (
    <button
      onClick={handleClick}
      data-tooltip={data.audience}
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
