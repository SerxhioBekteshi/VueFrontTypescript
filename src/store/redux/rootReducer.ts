import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user.store";
import navigationStore from "../stores/navigation.store";
import paymentStore from "../stores/payment.store";

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  payment: paymentStore.reducer,
});

export default rootReducer;
