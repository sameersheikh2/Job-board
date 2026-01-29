import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./router.jsx";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;
