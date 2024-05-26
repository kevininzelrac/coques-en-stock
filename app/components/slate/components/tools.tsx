import { useFocused, useSelected, useSlate } from "slate-react";
import Float from "./float";
import Shape from "./shape";
import { Transforms } from "slate";
import { BsTrash } from "react-icons/bs";

export default function Tools() {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div
      className="tools"
      style={{
        display: selected && focused ? "flex" : "none",
      }}
    >
      <Float float="left" />
      <Float float="right" />
      <Shape name="circle" />
      <button
        onMouseDown={() => Transforms.removeNodes(editor)}
        data-tooltip="remove picture"
      >
        <BsTrash />
      </button>
    </div>
  );
}
