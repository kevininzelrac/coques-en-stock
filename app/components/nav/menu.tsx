import { NavLink } from "@remix-run/react";

export default function Menu({
  menu,
}: {
  menu: { id: string; title: string }[];
}) {
  return menu.map(({ id, title }) => (
    <NavLink key={id} to={title}>
      {title}
    </NavLink>
  ));
}
