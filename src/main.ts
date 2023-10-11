import { createApp } from "vue";
import App from "./App.vue";
// import { configureStore } from '@reduxjs/toolkit';
import router from "./router/index";
import PrimeVue from "primevue/config";
import ToastPlugin, { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/styles.scss";
import axiosInit from "./initializers/axios";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import { createRedux } from "./store/redux/storePlugin";
// import { store } from "./store/redux/configurations";
import initApp from "./utils/functions";
// import  VueDraggable  from "vuedraggable";

(async () => {
  const appStore = await initApp();
  const reduxStore = createRedux(appStore);

  createApp(App)
    .use(reduxStore)
    .use(router)
    .use(ToastPlugin, { position: "top" })
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    // .use(VueDraggable)
    .directive("tooltip", Tooltip)
    .mount("#app");

  await axiosInit(useToast);
})();
