import { ReactNode } from "react";
import { H4Element } from "../slate";

export default function H4({
  element,
  attributes,
  children,
}: {
  element: H4Element;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <h4 style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </h4>
  );
}
