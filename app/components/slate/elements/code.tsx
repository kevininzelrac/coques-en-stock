import { ReactNode } from "react";
import { CodeElement } from "../slate";

export default function Code({
  element,
  attributes,
  children,
}: {
  element: CodeElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <code style={{ textAlign: element.textAlign }} {...attributes}>
      <pre>{children}</pre>
    </code>
  );
}
