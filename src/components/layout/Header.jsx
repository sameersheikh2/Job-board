import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu.jsx";
import { InteractiveHoverButton } from "../../../components/ui/interactive-hover-button.jsx";

const navItems = [
  { label: "Jobs", to: "/jobs" },
  { label: "For Recruiters", to: "/recruiters" },
  { label: "About", to: "/about" },
];

const linkClass = (active) =>
  `relative cursor-pointer transition hover:text-[#1f2933] ${
    active ? "text-[#1f2933]" : "text-slate-700"
  } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#1f2933] after:transition after:duration-200 hover:after:scale-x-100`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const hideHome = useLocation().pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-[#d6c7b0] bg-white/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-slate-900"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1f2933] text-lg font-bold text-white">
            JB
          </span>
          <span className="leading-tight">
            <span className="block text-lg">JobBoard</span>
            <span className="block text-xs text-slate-500">
              Find & post tech roles
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {!hideHome && (
            <NavLink
              to="/"
              end
              className={({ isActive }) => linkClass(isActive)}
            >
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
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <InteractiveHoverButton
            onClick={() => (window.location.href = "/login")}
            className="min-w-[112px] border-[#d6c7b0] px-3 py-2 text-slate-800 hover:border-[#1f2933]"
          >
            Login
          </InteractiveHoverButton>
          <InteractiveHoverButton
            onClick={() => (window.location.href = "/signup")}
            className="min-w-[112px] border-[#1f2933] bg-[#1f2933] px-3 py-2 text-white hover:border-[#0c1323] hover:bg-[#0c1323]"
          >
            Sign Up
          </InteractiveHoverButton>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-md border border-[#d6c7b0] p-2 text-slate-700 lg:hidden transition"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition ${open ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <MobileMenu
        open={open}
        hideHome={hideHome}
        navItems={navItems}
        onClose={() => setOpen(false)}
      />
    </header>
  );
};

export default Header;
