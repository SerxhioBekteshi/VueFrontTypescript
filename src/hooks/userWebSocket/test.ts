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
import { io, Socket } from "socket.io-client";
import { useReduxSelector } from "@/store/redux/helpers";

const WebsocketContextKey = Symbol();

interface WebSocketContext {
  connection: Ref<Socket | null>;
}

const initializeSocket = (user: any, connection: Ref<Socket | null>) => {
  let socket: Socket | null = null;
  if (user?.role) {
    socket = io("http://localhost:1112", {
      autoConnect: false,
      transports: ["websocket", "polling"],
      query: {
        userObjectId: user._id,
        userId: user.id,
        role: user.role,
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

const useWebSocket = (): Socket | null => {
  const ctx = inject<WebSocketContext>(WebsocketContextKey);
  return ctx?.connection.value || null;
};

const WebSocketProvider = {
  install(app: App) {
    console.log("WebSocketProvider plugin installed");

    const user = useReduxSelector((state) => state.user);
    const connection = ref<Socket | null>(null);

    onMounted(() => {
      console.log("WebSocketProvider component mounted");
      initializeSocket(user.value, connection);
      provide(WebsocketContextKey, { connection });
    });

    watch(
      () => user.value.role,
      () => {
        if (connection.value) {
          // Handle socket disconnection or reconnection if needed
        }
        initializeSocket(user.value, connection);
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
  },
};

export { WebSocketProvider, useWebSocket };
