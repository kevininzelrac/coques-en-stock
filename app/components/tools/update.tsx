import { useFetcher, useLocation } from "@remix-run/react";
import { Post } from "@prisma/client";
import { GiSandsOfTime } from "react-icons/gi";
import { IoSaveSharp } from "react-icons/io5";
import idb from "~/services/idb.client";

const Update = ({
  post,
  isDraft,
  setIsDraft,
}: {
  post: {
    id: Post["id"];
  };
  isDraft: boolean;
  setIsDraft: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== "idle";

  const handleClick = async () => {
    fetcher.submit(
      {
        id: post.id,
        content: await idb.get("slate", pathname),
      },
      { method: "PATCH", encType: "application/json" }
    );
    await idb.delete("slate", pathname);
    setIsDraft(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isDraft}
      style={{
        cursor: isDraft ? "pointer" : "default",
        border: isDraft ? "1px solid var(--primary)" : "none",
      }}
    >
      {isLoading ? <GiSandsOfTime /> : <IoSaveSharp />}
    </button>
  );
};
export default Update;
