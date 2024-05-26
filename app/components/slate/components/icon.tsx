import {
  MdUndo,
  MdRedo,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdAddLink,
  MdLinkOff,
  MdImage,
  MdHideImage,
} from "react-icons/md";

import { LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";

import { FaSpotify, FaYoutube, FaRegCircle } from "react-icons/fa";

import { BsTextareaResize } from "react-icons/bs";

const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case "undo":
      return <MdUndo />;
    case "redo":
      return <MdRedo />;
    case "bold":
      return <MdFormatBold />;
    case "italic":
      return <MdFormatItalic />;
    case "underline":
      return <MdFormatUnderlined />;
    case "code":
      return <MdCode />;
    case "h2":
      return <LuHeading2 />;
    case "h3":
      return <LuHeading3 />;
    case "h4":
      return <LuHeading4 />;
    case "paragraph":
      return <Paragraph />;
    case "blockquote":
      return <MdFormatQuote />;
    case "ol":
      return <MdFormatListNumbered />;
    case "ul":
      return <MdFormatListBulleted />;
    case "left":
      return <MdFormatAlignLeft />;
    case "center":
      return <MdFormatAlignCenter />;
    case "right":
      return <MdFormatAlignRight />;
    case "justify":
      return <MdFormatAlignJustify />;
    case "link":
      return <MdAddLink />;
    case "unlink":
      return <MdLinkOff />;
    case "image":
      return <MdImage color="#336699" />;
    case "delete":
      return <MdHideImage color="#336699" />;
    case "youtube":
      return <FaYoutube color="#FF0000" />;
    case "spotify":
      return <FaSpotify color="#1DB954" />;
    case "circle":
      return <FaRegCircle />;
    case "resize":
      return <BsTextareaResize />;
    default:
      return type;
  }
};
export default Icon;

const Paragraph = () => (
  <svg viewBox="0 0 20 20">
    <text x="5" y="15" fontFamily="Verdana" fontSize="40" fill="currentColor">
      P
    </text>
  </svg>
);
