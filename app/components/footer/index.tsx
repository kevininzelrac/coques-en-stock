import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaHome, FaUser } from "react-icons/fa";
import { IoMdMail, IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { SiProteus } from "react-icons/si";

import { loader } from "~/root";

export default function Footer({
  user,
}: {
  user: SerializeFrom<typeof loader>["user"];
}) {
  return (
    <footer>
      <div>
        <Link to="/">
          <FaHome size="25" />
        </Link>
        <Link to="contact">
          <IoMdMail size="25" />
        </Link>
        <Link to="tel:0680782110">
          <BsFillTelephoneFill size="25" />
        </Link>
        <Link
          to="https://www.facebook.com/Neo495Sailing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size="25" />
        </Link>
        {user ? (
          <>
            <Link to="priviledges">
              <SiProteus size="25" />
            </Link>
            <Link to="settings">
              <IoMdSettings size="25" />
            </Link>
            <Link to="signout">
              <LuLogOut size="25" />
            </Link>
          </>
        ) : (
          <Link to="signin">
            <FaUser size="25" />
          </Link>
        )}
      </div>
    </footer>
  );
}
