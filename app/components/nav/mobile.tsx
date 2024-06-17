import { NavLink } from "@remix-run/react";

import { FaFacebook, FaHome, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaBlogger } from "react-icons/fa";

import Dropdown from "./dropdown";
import Account from "./account";
import Menu from "./menu";

export default function Nav({
  user,
  menu,
}: {
  user: { id: string; role: string; firstname: string; avatar: string } | null;
  menu: { id: string; title: string }[] | null;
}) {
  return (
    <section className="mobile">
      <NavLink to="/" data-tooltip="Home">
        <FaHome />
      </NavLink>

      <NavLink to="blog" data-tooltip="Blog">
        <FaBlogger />
      </NavLink>

      <NavLink to="contact" data-tooltip="Contact">
        <IoMdMail />
      </NavLink>

      <NavLink to="tel:0680782110" data-tooltip="Phone">
        <BsFillTelephoneFill />
      </NavLink>

      <NavLink
        to="https://www.facebook.com/Neo495Sailing"
        target="_blank"
        rel="noopener noreferrer"
        data-tooltip="Facebook"
      >
        <FaFacebook />
      </NavLink>

      {!user ? (
        <NavLink to="signin" data-tooltip="Sign In">
          <FaUser />
        </NavLink>
      ) : null}

      {user || (menu && menu.length) ? (
        <Dropdown>
          {menu && menu.length ? (
            <div className="pages">
              <Menu menu={menu} />
            </div>
          ) : null}
          {user ? <Account user={user} /> : null}
        </Dropdown>
      ) : null}
    </section>
  );
}
