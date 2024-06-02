import { useState, useEffect } from "react";
import Dialog from "../dialog";
import useWindowSize from "~/hooks/useWindowSize";

export default function Img({
  src,
  alt,
  width,
  style,
  modal = false,
  onClick,
}: {
  src: HTMLImageElement["src"];
  alt?: HTMLImageElement["alt"];
  width?: HTMLImageElement["width"];
  style?: React.CSSProperties;
  modal?: boolean;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [dialog, setDialog] = useState("");
  const [isPortrait, setIsPortrait] = useState(false);
  const window = useWindowSize();

  useEffect(() => {
    const img = new Image();
    img.src = src;

    const timeout = setTimeout(() => setIsLoading(false), 5000);

    img.onload = () => {
      clearTimeout(timeout);
      setIsLoading(false);
    };
    // img.onload = () => setTimeout(() => setIsLoading(false), 1000);
    setIsPortrait(img.height > img.width);

    return () => {
      img.onload = null;
      clearTimeout(timeout);
    };
  }, [src]);

  const handleClick = (e?: React.MouseEvent) => {
    if (!modal) return;
    if (!e) {
      setDialog("");
      return;
    }
    const sourceUrl = e.currentTarget.getAttribute("src");
    if (!sourceUrl) return;
    setDialog(sourceUrl);
  };

  if (isLoading) return <div data-loading></div>;

  return (
    <>
      <img
        key={src}
        src={src}
        alt={alt}
        width={width}
        style={{ ...style, cursor: modal ? "pointer" : "default" }}
        onClick={modal ? handleClick : onClick}
      />
      {dialog && (
        <Dialog handleClick={handleClick}>
          <img
            src={dialog}
            style={{
              height: isPortrait ? "100%" : "auto",
              maxHeight: window.height - 100,
              width: isPortrait ? "auto" : "100%",
              maxWidth: window.width - 100,
            }}
            alt={alt}
          />
        </Dialog>
      )}
    </>
  );
}
