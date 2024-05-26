import { type RenderLeafProps } from "slate-react";
import {
  BlockQuote,
  BulletedList,
  Code,
  H2,
  H3,
  H4,
  Image,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Spotify,
  Youtube,
} from "./elements";

export const RenderElement = (props: any) => {
  switch (props.element.type) {
    case "paragraph":
      return <Paragraph {...props} />;

    case "code":
      return <Code {...props} />;

    case "h2":
      return <H2 {...props} />;

    case "h3":
      return <H3 {...props} />;

    case "h4":
      return <H4 {...props} />;

    case "blockquote":
      return <BlockQuote {...props} />;

    case "ul":
      return <BulletedList {...props} />;

    case "ol":
      return <OrderedList {...props} />;

    case "li":
      return <ListItem {...props} />;

    case "link":
      return <Link {...props} />;
    case "image":
      return <Image {...props} />;
    case "youtube":
      return <Youtube {...props} />;
    case "spotify":
      return <Spotify {...props} />;
    default:
      return <Paragraph {...props} />;
  }
};

export const RenderLeaf = ({ children, attributes, leaf }: RenderLeafProps) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.color)
    children = <span style={{ color: leaf.color }}>{children}</span>;
  return <span {...attributes}>{children}</span>;
};
