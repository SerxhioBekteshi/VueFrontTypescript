import {
  App,
  Ref,
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
} from "vue";

// Import the required Vue 3 plugin for your WebSocket logic
import { io, Socket } from "socket.io-client";
import store from "@/store/vuexStore/storeModules";

// Define your WebSocketContext key for providing and injecting the WebSocket instance
const WebsocketContextKey = Symbol();

// Define the WebSocketProvider component
const installWebSocket = (app: App) => {
  app.component("WebSocketProvider", {
    name: "WebSocketProvider",
    props: {},
    setup(slots) {
      // const WebsocketContextKey = "WebSocketProvider";
      const connection = ref<any>(null);
      let socket: Socket | null = null;
      onMounted(() => {
        const userState: any = store?.state;
        const user = userState?.user?.user;

        if (user.value?.role) {
          socket = io("http://localhost:1112", {
            autoConnect: false,
            transports: ["websocket", "polling"],
            query: {
              userId: user.value.id,
              adminId: user.value.id,
              role: user.value.role,
            },
          });
          if (!socket.active) {
            try {
              socket.connect();
              connection.value = socket;
              provide(WebsocketContextKey, connection.value);
            } catch (error) {
              console.error("WebsocketProvider.start", error);
            }
          }
        }
      });
      onUnmounted(() => {
        if (socket && socket.active) {
          try {
            socket.disconnect();
          } catch (error) {
            console.error("WebsocketProvider.disconnect", error);
          }
        }
      });
      // Render slots (children components)
      return () => slots.default && slots.default();
    },
  });
};

// // Define the useWebSocket composable function for accessing the WebSocket instance
// const useWebSocket = () => {
//   // Inject the WebSocket instance
//   const ctx = inject<Ref<Socket | null>>(WebsocketContextKey);
//   console.log(ctx, "CONNECTION");

//   // Return the WebSocket instance
//   return ctx?.value || null;
// };

// // Export the WebSocketProvider and useWebSocket
// export { installWebSocket as WebSocketProvider, useWebSocket };

export const useWebSocket = () => {
  const ctx = inject<Ref<Socket | null>>("WebSocketProvider");
  return ctx || null;
};
