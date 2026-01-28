import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../../../components/ui/button";
import RoleSelector from "./RoleSelector.jsx";
import { registerUser } from "../../features/authSlice/authSlice.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const [role, setRole] = useState("job_seeker");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isLoading = status === "loading";

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (isLoading) return;
    try {
      const response = await dispatch(
        registerUser({ ...userData, role }),
      ).unwrap();
      toast.success(response?.message || "Account created");
      setTimeout(() => navigate("/login"), 600);
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Get started
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Create your account
        </h1>
        <p className="text-slate-600">
          Join as a job seeker or recruiter. Set your preferences and start
          hiring or applying.
        </p>
      </div>

      <motion.form
        onSubmit={submitFormHandler}
        className="space-y-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="name"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Alex Johnson"
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder="••••••••"
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-slate-800"
            htmlFor="confirm"
          >
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">Role</label>
          <RoleSelector value={role} onChange={setRole} />
          <input type="hidden" name="role" value={role} />
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#0f172a] text-white hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#0c1323] cursor-pointer transition"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </motion.form>

      <p className="text-sm text-slate-600">
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
