import type { MetaFunction } from "@remix-run/node";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiSailsdotjs } from "react-icons/si";

import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Coques en Stock" },
    { name: "description", content: "Chantier Naval Alain Inzelrac" },
  ];
};

export default function Index() {
  return (
    <>
      <header>
        <h1>COQUES EN STOCK</h1>
        <h2>Chantier Naval Alain Inzelrac</h2>
        <SiSailsdotjs size="50" />
      </header>
      <main>
        <h4>En pleine refonte !</h4>
        <p>
          Notre site se métamorphose pour vous offrir une expérience encore plus
          palpitante.
        </p>
        <p>Préparez-vous à hisser de nouvelles voiles virtuelles.</p>
        <p>En attendant, restez connectés!</p>
      </main>
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
    </>
  );
}
