import { NavLink } from "@remix-run/react";

import { FaFacebook, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";

import Menu from "./menu";
import Dropdown from "./dropdown";
import Account from "./account";

export default function Desktop({
  user,
  menu,
}: {
  user: { id: string; role: string; firstname: string; avatar: string } | null;
  menu: { id: string; title: string }[] | null;
}) {
  return (
    <section className="desktop">
      <NavLink to="/">Home</NavLink>
      {menu && menu.length ? <Menu menu={menu} /> : null}

      <NavLink to="blog">Blog</NavLink>
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
      {user ? (
        <Dropdown>
          <Account user={user} />
        </Dropdown>
      ) : (
        <NavLink to="signin">
          <FaUser />
        </NavLink>
      )}
    </section>
  );
}
