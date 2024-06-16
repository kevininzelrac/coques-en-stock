import { useContext } from "react";
import { BiTrash } from "react-icons/bi";
import Context from "../context";

export default function Trash() {
  const ctx = useContext(Context);

  const trash = () => {
    if (ctx.index === undefined) return;
    const copy = [...ctx.menu];
    copy.splice(ctx.index, 1);
    ctx.setMenu(copy);
  };

  return (
    <BiTrash
      onDragOver={(e) => {
        if (ctx.origin !== "menu") return;
        e.preventDefault();
        ctx.setHover("trash");
      }}
      onDragLeave={() => ctx.setHover("")}
      onDrop={() => {
        if (ctx.origin !== "menu") return;
        trash();
        ctx.setHover("");
        ctx.setTarget(undefined);
        ctx.setIndex(undefined);
      }}
      color={ctx.hover === "trash" ? "crimson" : "initial"}
      size={32}
    />
  );
}

// const { menu, setMenu, index, setIndex, origin, hover, setHover, setTarget } = useContext(Context);
