import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "#" },
  { label: "For Recruiters", to: "#" },
  { label: "About", to: "/about" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

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
          {navItems.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="transition hover:text-[#1f2933]"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-[#1f2933]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-[#1f2933] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18202e]"
          >
            Sign Up
          </Link>
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

      <div
        className={`border-t border-[#d6c7b0] bg-white lg:hidden transition-all duration-200 ease-out ${
          open ? "opacity-100 visible max-h-96" : "opacity-0 invisible max-h-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-2 py-2 transition hover:bg-[#f1ede6] ${
                    isActive ? "text-[#1f2933]" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-md border border-[#d6c7b0] px-4 py-2 text-center text-sm font-semibold text-slate-800 transition hover:bg-[#f1ede6]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-md bg-[#1f2933] px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#18202e]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
