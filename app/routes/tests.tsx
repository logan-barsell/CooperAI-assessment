import { NavLink, Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <div className={"p-8 flex flex-col"}>
      <NavLink
        to={"/"}
        className={"bg-blue-950 text-white px-4 py-3 rounded-full mb-4 w-fit"}
      >
        Home
      </NavLink>
      <Outlet />
    </div>
  );
}
