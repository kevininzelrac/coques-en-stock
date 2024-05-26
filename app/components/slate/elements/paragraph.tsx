import { ReactNode } from "react";
import { ParagraphElement } from "../slate";

export default function Paragraph({
  element,
  attributes,
  children,
}: {
  element: ParagraphElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <p style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </p>
  );
}
