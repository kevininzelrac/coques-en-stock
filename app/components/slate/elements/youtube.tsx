import { ReactNode, useEffect, useRef, useState } from "react";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { Transforms } from "slate";
import Resize from "../components/resize";
import { useLocation } from "@remix-run/react";
import { YoutubeElement } from "../slate";
import Tools from "../components/tools";

export default function Youtube({
  attributes,
  children,
  element,
}: {
  element: YoutubeElement;
  attributes: object;
  children: ReactNode;
}) {
  const { breakLine, float, shape, height, width } = element;
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);
  const { pathname }: any = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const ref = useRef(null);
  const [size, setSize]: any = useState(() => {
    const initialWidth = width && typeof width === "number" ? width : 180;
    const initialHeight = height && typeof height === "number" ? height : 180;

    Transforms.setNodes(
      editor,
      {
        width: initialWidth,
        height: initialHeight,
      },
      { at: path }
    );

    return {
      width: initialWidth,
      height: initialHeight,
    };
  });

  useEffect(() => {
    const defaultWidth = 600;
    const defaultHeight = 337;

    if (!width || typeof width !== "number") {
      setSize({
        width: defaultWidth,
        height: defaultHeight,
      });

      Transforms.setNodes(
        editor,
        {
          width: defaultWidth,
          height: defaultHeight,
        },
        { at: path }
      );
    } else {
      setSize({
        width: width,
        height: height,
      });
    }
  }, []);

  return (
    <>
      {isLoading ? <div data-loading></div> : null}

      {breakLine && <div style={{ clear: "both" }}></div>}
      <div
        ref={ref}
        contentEditable={false}
        className="youtube"
        style={{
          boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : " none ",
          float: float || "none",
          clear: float ? "none" : "both",
          borderRadius: shape ? "50%" : "",
          shapeOutside: shape ? "circle(50%)" : "",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          height: "fit-content",
          maxWidth: "100%",
        }}
      >
        <iframe
          src={element.src}
          {...attributes}
          title="YouTube video player"
          width={size.width}
          height={size.height}
          allowFullScreen={false}
          onLoad={() => setIsLoading(false)}
          style={{
            pointerEvents: pathname.includes("editor") ? "none" : "auto",
            position: "relative",
            borderRadius: "inherit",
            cursor: "text",
            border: "none",
          }}
        />
        {children}
        <Tools />
        {size.width && <Resize size={size} setSize={setSize} />}
      </div>
    </>
  );
}
