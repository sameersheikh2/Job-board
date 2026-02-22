import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./router.jsx";

const App = () => {
  const [showBanner, setShowBanner] = useState(() => {
    const dismissed = localStorage.getItem("demoBannerDismissed");
    return dismissed !== "true";
  });

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("demoBannerDismissed", "true");
  };

  return (
    <>
      {showBanner && (
        <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-xs text-amber-800 flex items-center gap-2">
          <span>⚡</span>
          <span>
            Free tier demo • Backend may take <strong>30–60 seconds</strong> to
            wake up after inactivity
          </span>

          <a
            target="_blank"
            href="https://medium.com/@python-javascript-php-html-css/understanding-latency-in-free-backend-hosting-on-render-com-d1ce9c2571de"
            className="underline hover:no-underline ml-auto"
          >
            Learn why →
          </a>

          <button
            onClick={dismissBanner}
            className="ml-3 text-amber-800 hover:text-amber-900 transition-colors text-lg leading-none"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;
