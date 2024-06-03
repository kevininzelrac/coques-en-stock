import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { useEffect, useState } from "react";
import { RenderElement, RenderLeaf } from "./render";
import { useLocation } from "@remix-run/react";
import { withHistory } from "slate-history";
import Toolbar from "./components/toolbar";
import Shortcuts from "./shortcuts";

export default function Editor({
  children,
  setIsDraft,
  color = "#000000",
  get,
  put,
  remove,
}: {
  children: string;
  setIsDraft: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  get: (store: string, key: string) => Promise<any>;
  put: (store: string, key: string, value: any) => void;
  remove: (store: string, key: string) => void;
}) {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  editor.color = color;
  editor.get = get;
  editor.put = put;
  editor.remove = remove;

  const [initialValue, setInitialValue] = useState<Descendant[] | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const draft = await get("slate", pathname);
      if (draft) {
        setInitialValue(JSON.parse(draft));
        setIsDraft(true);
      } else if (children.includes("type")) {
        setInitialValue(JSON.parse(children));
      } else {
        setInitialValue([
          {
            type: "paragraph",
            textAlign: "left",
            children: [{ text: children, color: color }],
          },
        ]);
      }
    })();
  }, []);

  const onChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAstChange) {
      if (JSON.stringify(value) !== children) {
        setIsDraft(true);
        put("slate", pathname, JSON.stringify(value));
      } else {
        setIsDraft(false);
        remove("slate", pathname);
      }
    }
  };

  if (!initialValue) {
    return <div>Loading...</div>;
  }

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Toolbar />
      <Editable
        autoFocus
        className="slate"
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        onKeyDown={(e) => {
          Shortcuts(e, editor);
        }}
      />
    </Slate>
  );
}
