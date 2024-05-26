import { ReactNode } from "react";
import { H2Element } from "../slate";

export default function H2({
  element,
  attributes,
  children,
}: {
  element: H2Element;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <h2 style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </h2>
  );
}
