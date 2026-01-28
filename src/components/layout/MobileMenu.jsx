import { NavLink } from "react-router-dom";
import MobileMenuAuth from "./MobileMenuAuth.jsx";

const MobileMenu = ({ open, hideHome, navItems, onClose, ...authProps }) => {
  const itemClass = (isActive) =>
    `rounded-md px-2 py-2 transition hover:bg-[#f1ede6] ${
      isActive ? "text-[#1f2933]" : ""
    } cursor-pointer`;

  return (
    <div
      className={`border-t border-[#d6c7b0] bg-white/50 lg:hidden transition-all duration-200 ease-out ${
        open ? "opacity-100 visible max-h-96" : "opacity-0 invisible max-h-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
          {!hideHome && (
            <NavLink
              to="/"
              end
              onClick={onClose}
              className={({ isActive }) => itemClass(isActive)}
            >
              Home
            </NavLink>
          )}
          {navItems.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) => itemClass(isActive)}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <MobileMenuAuth {...authProps} onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileMenu;
