import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuard = () => {
  const { isLoggedIn, isVerified, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isOnboardingRoute = location.pathname === "/profile-onboarding";
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";
  const isProfileEditRoute = location.pathname === "/profile-edit";
  const isProfileViewRoute = location.pathname === "/profile";
  const isProfileRoute = isProfileEditRoute || isProfileViewRoute;
  const isRecruiterDashboardRoute =
    location.pathname === "/recruiter-dashboard";

  if (isAuthRoute && isLoggedIn) {
    if (user?.role === "recruiter") {
      return <Navigate to="/recruiter-dashboard" replace />;
    }
    return <Navigate to={isVerified ? "/" : "/profile-onboarding"} replace />;
  }

  if (isOnboardingRoute) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (user?.role === "recruiter") {
      return <Navigate to="/recruiter-dashboard" replace />;
    }

    if (isVerified) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  }

  if (isRecruiterDashboardRoute) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    if (user?.role !== "recruiter") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  if (isProfileRoute && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && !isVerified && !isProfileEditRoute && !isOnboardingRoute) {
    if (user?.role === "recruiter") {
      if (!isRecruiterDashboardRoute) {
        return <Navigate to="/recruiter-dashboard" replace />;
      }
      return <Outlet />;
    }
    return <Navigate to="/profile-onboarding" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
