import { Undo, Redo } from "./history";
import RemoveNode from "./removeNode";
import ColorPicker from "./colorPicker";
import Mark from "./marks";
import Block from "./blocks";
import TextAlign from "./textAlign";
import { ToggleLink } from "./links";
import Void from "./voids";

export default function Toolbar() {
  return (
    <nav className="toolbar">
      <Undo />
      <Redo />

      <RemoveNode />

      <ColorPicker />

      <Mark type="bold" />
      <Mark type="italic" />
      <Mark type="underline" />

      <Block type="paragraph" />
      <Block type="blockquote" />
      <Block type="code" />

      <Block type="h2" />
      <Block type="h3" />
      <Block type="h4" />

      <Block type="ol" />
      <Block type="ul" />

      <TextAlign textAlign="left" />
      <TextAlign textAlign="center" />
      <TextAlign textAlign="right" />
      <TextAlign textAlign="justify" />

      <ToggleLink />

      <Void type="image" />
      <Void type="youtube" />
      <Void type="spotify" />
    </nav>
  );
}
