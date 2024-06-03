import { Transforms } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import { MouseEvent } from "react";
import Icon from "./icon";

export default function Resize({
  size,
  setSize,
}: {
  size: {
    width: number;
    height: number;
  };
  setSize: any;
}) {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();

  const handleResize = (e: MouseEvent<HTMLButtonElement>) => {
    let newSize = size;
    const startSize = size;
    const startPosition = {
      y: e.pageY,
      x: e.pageX,
    };

    const onMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      newSize = {
        width: startSize.width - startPosition.x + e.pageX,
        height: e.shiftKey
          ? startSize.width - startPosition.x + e.pageX
          : startSize.height - startPosition.y + e.pageY,
      };
      setSize(newSize);
    };

    const onMouseUp = () => {
      Transforms.setNodes(editor, {
        width: newSize.width,
        height: newSize.height,
      });
      document.body.removeEventListener("mousemove", onMouseMove as any);
    };

    document.body.addEventListener("mousemove", onMouseMove as any);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  if (!selected || !focused) return null;
  return (
    <button className="resize" style={styles.resize} onMouseDown={handleResize}>
      <Icon type="resize" />
      {/* <div>{size.width}</div> */}
      {/* <div>{size.height}</div> */}
    </button>
  );
}
const resize: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "nwse-resize",
};
const styles = {
  resize,
};
