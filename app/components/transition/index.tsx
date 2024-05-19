import { Children, cloneElement } from "react";
import { useNavigation } from "@remix-run/react";

export default function Transition({
  duration = 160,
  children,
}: {
  duration?: number;
  children: React.ReactElement;
}): JSX.Element {
  const { state } = useNavigation();

  const clone = Children.map(children, (child) => {
    if (!child) return children;
    return cloneElement(child, {
      style: {
        animationName: state === "idle" ? "fadeIn" : "fadeOut",
        animationDuration: `${duration}ms`,
        animationTimingFunction: "ease-in-out",
        animationFillMode: "forwards",
        animationIterationCount: "1",
      },
    });
  });

  return <>{clone}</>;
}
