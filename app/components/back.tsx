import { useNavigate } from "@remix-run/react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function Back() {
  const to = useNavigate();

  return (
    <button onClick={() => to(-1)}>
      <MdOutlineKeyboardBackspace color="var(--primary)" />
    </button>
  );
}
