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
import { defineAbilityFor } from "./initializers/ability";
import { WebsocketMixin } from "./hooks/userWebSocket/socketPlugin";
import { abilitiesPlugin } from "@casl/vue";

(async () => {
  const appStore = await initApp();
  const reduxStore = createRedux(appStore);
  const ability = await defineAbilityFor();

  createApp(App)
    .use(reduxStore)
    .use(abilitiesPlugin, ability)
    .use(router)
    .use(ToastPlugin, { position: "top" })
    // .use(WebsocketMixin)
    // .provide("ACL_TOKEN", ability)
    .use(PrimeVue, { ripple: true })
    .use(ToastService)
    // .use(VueDraggable)
    .directive("tooltip", Tooltip)
    .mount("#app");
})();
