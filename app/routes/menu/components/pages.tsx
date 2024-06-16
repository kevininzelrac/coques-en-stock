import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { MdDragHandle } from "react-icons/md";

import loader from "../loader";
import Context from "../context";

export default function Pages() {
  const { pages } = useLoaderData<typeof loader>();
  const ctx = useContext(Context);

  const select = (origin: string, index: number, id: string) => {
    ctx.setOrigin(origin);
    ctx.setIndex(index);
    ctx.setId(id);
  };

  return (
    <section>
      <h3>Pages</h3>
      {pages.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => select("pages", index, item.id)}
        >
          {item.title}
          <MdDragHandle />
        </div>
      ))}
    </section>
  );
}
