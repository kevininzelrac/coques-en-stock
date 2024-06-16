import { useNavigate } from "@remix-run/react";

import { MdDashboardCustomize } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

import usePriviledges from "~/hooks/usePriviledges";
import Create from "../tools/create";
import { BiSolidDirections } from "react-icons/bi";

export default function Account({
  user,
}: {
  user: { id: string; role: string; firstname: string; avatar: string };
}) {
  const { isAdmin, isEditor } = usePriviledges(user);
  const to = useNavigate();

  return (
    <div className="account">
      <img src={user.avatar} alt={user.firstname} width={40} />
      <span>{user.firstname}</span>
      {(isAdmin || isEditor) && <Create type="page" />}
      {isAdmin && <BiSolidDirections onClick={() => to("menu")} />}
      {(isAdmin || isEditor) && (
        <MdDashboardCustomize onClick={() => to("Dashboard")} />
      )}
      <IoSettingsOutline onClick={() => to("Settings")} />

      <LuLogOut onClick={() => to("Signout")} />
    </div>
  );
}
