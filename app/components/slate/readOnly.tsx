import { Slate, Editable, withReact } from "slate-react";
import { createEditor, type Descendant } from "slate";
import { useMemo, useState } from "react";
import { RenderElement, RenderLeaf } from "./render";

export default function ReadOnly({ children }: any) {
  const initialValue: Descendant[] = useMemo(() => {
    if (children.includes("type")) {
      return JSON.parse(children);
    } else {
      return [
        {
          type: "paragraph",
          textAlign: "left",
          children: [{ text: children }],
        },
      ];
    }
  }, [children]);

  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div className="slate">
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          readOnly
          renderElement={RenderElement}
          renderLeaf={RenderLeaf}
        />
      </Slate>
    </div>
  );
}
