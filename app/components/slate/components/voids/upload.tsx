import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useSlate } from "slate-react";
import insertVoid from "./insertVoid";
import Dialog from "~/components/dialog";
import Img from "~/components/img";

const Upload = ({ handleClick }: { handleClick: () => void }) => {
  const fetcher = useFetcher<any>();
  const editor = useSlate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [gallerie, setGallerie] = useState([]);

  useEffect(() => {
    fetcher.load("/api/gallerie");
    if (!fetcher.data) return;

    if (fetcher.data.gallerie) {
      setGallerie(fetcher.data.gallerie);
      return;
    }

    if (fetcher.data.key) {
      insertVoid(editor, fetcher.data.key, "image");
      handleClick();
      return;
    }
  }, [fetcher.data]);

  const handleUpload = () => {
    if (!inputRef.current || !inputRef.current.files) return;
    fetcher.submit(
      { key: inputRef.current.files[0].name },
      { method: "POST", encType: "application/json" }
    );
    editor.put(
      "images",
      inputRef.current.files[0].name,
      inputRef.current.files[0]
    );
  };

  return (
    <Dialog handleClick={handleClick}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          type="file"
          name="image"
          accept="image/*"
          required
        />
        <button data-primary onMouseDown={handleUpload}>
          Upload
        </button>
        {fetcher.state === "submitting" ? (
          <label>{fetcher.state}...</label>
        ) : null}
        {fetcher.data?.error ? (
          <label style={{ color: "crimson" }}>
            {fetcher.data?.error.message}
          </label>
        ) : null}
      </form>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "0.3rem",
        }}
      >
        {gallerie?.map((item: any) => (
          <Img
            style={{ height: 50, cursor: "pointer" }}
            key={item.Key}
            src={item.url}
            onClick={() => {
              insertVoid(editor, item.url, "image");
              handleClick();
            }}
          />
        ))}
      </div>
    </Dialog>
  );
};

export default Upload;

// useEffect(() => {
//   (async () => {
//     if (
//       !fetcher.data ||
//       !fetcher.data.url ||
//       !inputRef.current ||
//       !inputRef.current.files
//     )
//       return;
//     try {
//       setLoading(true);
//       // await fetch(fetcher.data.url, {
//       //   method: "PUT",
//       //   headers: { "Content-Type": "multipart/form-data" },
//       //   body: inputRef.current.files[0],
//       // });
//       insertVoid(editor, fetcher.data.key, "image");
//       handleClick();
//     } catch (error: any) {
//       console.error(error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   })();
// }, [fetcher.data]);
