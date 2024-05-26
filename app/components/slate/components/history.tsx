import { useSlate } from "slate-react";
import Icon from "./icon";

export const Undo = () => {
  const editor = useSlate();
  return (
    <button
      data-tooltip="undo"
      onMouseDown={(e) => {
        e.preventDefault();
        editor.undo();
      }}
    >
      <Icon type="undo" />
    </button>
  );
};

export const Redo = () => {
  const editor = useSlate();
  return (
    <button
      data-tooltip="redo"
      onMouseDown={(e) => {
        e.preventDefault();
        editor.redo();
      }}
    >
      <Icon type="redo" />
    </button>
  );
};
