// import { configureStore } from "@reduxjs/toolkit";
import { setUser } from "../stores/user.store";
// import rootReducer from "./rootReducer";
import reduxManager from "../../utils/reduxManager";
import store from "./configurations";

const initStore = (currentUser: any) => {
  reduxManager.dispatch = store.dispatch;
  if (currentUser) store.dispatch(setUser(currentUser));
  return store;
};

export default initStore;
