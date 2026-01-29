import { useNavigate } from "react-router-dom";
import HeaderProfileMenu from "./HeaderProfileMenu.jsx";
import { InteractiveHoverButton } from "../../../components/ui/interactive-hover-button.jsx";

const HeaderAuthActions = ({ isAuthenticated, isLoading, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="hidden items-center gap-2 lg:flex">
      {isAuthenticated ? (
        <HeaderProfileMenu
          user={user}
          isLoading={isLoading}
          onLogout={onLogout}
        />
      ) : (
        <>
          <InteractiveHoverButton
            onClick={() => navigate("/login")}
            className="min-w-28 border-[#d6c7b0] px-3 py-2 text-slate-800 hover:border-[#1f2933]"
          >
            Login
          </InteractiveHoverButton>
          <InteractiveHoverButton
            onClick={() => navigate("/signup")}
            className="min-w-28 border-[#1f2933] bg-[#1f2933] px-3 py-2 text-white hover:border-[#0c1323] hover:bg-[#0c1323]"
          >
            Sign Up
          </InteractiveHoverButton>
        </>
      )}
    </div>
  );
};

export default HeaderAuthActions;
