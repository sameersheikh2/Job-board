import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")).render(
  <Theme>
    <Provider store={store}>
      <App />
    </Provider>
  </Theme>,
);
