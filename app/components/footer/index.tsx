import { Link } from "@remix-run/react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer>
      <div>
        <Link to="mailto:agnesinzelrac@me.com">
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
      </div>
    </footer>
  );
}
