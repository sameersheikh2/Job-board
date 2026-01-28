import { useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderBrand from "./HeaderBrand.jsx";
import HeaderNavLinks from "./HeaderNavLinks.jsx";
import HeaderAuthActions from "./HeaderAuthActions.jsx";
import MobileMenu from "./MobileMenu.jsx";
import navItems from "./navItems.js";
import useMockAuth from "../../hooks/useMockAuth.js";

const Header = () => {
  const [open, setOpen] = useState(false);
  const hideHome = useLocation().pathname === "/";
  const { isAuthenticated, isLoading, user } = useMockAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[#d6c7b0] bg-white/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <HeaderBrand />

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          <HeaderNavLinks hideHome={hideHome} />
        </nav>

        <HeaderAuthActions
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          user={user}
        />

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
        isAuthenticated={isAuthenticated}
        user={user}
        isLoading={isLoading}
      />
    </header>
  );
};

export default Header;
