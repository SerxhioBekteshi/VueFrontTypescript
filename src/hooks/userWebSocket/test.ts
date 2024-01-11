import {
  App,
  ref,
  onMounted,
  onBeforeUnmount,
  provide,
  inject,
  watch,
  Ref,
  createApp,
} from "vue";
import { io, Socket } from "socket.io-client";
import { useReduxSelector } from "@/store/redux/helpers";

const WebsocketContextKey = Symbol();

interface WebSocketContext {
  connection: Ref<Socket | null>;
}

const initializeSocket = (user: any, connection: any) => {
  let socket: Socket | null = null;

  if (user?.role) {
    socket = io("http://localhost:1112", {
      autoConnect: false,
      transports: ["websocket", "polling"],
      query: {
        // userObjectId: user._id,
        // userId: user.id,
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

    const connection = ref<Socket | null>(null);
    const user = {
      role: "sth",
    };
    let isWebSocketComponentMounted = false;

    const WebSocketComponent = {
      name: "WebSocketComponent",
      mounted() {
        console.log("WebSocketComponent mounted");
        initializeSocket(user, connection);
      },
      beforeUnmount() {
        if (connection.value && connection.value.active) {
          try {
            connection.value.disconnect();
          } catch (error) {
            console.log("WebsocketProvider.disconnect", error);
          }
        }
      },
      watch: {
        user: {
          handler(newVal: any) {
            if (connection.value) {
              // Handle socket disconnection or reconnection if needed
            }
            initializeSocket(newVal, connection);
          },
          deep: true,
        },
      },
    };

    app.component(WebSocketComponent.name, WebSocketComponent);

    app.mixin({
      beforeCreate() {
        // Check if the WebSocket component is already mounted
        if (!isWebSocketComponentMounted) {
          // Access the initialized component and mount it globally
          const WebSocketComponentInstance = app.component(
            WebSocketComponent.name
          );
          if (WebSocketComponentInstance) {
            const vm = createApp(WebSocketComponentInstance);
            vm.mount(document.body);
            isWebSocketComponentMounted = true;
          }
        }
      },
    });
  },
};

export { WebSocketProvider, useWebSocket };
