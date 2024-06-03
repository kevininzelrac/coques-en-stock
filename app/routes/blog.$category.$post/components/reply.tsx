import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { BiLoader, BiReply, BiSend } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import action from "../action";

const Reply = ({
  user,
  postId,
  commentId,
}: {
  user: { id: string };
  postId: string;
  commentId?: string;
}) => {
  const fetcher = useFetcher<typeof action>();
  const [display, setDisplay] = useState(false);
  let ref = useRef<HTMLInputElement>(null);
  let isLoading = fetcher.state === "loading";
  let isError = fetcher.data?.error;

  useEffect(
    function resetFormOnSuccess() {
      if (fetcher.state === "idle" && !fetcher.data?.error) {
        setDisplay(false);
        if (!ref.current) return;
        ref.current.value = "";
      }
    },
    [fetcher.state, fetcher.data]
  );

  const handleDisplay = () => setDisplay(!display);

  const handleSubmit = () => {
    if (!ref.current || !ref.current.value) return;
    let data: {
      action: string;
      type: string;
      authorId: string;
      postId: string;
      commentId?: string;
      content: string;
    } = {
      action: "create",
      type: "comment",
      authorId: user.id,
      postId,
      content: ref.current.value,
    };
    if (commentId) data.commentId = commentId;

    fetcher.submit(data, { method: "POST", encType: "application/json" });
  };

  if (display)
    return (
      <>
        <input type="text" placeholder="reply" ref={ref} required autoFocus />
        <button onClick={handleSubmit}>
          {isLoading ? <BiLoader /> : <BiSend color="#336699" />}
        </button>
        <button onClick={handleDisplay}>
          <MdCancel />
        </button>
        {isError && <span data-error>{isError.message}</span>}
      </>
    );
  else
    return (
      <button onClick={handleDisplay} data-tooltip="Reply">
        <BiReply />
      </button>
    );
};
export default Reply;
