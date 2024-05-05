import { NavLink, Outlet } from "@remix-run/react";

export default function AuthNav() {
  return (
    <>
      <nav>
        <NavLink to="signin">Sign In</NavLink>•
        <NavLink to="signup">Sign Up</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
