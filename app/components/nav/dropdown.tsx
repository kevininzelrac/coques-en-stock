import { useMemo, useState } from "react";
import { useNavigation } from "@remix-run/react";
import { CgClose, CgMenuGridO } from "react-icons/cg";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState(false);
  const [animate, setAnimate] = useState(false);
  const nav = useNavigation();

  const handleClick = () => {
    if (display) {
      setAnimate(false);
      setTimeout(() => setDisplay(false), 200);
    } else {
      setDisplay(true);
      setTimeout(() => setAnimate(true), 5);
    }
  };

  useMemo(() => nav.state !== "idle" && display && handleClick(), [nav.state]);

  return (
    <div className="menu">
      {display ? (
        <>
          <CgClose onClick={handleClick} />
          <div
            className="children"
            style={{
              opacity: animate ? "1" : "0",
              marginTop: animate ? "0" : "-100%",
            }}
          >
            {children}
          </div>
        </>
      ) : (
        <CgMenuGridO onClick={handleClick} />
      )}
    </div>
  );
}
