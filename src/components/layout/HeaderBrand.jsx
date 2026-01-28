import { Link } from "react-router-dom";
import logo from "/logo.svg";

const HeaderBrand = () => (
  <Link to="/" className="flex items-center gap-3 font-semibold text-slate-900">
    <img src={logo} width={44} height={44} alt="Dev Hub IO" />
    <span className="leading-tight">
      <span className="block text-lg">Dev Hub IO</span>
      <span className="block text-xs text-slate-500">
        Find & post tech roles
      </span>
    </span>
  </Link>
);

export default HeaderBrand;
