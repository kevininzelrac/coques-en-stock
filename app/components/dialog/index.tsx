import { useState } from "react";
import { createPortal } from "react-dom";

export default function Dialog({
  handleClick,
  duration = 250,
  children,
}: {
  handleClick: () => void;
  duration?: number;
  children: React.ReactNode;
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      handleClick();
      setIsExiting(false);
    }, duration);
  };

  return createPortal(
    <dialog
      style={{
        animation: isExiting
          ? `dialog-fadeOut ${duration}ms forwards`
          : `dialog-fadeIn ${duration}ms forwards`,
      }}
    >
      <span className="opaque" onMouseDown={handleClose}></span>
      <div>
        <button className="close" onMouseDown={handleClose}>
          x
        </button>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
