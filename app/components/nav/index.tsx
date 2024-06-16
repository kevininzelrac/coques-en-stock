import useScrollPosition from "~/hooks/useScrollPosition";
import { SiSailsdotjs } from "react-icons/si";

import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Index({
  user,
  menu,
}: {
  user: { id: string; role: string; firstname: string; avatar: string } | null;
  menu: { id: string; title: string }[] | null;
}) {
  const { ref, isTop } = useScrollPosition();

  return (
    <nav
      ref={ref}
      style={{
        backgroundColor: isTop ? "ghostwhite" : "transparent",
        boxShadow: isTop ? "var(--boxShadow)" : "none",
      }}
    >
      {isTop && (
        <SiSailsdotjs
          style={{
            transform: "scaleX(-1)",
            position: "absolute",
            left: "1rem",
            top: "auto",
          }}
        />
      )}

      <Desktop user={user} menu={menu} />
      <Mobile user={user} menu={menu} />
    </nav>
  );
}
