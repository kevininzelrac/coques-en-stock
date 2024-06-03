import { useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import idb from "~/services/idb.client";
import Dialog from "../dialog";

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

export default function Delete({
  id,
  type,
  redirect = "",
}: {
  id: string;
  type: string;
  redirect?: string;
}) {
  const [display, setDisplay] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const { pathname } = useLocation();
  const fetcher = useFetcher<fetcherType>();
  const isLoading = fetcher.state === "loading";
  const isIdle = fetcher.state === "idle";

  const handleClick = () => {
    setDone(false);
    setDisplay(!display);
    setError("");
  };

  const handleSubmit = () => {
    fetcher.submit(
      { action: "delete", type, id, redirect },
      { method: "DELETE", encType: "application/json" }
    );
  };

  useEffect(() => {
    (async () => {
      if (isLoading) setDone(true);

      if (fetcher.data?.error) setError(fetcher.data?.error.message);

      if (isIdle && done && !error) {
        await idb.delete("slate", pathname);
        handleClick();
      }
    })();
  }, [fetcher.data]);

  return (
    <>
      {display && (
        <Dialog handleClick={handleClick}>
          <h3>are you sure ?</h3>
          {error && <span data-error>{error}</span>}
          <button data-primary onClick={handleSubmit}>
            {isLoading ? <GiSandsOfTime /> : <MdDeleteForever />}
          </button>
        </Dialog>
      )}
      <button data-tooltip="delete" onClick={handleClick}>
        <MdDeleteForever />
      </button>
    </>
  );
}
