import { configureStore } from "@reduxjs/toolkit";
import { setUser } from "../stores/user.store";
import rootReducer from "./rootReducer";
import reduxManager from "../../utils/reduxManager";


const initStore = (currentUser: any) => {
  const appStore = configureStore({
    reducer: rootReducer,
  });
  reduxManager.dispatch = appStore.dispatch;
  if (currentUser) appStore.dispatch(setUser(currentUser));
  return appStore;
};

export default initStore;
