import { createStore } from "vuex";
import userModule from "./userModules";

const store = createStore({
  modules: {
    user: userModule,
    // other modules...
  },
});

export default store;
