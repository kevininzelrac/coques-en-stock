import { ReactNode } from "react";
import { H3Element } from "../slate";

export default function H3({
  element,
  attributes,
  children,
}: {
  element: H3Element;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <h3 style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </h3>
  );
}
