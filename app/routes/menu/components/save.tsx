import { useFetcher } from "@remix-run/react";
import { BiSave } from "react-icons/bi";
import { useContext } from "react";

import action from "../action";
import Context from "../context";

export default function Save() {
  const fetcher = useFetcher<typeof action>();
  const ctx = useContext(Context);

  const save = () =>
    fetcher.submit(ctx.menu, { method: "POST", encType: "application/json" });

  return (
    <BiSave
      onClick={save}
      color={ctx.isDraft ? "crimson" : "var(--anthracite)"}
      style={{ cursor: ctx.isDraft ? "pointer" : "default" }}
    />
  );
}
