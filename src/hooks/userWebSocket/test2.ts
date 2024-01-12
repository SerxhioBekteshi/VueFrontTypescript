import {
  App,
  ref,
  onMounted,
  onBeforeUnmount,
  provide,
  inject,
  Ref,
} from "vue";
import { io, Socket } from "socket.io-client";
import { useReduxSelector } from "@/store/redux/helpers";

const WebsocketContextKey = Symbol();

const installWebSocket = (app: App) => {
  app.component("WebSocketProvider", {
    name: "WebSocketProvider",
    props: {},
    setup(slots) {
      console.log("WebSocketProvider component setup");

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
              console.log("WebsocketProvider.start.error", error);
            }
          }

          return socket;
        }
      };

      const startSocket = () => {
        const socket = initializeSocket();

        onBeforeUnmount(() => {
          if (socket && socket.active) {
            try {
              socket.disconnect();
            } catch (error) {
              console.log("WebsocketProvider.disconnect", error);
            }
          }
        });
      };

      onMounted(() => {
        startSocket();
        console.log("MOUNTED");
        provide(WebsocketContextKey, connection.value);
      });

      return () => slots.default && slots.default();
    },
  });
};

const useWebSocket = () => {
  const ctx = inject<Ref<Socket | null>>(WebsocketContextKey);
  return ctx?.value || null;
};

export { installWebSocket as WebSocketProvider, useWebSocket };
