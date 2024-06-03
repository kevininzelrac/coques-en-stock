import { SerializeFrom } from "@remix-run/node";
import { NavLink } from "@remix-run/react";

import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaHome, FaUser } from "react-icons/fa";
import { IoMdMail, IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { SiBlogger } from "react-icons/si";

import { loader } from "~/root";

export default function Nav({
  user,
}: {
  user: SerializeFrom<typeof loader>["user"];
}) {
  return (
    <nav>
      <NavLink to="/">
        <FaHome size="25" />
      </NavLink>
      <NavLink to="contact">
        <IoMdMail size="25" />
      </NavLink>
      <NavLink to="tel:0680782110">
        <BsFillTelephoneFill size="25" />
      </NavLink>
      <NavLink
        to="https://www.facebook.com/Neo495Sailing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook size="25" />
      </NavLink>
      <NavLink to="blog">
        <SiBlogger size="25" />
      </NavLink>
      {user ? (
        <>
          <NavLink to="settings">
            <IoMdSettings size="25" />
          </NavLink>
          <NavLink to="signout">
            <LuLogOut size="25" />
          </NavLink>
        </>
      ) : (
        <NavLink to="signin">
          <FaUser size="25" />
        </NavLink>
      )}
    </nav>
  );
}
