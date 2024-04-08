import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import PrimeVue from "primevue/config";
import "@/assets/styles.scss";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import initApp from "./utils/functions";
import { defineAbilityFor } from "./initializers/ability";
import { abilitiesPlugin } from "@casl/vue";
import vuexPlugin from "./store/vuexStore/vuexPlugin";
import Ripple from "primevue/ripple";
import { useStore } from "vuex";

const app = createApp(App);

async function initializeApp() {
  await initApp();

  const ability = await defineAbilityFor();
  app.use(ToastService);
  app.use(PrimeVue, { ripple: true });
  app.use(vuexPlugin);
  app.use(abilitiesPlugin, ability);
  app.use(router);
  // app.use(ToastPlugin, { position: "top" });
  // .use(VueDraggable)
  app.directive("tooltip", Tooltip);
  app.directive("ripple", Ripple);
  app.mount("#app");
}

initializeApp();
