import { ReactNode } from "react";
import { OrderedListElement } from "../slate";

export default function OrderedList({
  element,
  attributes,
  children,
}: {
  element: OrderedListElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <ol style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </ol>
  );
}
