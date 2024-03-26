import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import PrimeVue from "primevue/config";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
// import "primevue/resources/themes/lara-light-indigo/theme.css";
// import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "@/assets/styles.scss";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import initApp from "./utils/functions";
import { defineAbilityFor } from "./initializers/ability";
import { abilitiesPlugin } from "@casl/vue";
import vuexPlugin from "./store/vuexStore/vuexPlugin";

// (async () => {
//   // const appStore = await initApp();
//   // const reduxStore = createRedux(appStore);
//   await axiosInit(useToast);
//   const ability = await defineAbilityFor();

//   createApp(App)
//     .use(vuexPlugin)
//     .use(abilitiesPlugin, ability)
//     .use(router)
//     .use(ToastPlugin, { position: "top" })
//     // .use(WebsocketMixin)
//     // .provide("ACL_TOKEN", ability)
//     .use(PrimeVue, { ripple: true })
//     .use(ToastService)
//     // .use(VueDraggable)
//     .directive("tooltip", Tooltip)
//     .mount("#app");
// })();

const app = createApp(App);

// Initialize Vuex store and CASL abilities
async function initializeApp() {
  await initApp();
  // await axiosInit(useToast);
  vuexPlugin.install(app);
  const ability = await defineAbilityFor();
  app.use(vuexPlugin);
  app.use(abilitiesPlugin, ability);
  app.use(router);
  app.use(ToastPlugin, { position: "top" });
  app.use(PrimeVue, { ripple: true });
  app
    .use(ToastService)
    // .use(VueDraggable)
    .directive("tooltip", Tooltip);
  app.mount("#app");
}

initializeApp();
