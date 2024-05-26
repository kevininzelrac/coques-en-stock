import { Editor } from "slate";
import { useSlate } from "slate-react";
import { CustomEditor } from "../slate";
import Icon from "./icon";

const isActive = (editor: CustomEditor, type: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean>;
  return marks ? marks[type] === true : false;
};

export const toggleMark = (editor: CustomEditor, type: string) => {
  isActive(editor, type)
    ? Editor.removeMark(editor, type)
    : Editor.addMark(editor, type, true);
};

export default function Mark({ type }: { type: string }) {
  const editor = useSlate();
  return (
    <button
      className={isActive(editor, type) ? "active" : undefined}
      data-tooltip={type}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, type);
      }}
    >
      <Icon type={type} />
    </button>
  );
}
