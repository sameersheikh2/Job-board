import { Suspense, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import AuthGuard from "./components/auth/AuthGuard.jsx";
import { Spinner } from "../components/ui/spinner.jsx";
import { Button } from "../components/ui/button.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit.jsx"));
const Recruiters = lazy(() => import("./pages/Recruiters.jsx"));
const Jobs = lazy(() => import("./pages/Jobs.jsx"));
const JobDetails = lazy(() => import("./pages/JobDetails.jsx"));
const ProfileOnboarding = lazy(() => import("./pages/ProfileOnboarding.jsx"));
const RecruiterDashboard = lazy(() => import("./pages/RecruiterDashboard.jsx"));
const JobPipelinePage = lazy(() => import("./pages/JobPipelinePage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const fallback = (
  <div className="min-h-screen flex items-center justify-center text-slate-500">
    <Button disabled size="lg">
      <Spinner size="6" />
      Loading...
    </Button>
  </div>
);

const lazyElement = (Component) => {
  const LazyComponent = Component;
  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => (
  <div className="flex min-h-screen flex-col bg-linear-to-b from-[#f6f5f3] via-white to-[#efede8] text-slate-900">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: lazyElement(Landing),
          },
          {
            path: "login",
            element: lazyElement(Login),
          },
          {
            path: "signup",
            element: lazyElement(Signup),
          },
          {
            path: "about",
            element: lazyElement(About),
          },
          {
            path: "jobs",
            element: lazyElement(Jobs),
          },
          {
            path: "jobs/:jobId",
            element: lazyElement(JobDetails),
          },
          {
            path: "recruiters",
            element: lazyElement(Recruiters),
          },
          {
            path: "recruiter-dashboard",
            element: lazyElement(RecruiterDashboard),
          },
          {
            path: "recruiter/pipeline/:jobId",
            element: lazyElement(JobPipelinePage),
          },
          {
            path: "profile",
            element: lazyElement(Profile),
          },
          {
            path: "profile-edit",
            element: lazyElement(ProfileEdit),
          },
        ],
      },
      {
        path: "profile-onboarding",
        element: lazyElement(ProfileOnboarding),
      },
      {
        path: "*",
        element: lazyElement(NotFound),
      },
    ],
  },
]);

export default router;
