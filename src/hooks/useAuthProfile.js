import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profileSlice/profileSlice.jsx";

const useAuthProfile = () => {
  const dispatch = useDispatch();
  const { user, isVerified, status, error, isLoggedIn } = useSelector(
    (state) => state.auth,
  );
  const {
    profile,
    status: profileStatus,
    error: profileError,
  } = useSelector((state) => state.profile || {});
  const isAuthenticated = Boolean(isLoggedIn);
  const isLoading = status === "loading" || profileStatus === "loading";

  useEffect(() => {
    if (isLoggedIn && user?.role === "job_seeker") {
      dispatch(fetchProfile());
    }
  }, [dispatch, isLoggedIn, user?.role]);

  return {
    isVerified,
    status,
    error: error || profileError,
    isAuthenticated,
    isLoading,
    user,
    profile,
    appliedJobs: [],
  };
};

export default useAuthProfile;
