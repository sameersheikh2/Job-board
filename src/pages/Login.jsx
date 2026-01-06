import AuthLayout from "../components/auth/AuthLayout.jsx";
import LoginForm from "../components/auth/LoginForm.jsx";

const Login = () => {
  const sideContent = (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        Login
      </p>
      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
        Find your next role
      </h2>
      <p className="text-sm text-slate-200">
        Curated, signal-based roles. Save searches, manage applications, and
        stay in sync with recruiters.
      </p>
    </div>
  );

  return <AuthLayout sideContent={sideContent}>{<LoginForm />}</AuthLayout>;
};

export default Login;
