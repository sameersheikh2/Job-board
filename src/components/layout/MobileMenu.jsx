import { NavLink, Link } from "react-router-dom";

const MobileMenu = ({ open, hideHome, navItems, onClose }) => {
  const itemClass = (isActive) =>
    `rounded-md px-2 py-2 transition hover:bg-[#f1ede6] ${
      isActive ? "text-[#1f2933]" : ""
    } cursor-pointer`;

  return (
    <div
      className={`border-t border-[#d6c7b0] bg-white lg:hidden transition-all duration-200 ease-out ${
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
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            onClick={onClose}
            className="flex-1 rounded-md border border-[#d6c7b0] px-4 py-2 text-center text-sm font-semibold text-slate-800 transition hover:bg-[#f1ede6]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={onClose}
            className="flex-1 rounded-md bg-[#1f2933] px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#18202e]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
