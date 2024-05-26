import { useState } from "react";
import { Transforms } from "slate";
import { useSlate } from "slate-react";
import insertVoid from "./insertVoid";
import isVoidUrl from "./isVoidUrl";
import isActive from "./isActive";
import Upload from "./upload";
import Icon from "../icon";

export default function Void({
  type,
}: {
  type: "image" | "youtube" | "spotify";
}) {
  const editor = useSlate();
  const { isVoid } = editor;
  editor.isVoid = (element) => (element.type === type ? true : isVoid(element));

  const [display, setDisplay] = useState(false);

  const handleClick = () => setDisplay(!display);

  return (
    <>
      {display ? <Upload handleClick={handleClick} /> : null}
      <button
        className={isActive(editor, type) ? "active" : undefined}
        data-tooltip={type}
        onMouseDown={(e) => {
          e.preventDefault();
          if (isActive(editor, type)) {
            Transforms.removeNodes(editor);
          } else {
            if (type === "image") {
              setDisplay(true);
            } else {
              const src = window.prompt("Enter the " + type + " URL");
              if (!src) return alert("Enter a correct " + type + " url");

              const verifiedSrc = isVoidUrl(src, type);
              if (!verifiedSrc)
                return alert("Enter a correct " + type + " url");

              src && insertVoid(editor, verifiedSrc, type);
            }
          }
        }}
      >
        {type.includes("image") ? (
          isActive(editor, type) ? (
            <Icon type="delete" />
          ) : (
            <Icon type="image" />
          )
        ) : (
          <Icon type={type} />
        )}
      </button>
    </>
  );
}
