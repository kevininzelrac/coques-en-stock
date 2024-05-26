import { ReactNode } from "react";
import { LinkElement } from "../slate";

export default function Link({
  element,
  attributes,
  children,
}: {
  element: LinkElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <a
      href={
        ["http://", "https://"].includes(element.href)
          ? element.href
          : "http://" + element.href
      }
      target="_blank"
      rel="noreferrer noopener"
      style={{ textAlign: element.textAlign }}
      {...attributes}
    >
      {children}
    </a>
  );
}
