import { App } from "vue";
import { WebSocketProvider } from "./test2";

const WebSocketPlugin = {
  install: (app: App) => {
    WebSocketProvider(app);
  },
};

export default WebSocketPlugin;
