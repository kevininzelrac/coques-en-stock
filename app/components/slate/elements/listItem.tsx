import { ReactNode } from "react";
import { ListItemElement } from "../slate";

export default function ListItem({
  element,
  attributes,
  children,
}: {
  element: ListItemElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <li style={{ textAlign: element.textAlign }} {...attributes}>
      {children}
    </li>
  );
}
