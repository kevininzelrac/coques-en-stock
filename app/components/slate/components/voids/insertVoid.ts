import { Transforms } from "slate";
import { CustomEditor } from "../../slate";

const insertVoid = (
  editor: CustomEditor,
  src: string,
  type: "image" | "youtube" | "spotify"
) => {
  Transforms.insertNodes(editor, {
    type,
    src,
    width: 180,
    height: 180,
    float: "none",
    shape: "",
    children: [{ text: "" }],
  });
};
export default insertVoid;
