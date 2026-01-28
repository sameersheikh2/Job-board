import { NavLink } from "react-router-dom";
import navItems from "./navItems.js";

const linkClass = (active) =>
  `relative cursor-pointer transition hover:text-[#1f2933] ${
    active ? "text-[#1f2933]" : "text-slate-700"
  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#1f2933] after:transition after:duration-200 hover:after:scale-x-100`;

const HeaderNavLinks = ({ hideHome }) => (
  <>
    {!hideHome && (
      <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
        Home
      </NavLink>
    )}
    {navItems.map(({ label, to }) => (
      <NavLink
        key={label}
        to={to}
        className={({ isActive }) => linkClass(isActive)}
      >
        {label}
      </NavLink>
    ))}
  </>
);

export default HeaderNavLinks;
