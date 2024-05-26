import { Editor, Element } from "slate";
import { CustomEditor } from "../../slate";

const isActive = (editor: CustomEditor, type: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
  });
  return !!match;
};
export default isActive;
