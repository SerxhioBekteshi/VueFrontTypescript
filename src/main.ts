import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import PrimeVue from "primevue/config";
import ToastPlugin, { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/styles.scss";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import { createRedux } from "./store/redux/storePlugin";
import initApp from "./utils/functions";
import { WebsocketMixin } from "./hooks/userWebSocket/socketPlugin";

(async () => {
  const appStore = await initApp();
  const reduxStore = createRedux(appStore);

  const app = createApp(App);
  app.use(reduxStore);
  app.use(router);
  app.use(ToastPlugin, { position: "top" });
  app.use(PrimeVue, { ripple: true });
  app.use(ToastService);
  app.directive("tooltip", Tooltip);
  app.mount("#app");

  WebsocketMixin.install(app);

  // createApp(App)
  //   .use(reduxStore)
  //   .use(router)
  //   .use(ToastPlugin, { position: "top" })
  //   .use(WebsocketMixin)
  //   .use(PrimeVue, { ripple: true })
  //   .use(ToastService)
  //   // .use(VueDraggable)
  //   .directive("tooltip", Tooltip)
  //   // .provide("$socket", socket)
  //   .mount("#app")
})();
