import { createContext } from "react";

type index = number | undefined;
type id = string;
type origin = string;
type target = number | undefined;
type hover = string;

const Context = createContext<{
  menu: { id: string; title: string }[];
  setMenu: (value: { id: string; title: string }[]) => void;
  isDraft: boolean;
  id: id;
  setId: (value: id) => void;
  index: index;
  setIndex: (value: index) => void;
  origin: origin;
  setOrigin: (value: origin) => void;
  target: target;
  setTarget: (value: target) => void;
  hover: hover;
  setHover: (value: hover) => void;
}>({
  menu: [],
  setMenu: () => {},
  isDraft: false,
  index: undefined,
  setIndex: () => {},
  id: "",
  setId: () => {},
  origin: "",
  setOrigin: () => {},
  target: undefined,
  setTarget: () => {},
  hover: "",
  setHover: () => {},
});

export default Context;
