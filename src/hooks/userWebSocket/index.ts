// Import necessary Vue 3 elements
import {
  App,
  ref,
  onMounted,
  onBeforeUnmount,
  provide,
  inject,
  watch,
  Ref,
} from "vue";

// Import the required Vue 3 plugin for your WebSocket logic (if available)
import { io, Socket } from "socket.io-client";
import { useReduxSelector } from "@/store/redux/helpers";

// Define your WebSocketContext key for providing and injecting the WebSocket instance
const WebsocketContextKey = Symbol();

// Define the WebSocketProvider component
const installWebSocket = (app: App) => {
  app.component("WebSocketProvider", {
    name: "WebsocketProvider",
    props: {
      // Add any props if necessary
    },
    setup(slots) {
      const user = useReduxSelector((state) => state.user);
      const connection = ref<Socket | null>(null);

      const initializeSocket = () => {
        let socket: Socket | null = null;
        if (user.value?.role) {
          socket = io("http://localhost:1112", {
            autoConnect: false,
            transports: ["websocket", "polling"],
            query: {
              userObjectId: user.value._id,
              userId: user.value.id,
              role: user.value.role,
            },
          });

          if (!socket.active) {
            try {
              socket.connect();
              connection.value = socket;
            } catch (error) {
              console.log("WebsocketProvider.start", error);
            }
          }
        }
      };

      onMounted(() => {
        initializeSocket();
        provide(WebsocketContextKey, connection.value);
      });

      watch(
        () => user.value.role,
        () => {
          // React to changes in user role
          if (connection.value) {
            // Handle socket disconnection or reconnection if needed
          }
          initializeSocket();
        }
      );

      onBeforeUnmount(() => {
        if (connection.value && connection.value.active) {
          try {
            connection.value.disconnect();
          } catch (error) {
            console.log("WebsocketProvider.disconnect", error);
          }
        }
      });

      // Render slots (children components)
      return () => slots.default && slots.default();
    },
  });
};

// Define the useWebSocket composable function for accessing the WebSocket instance
const useWebSocket = () => {
  // Inject the WebSocket instance
  const ctx = inject<Ref<Socket | null>>(WebsocketContextKey);

  // Return the WebSocket instance
  return ctx?.value || null;
};

// Export the WebSocketProvider and useWebSocket
export { installWebSocket as WebsocketProvider, useWebSocket };
