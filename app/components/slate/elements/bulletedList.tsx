import { ReactNode } from "react";
import { BulletedListElement } from "../slate";

export default function BulletedList({
  element,
  attributes,
  children,
}: {
  element: BulletedListElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <ul style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </ul>
  );
}
