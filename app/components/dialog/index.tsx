import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function DialogV2({
  handleClick,
  duration = 250,
  children,
}: {
  handleClick: () => void;
  duration?: number;
  children: React.ReactNode;
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleClick();
      setIsExiting(false);
    }, duration);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return createPortal(
    <dialog
      style={{
        animation: isExiting
          ? `dialog-fadeOut ${duration}ms forwards`
          : `dialog-fadeIn ${duration}ms forwards`,
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        handleClose();
      }}
    >
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close" onMouseDown={handleClose}>
          x
        </button>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
