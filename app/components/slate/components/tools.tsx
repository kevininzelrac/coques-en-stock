import { useFocused, useSelected, useSlate } from "slate-react";
import Float from "./float";
import Shape from "./shape";
import { Transforms } from "slate";
import { BsTrash } from "react-icons/bs";

export default function Tools() {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();

  if (!selected || !focused) return null;
  return (
    <div className="tools" style={styles.tools}>
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

const tools: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  backgroundColor: "transparent",
};

const styles = {
  tools,
};
