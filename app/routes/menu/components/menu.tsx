import { useContext } from "react";
import { useLoaderData } from "@remix-run/react";
import { MdDragHandle } from "react-icons/md";

import loader from "../loader";
import Context from "../context";

export default function Menu() {
  const { pages } = useLoaderData<typeof loader>();
  const ctx = useContext(Context);

  const select = (origin: string, index: number, id: string) => {
    ctx.setOrigin(origin);
    ctx.setIndex(index);
    ctx.setId(id);
  };

  const add = () => {
    if (ctx.index === undefined) return;
    const copy = [...ctx.menu];
    const draggedItem = pages[ctx.index];
    if (copy.some((item) => item.id === draggedItem.id)) return;
    copy.splice(ctx.menu.length, 0, draggedItem);
    ctx.setMenu(copy);
  };

  const reorder = (index: number) => {
    if (ctx.index === undefined) return;
    const copy = [...ctx.menu];
    const draggedItem = copy[ctx.index];
    copy.splice(ctx.index, 1);
    copy.splice(index, 0, draggedItem);
    ctx.setMenu(copy);
  };

  const isFromPages = ctx.origin === "pages";
  const isInMenu = ctx.menu.some((item) => item.id === ctx.id);

  return (
    <section
      onDragOver={(e) => {
        if (!isFromPages) return;
        if (isInMenu) return;
        e.preventDefault();
        ctx.setHover("menu");
      }}
      onDragLeave={() => ctx.setHover("")}
      onDrop={() => {
        if (!isFromPages) return;
        if (isInMenu) return;
        add();
        ctx.setHover("");
        ctx.setTarget(undefined);
        ctx.setIndex(undefined);
      }}
      //
      style={{
        border:
          ctx.hover === "menu" ? "3px solid var(--primary)" : "1px solid #ccc",
      }}
    >
      <h3>Menu</h3>
      {ctx.menu.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => select("menu", index, item.id)}
          onDragOver={(e) => {
            if (isFromPages) return;
            e.preventDefault();
            ctx.setTarget(index);
          }}
          onDrop={() => {
            if (isFromPages) return;
            reorder(index);
            ctx.setIndex(undefined);
            ctx.setTarget(undefined);
          }}
          onDragLeave={() => ctx.setTarget(undefined)}
          style={{
            borderBottom:
              ctx.target === index ? "3px solid var(--primary)" : "initial",
          }}
        >
          {item.title} <MdDragHandle />
        </div>
      ))}
    </section>
  );
}

// const {
//   menu,
//   setMenu,
//   index,
//   setIndex,
//   id,
//   setId,
//   origin,
//   setOrigin,
//   hover,
//   setHover,
//   target,
//   setTarget,
// } = useContext(Context);
