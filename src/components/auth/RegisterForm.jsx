import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Spinner } from "../../../components/ui/spinner";
import RoleSelector from "./RoleSelector.jsx";
import { registerUser } from "../../features/authSlice/authSlice.jsx";
import { showError, showSuccess } from "../../utils/toast.js";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const [role, setRole] = useState("job_seeker");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLoading = status === "loading";

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }
    if (
      !userData?.firstName.trim() ||
      !userData?.lastName.trim() ||
      !userData?.email.trim() ||
      !userData?.password.trim() ||
      !userData?.confirmPassword.trim()
    ) {
      showError("Please fill in all fields");
      return;
    }
    if (isLoading) return;
    try {
      const fullName = `${userData.firstName} ${userData.lastName}`.trim();
      const response = await dispatch(
        registerUser({
          name: fullName,
          email: userData.email,
          password: userData.password,
          role,
        }),
      ).unwrap();
      showSuccess(response?.message || "Account created");
      setTimeout(() => navigate("/login"), 600);
    } catch (error) {
      showError(error || "Registration failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Get started
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Create your account
        </h1>
        <p className="text-slate-650">
          Join as a job seeker or recruiter. Set your preferences and start
          hiring or applying.
        </p>
      </div>

      <form onSubmit={submitFormHandler} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="firstName"
            >
              First name
              <span className="ml-1 text-rose-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              placeholder="Alex"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-950 shadow-xs transition focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-semibold text-slate-800"
              htmlFor="lastName"
            >
              Last name
              <span className="ml-1 text-rose-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              placeholder="Johnson"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-955 shadow-xs transition focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="email"
          >
            Email
            <span className="ml-1 text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-955 shadow-xs transition focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="password"
          >
            Password
            <span className="ml-1 text-rose-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-955 shadow-xs transition focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="confirm"
          >
            Confirm password
            <span className="ml-1 text-rose-500">*</span>
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-955 shadow-xs transition focus:border-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            Role
            <span className="ml-1 text-rose-500">*</span>
          </label>
          <RoleSelector value={role} onChange={setRole} />
          <input type="hidden" name="role" value={role} />
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-slate-900 text-white hover:bg-slate-800 cursor-pointer transition"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="text-sm text-slate-500 pt-2 border-t border-slate-100">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-slate-900 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
