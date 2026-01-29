import { Link } from "react-router-dom";
import { Skeleton } from "../../../components/ui/skeleton.jsx";

const MobileMenuAuth = ({
  isAuthenticated,
  user,
  isLoading,
  onClose,
  onLogout,
}) => {
  if (!isAuthenticated) {
    return (
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
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-[#e2d6c5] bg-white px-3 py-2">
        {isLoading ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
        )}
        {isLoading ? (
          <Skeleton className="mt-2 h-4 w-48" />
        ) : (
          <p className="text-xs text-slate-500">{user?.email}</p>
        )}
      </div>
      <Link
        to="/profile"
        onClick={onClose}
        className="block rounded-md border border-[#d6c7b0] px-4 py-2 text-center text-sm font-semibold text-slate-800 transition hover:bg-[#f1ede6]"
      >
        Profile
      </Link>
      <button
        type="button"
        onClick={() => {
          onLogout?.();
          onClose();
        }}
        className="w-full rounded-md bg-[#1f2933] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#18202e]"
      >
        Log out
      </button>
    </div>
  );
};

export default MobileMenuAuth;
