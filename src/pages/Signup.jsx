import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="space-y-4 lg:w-1/2">
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

      <div className="lg:w-2/5">
        <div className="rounded-2xl border border-[#d8cab8] bg-[#fffaf3]/90 p-6 shadow-lg backdrop-blur sm:p-8">
          <form className="space-y-4">
            <div className="space-y-1">
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
                placeholder="Alex Johnson"
                className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm focus:border-[#c5b59d] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
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
                className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm focus:border-[#c5b59d] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
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
                className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm focus:border-[#c5b59d] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
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
                className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm focus:border-[#c5b59d] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-semibold text-slate-800"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full rounded-lg border border-[#d8cab8] px-3 py-2 text-slate-900 shadow-sm focus:border-[#c5b59d] focus:outline-none"
                defaultValue="seeker"
              >
                <option value="seeker">Job seeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#1f2a44] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#172034]"
            >
              Create account
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
