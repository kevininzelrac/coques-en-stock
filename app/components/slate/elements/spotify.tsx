import { ReactNode, useEffect, useRef, useState } from "react";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { Transforms } from "slate";
import Resize from "../components/resize";
import { useLocation } from "@remix-run/react";
import { YoutubeElement } from "../slate";
import Tools from "../components/tools";

export default function Spotify({
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
    if (!width || typeof width !== "number") {
      Transforms.setNodes(editor, { width: 180, height: 180 }, { at: path });
      return { width: 180, height: 180 };
    } else {
      return { width, height };
    }
  });

  useEffect(() => {
    if (!width || typeof width !== "number") {
      setSize({ width: 600, height: 337 });
      Transforms.setNodes(editor, { width: 600, height: 337 }, { at: path });
    } else {
      setSize({ width: width, height: height });
    }
  }, []);

  return (
    <>
      {isLoading ? <div data-loading></div> : null}

      {breakLine && <div style={{ clear: "both" }}></div>}
      <div
        ref={ref}
        contentEditable={false}
        className="spotify"
        style={{
          boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : " none ",
          float: float || "none",
          clear: float ? "none" : "both",
          borderRadius: shape ? "50%" : "",
          shapeOutside: shape ? "circle(50%)" : "",
          //
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
          title="Spotify player"
          width={size.width}
          height={size.height}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
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
