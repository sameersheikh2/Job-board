import { Link } from "react-router-dom";
import logo from "/logo.svg";

const OnboardingHeader = () => (
  <header className="border-b border-[#e6dccd] bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-5xl items-center px-4 py-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        aria-label="Home"
        className="inline-flex items-center"
      >
        <img src={logo} width={44} height={44} alt="Dev Hub IO" />
      </Link>
    </div>
  </header>
);

export default OnboardingHeader;
