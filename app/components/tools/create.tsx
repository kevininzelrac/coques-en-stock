import { useEffect, useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { BiPlus, BiSave } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
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

export default function Create({
  type,
  category = "default",
}: {
  type: string;
  category?: string;
}) {
  const fetcher = useFetcher<fetcherType>();
  const isIdle = fetcher.state === "idle";
  const isLoading = fetcher.state === "loading";
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setDone(false);
    setDisplay(!display);
    setError("");
  };

  const handleSubmit = () => {
    if (!inputRef.current?.value) return;
    fetcher.submit(
      { action: "create", type, category, title: inputRef.current?.value },
      { method: "POST", encType: "application/json" }
    );
  };

  useEffect(() => {
    if (isLoading) setDone(true);

    if (fetcher.data?.error) {
      inputRef.current?.focus();
      setError(fetcher.data?.error.message);
      return;
    }
    if (isIdle && done) handleClick();
  }, [fetcher, isLoading]);

  return (
    <>
      <BiPlus onClick={handleClick} data-tooltip={"add " + type} />
      {display && (
        <Dialog handleClick={handleClick}>
          <h3>
            Create a new {type} entry {category ? "in " + category : null}
          </h3>

          {error && <span data-error>{error}</span>}
          <input ref={inputRef} required autoFocus />
          <button data-primary onClick={handleSubmit}>
            {isLoading ? <GiSandsOfTime /> : <BiSave />}
          </button>
        </Dialog>
      )}
    </>
  );
}
