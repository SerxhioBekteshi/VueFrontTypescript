import { createStore } from "vuex";
// import userModule from "./userModules";
import { userStore } from "./user";
import { paymentStore } from "./payments";
import { notificationStore } from "./notifications";
// import { userStore } from "./user";

const store = createStore({
  modules: {
    user: userStore,
    payment: paymentStore,
    notification: notificationStore,
  },
});

export default store;
