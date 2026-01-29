import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireProfileCompletion = () => {
  const { isLoggedIn, isVerified } = useSelector((state) => state.auth);
  const location = useLocation();
  const isOnboardingRoute = location.pathname === "/profile-onboarding";
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";
  const isProfileEditRoute = location.pathname === "/profile-edit";
  const isProfileViewRoute = location.pathname === "/profile";
  const isProfileRoute = isProfileEditRoute || isProfileViewRoute;

  if (isAuthRoute && isLoggedIn) {
    return <Navigate to={isVerified ? "/" : "/profile-onboarding"} replace />;
  }

  if (isOnboardingRoute) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (isVerified) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  }

  if (isProfileRoute && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && !isVerified && !isProfileEditRoute && !isOnboardingRoute) {
    return <Navigate to="/profile-onboarding" replace />;
  }

  return <Outlet />;
};

export default RequireProfileCompletion;
