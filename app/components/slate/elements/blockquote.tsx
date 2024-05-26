import { ReactNode } from "react";
import { BlockQuoteElement } from "../slate";

export default function BlockQuote({
  element,
  attributes,
  children,
}: {
  element: BlockQuoteElement;
  attributes: object;
  children: ReactNode;
}) {
  return (
    <blockquote
      style={{
        marginLeft: "10px",
        paddingLeft: "10px",
        borderLeft: "3px solid lightGray",
        textAlign: element.textAlign,
      }}
      {...attributes}
    >
      <i>{children}</i>
    </blockquote>
  );
}
