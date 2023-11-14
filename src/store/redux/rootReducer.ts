import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user.store";
import navigationStore from "../stores/navigation.store";

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
});

export default rootReducer;
