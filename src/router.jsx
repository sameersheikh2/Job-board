import { Suspense, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Recruiters = lazy(() => import("./pages/Recruiters.jsx"));

const fallback = (
  <div className="min-h-screen flex items-center justify-center text-slate-500">
    Loading...
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
        path: "recruiters",
        element: lazyElement(Recruiters),
      },
      {
        path: "profile",
        element: lazyElement(Profile),
      },
    ],
  },
]);

export default router;
