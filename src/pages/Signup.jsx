import AuthLayout from "../components/auth/AuthLayout.jsx";
import RegisterForm from "../components/auth/RegisterForm.jsx";

const Signup = () => {
  const sideContent = (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        Join the marketplace
      </p>
      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
        Build your profile or your team
      </h2>
      <p className="text-sm text-slate-200">
        Tailored for job seekers and recruiters—signal-first, fast, and
        beautifully simple.
      </p>
    </div>
  );

  return <AuthLayout sideContent={sideContent}>{<RegisterForm />}</AuthLayout>;
};

export default Signup;
