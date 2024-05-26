import { Editor, Element, Range, Transforms } from "slate";
import { useSlate } from "slate-react";
import { CustomEditor, LinkElement } from "../slate";
import Icon from "./icon";

const isActive = (editor: CustomEditor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === "link",
  });
  return !!match;
};

const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => Element.isElement(n) && n.type === "link",
  });
};

const wrapLink = (editor: CustomEditor) => {
  const { isInline } = editor;
  editor.isInline = (element) =>
    element.type === "link" ? true : isInline(element);

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const href = window.prompt("Enter the URL of the link:");
  if (!href) return;

  const link: LinkElement = {
    type: "link",
    href,
    children: isCollapsed ? [{ text: href }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const ToggleLink = () => {
  const editor = useSlate();

  return (
    <button
      className={isActive(editor) ? "active" : undefined}
      data-tooltip="link"
      onMouseDown={(e) => {
        e.preventDefault();
        isActive(editor) ? unwrapLink(editor) : wrapLink(editor);
      }}
    >
      {isActive(editor) ? <Icon type="unlink" /> : <Icon type="link" />}
    </button>
  );
};
