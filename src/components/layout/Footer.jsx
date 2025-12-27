import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-[#c0b196] bg-[#0f172a] text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-lg font-semibold text-white">JobBoard</div>
          <p className="text-sm text-slate-300">
            Connecting talented developers with great teams.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-200">
          <Link to="#" className="transition hover:text-white">
            Privacy
          </Link>
          <Link to="#" className="transition hover:text-white">
            Terms
          </Link>
          <Link to="#" className="transition hover:text-white">
            Contact
          </Link>
          <Link to="#" className="transition hover:text-white">
            Careers
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
