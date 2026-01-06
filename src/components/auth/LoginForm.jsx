import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const LoginForm = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Welcome back
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Login to continue
        </h1>
        <p className="text-slate-600">
          Access your saved searches, manage applications, and pick up where you
          left off.
        </p>
      </div>

      <motion.form
        className="space-y-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
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
            placeholder="••••••••"
            className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm transition focus:border-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0f172a]/20"
            required
          />
        </div>
        <Button
          className="w-full bg-[#0f172a] text-white hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#0c1323]"
          type="submit"
        >
          Login
        </Button>
      </motion.form>

      <p className="text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-slate-900 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
