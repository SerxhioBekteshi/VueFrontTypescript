import { App, createApp } from "vue";
import store from "./storeModules";

const vuexPlugin = {
  install: (app: App) => {
    app.use(store);
  },
};

export default vuexPlugin;
