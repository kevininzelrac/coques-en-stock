import { LuDelete } from "react-icons/lu";
import { Transforms } from "slate";
import { useSlate } from "slate-react";

export default function RemoveNode() {
  const editor = useSlate();
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        Transforms.removeNodes(editor);
      }}
      data-tooltip="delete block"
    >
      <LuDelete />
    </button>
  );
}
