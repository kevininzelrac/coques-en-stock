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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.dataset.tooltip;
    if (!target) return;
    to(target);
  };

  return (
    <div className="account">
      <img src={user.avatar} alt={user.firstname} width={40} />
      <span>{user.firstname}</span>
      {(isAdmin || isEditor) && <Create type="page" />}
      {isAdmin && (
        <button onClick={handleClick} data-tooltip="Menu">
          <BiSolidDirections />
        </button>
      )}
      {(isAdmin || isEditor) && (
        <button onClick={handleClick} data-tooltip="Dashboard">
          <MdDashboardCustomize />
        </button>
      )}
      <button onClick={handleClick} data-tooltip="Settings">
        <IoSettingsOutline />
      </button>

      <button onClick={handleClick} data-tooltip="SignOut">
        <LuLogOut />
      </button>
    </div>
  );
}
