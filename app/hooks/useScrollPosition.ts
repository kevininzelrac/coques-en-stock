import { useState, useEffect, useRef, useCallback } from "react";

const useScrollPosition = () => {
  const [isTop, setIsTop] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback(() => {
    const position = ref.current ? ref.current.getBoundingClientRect().top : 0;
    const isAtTop = position > -10 && position < 10;

    const isAtBottom =
      window.innerHeight + window.scrollY > document.body.offsetHeight;
    setIsBottom(isAtBottom);
    if (isAtBottom) return;

    setIsTop(isAtTop);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const debouncedOnScroll = debounce(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updatePosition);
    }, 5);

    window.addEventListener("scroll", debouncedOnScroll);
    window.addEventListener("touchmove", debouncedOnScroll);

    return () => {
      window.removeEventListener("scroll", debouncedOnScroll);
      window.removeEventListener("touchmove", debouncedOnScroll);
    };
  }, []);

  return { ref, isTop, isBottom };
};

export default useScrollPosition;

const debounce = (
  func: (...args: any[]) => void,
  wait: number
): ((...args: any[]) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: any[]) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

// const updatePosition = () => {
//   const elementPos = ref.current
//     ? ref.current.getBoundingClientRect().top
//     : 0;

//   const isAtBottom =
//     window.innerHeight + window.scrollY >= document.body.offsetHeight;
//   setAtBottom(isAtBottom);

//   if (!isAtBottom) {
//     setIsTop(elementPos > -5 && elementPos < 5);
//   }
// };
