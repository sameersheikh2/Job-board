import store from "../store/store";
import { openComingSoon } from "../features/uiSlice/uiSlice";
import { COMING_SOON_ENABLED } from "./featureFlags";

export const showComingSoon = () => {
  if (COMING_SOON_ENABLED) {
    store.dispatch(openComingSoon());
  }
};
