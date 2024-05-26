import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { ReactNode, useRef, useState } from "react";
import { Transforms } from "slate";
import { ImageElement } from "../slate";
import Resize from "../components/resize";
import Tools from "../components/tools";

export default function Image({
  attributes,
  children,
  element,
}: {
  element: ImageElement;
  attributes: object;
  children: ReactNode;
}) {
  const { breakLine, float, shape, height, width } = element;
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);
  const [isLoading, setIsLoading] = useState(true);

  const ref: any = useRef(null);

  const [size, setSize]: any = useState(() => {
    if (!width || typeof width !== "number") {
      Transforms.setNodes(editor, { width: 180, height: 180 }, { at: path });
      return { width: 180, height: 180 };
    } else {
      return {
        width: width,
        height: height,
      };
    }
  });

  return (
    <>
      {isLoading ? <div data-loading></div> : null}
      {breakLine && <div style={{ clear: "both" }}></div>}
      <div
        ref={ref}
        contentEditable={false}
        className="image"
        style={{
          width: size.width,
          boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : " none ",
          float: float || "none",
          clear: float ? "none" : "both",
          borderRadius: shape ? "50%" : "",
          shapeOutside: shape ? "circle(50%)" : "",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //margin: "20px",
          padding: "6px",
          //zIndex: "1",
          //width: pxTo100(size.width, ref?.current?.parentElement?.offsetWidth),
          /* height: size.height ? size.height + "px" : "auto", */
          /* height: "clamp('46%,'" + size.height + "px, 100%", */
        }}
      >
        <img
          src={element?.src}
          onLoad={() => setIsLoading(false)}
          style={{
            position: "relative",
            borderRadius: "inherit",
            width: "100%",
            height: "100%",
            cursor: "text",
          }}
          {...attributes}
          alt="page img"
        />
        {children}
        <Tools />
        {size.width && <Resize size={size} setSize={setSize} />}
      </div>
    </>
  );
}
