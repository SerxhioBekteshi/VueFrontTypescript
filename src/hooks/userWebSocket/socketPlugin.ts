import { ref, onMounted, onUnmounted, provide, App, inject, Ref } from "vue";
import { io, Socket } from "socket.io-client";
// import { useReduxSelector } from "@/store/redux/helpers";

const WebsocketContextKey = Symbol();

const WebsocketMixin = {
  // installed: false,
  install: (app: App) => {
    // if (WebsocketMixin.installed) {
    //   return;
    // }
    // WebsocketMixin.installed = true;
    const connection = ref<any>(null);
    let socket: Socket | null = null;

    // app.mixin({
    //   mounted() {
    //     const user = useReduxSelector((state) => state.user);
    //     if (user.value?.role) {
    //       socket = io("http://localhost:1112", {
    //         autoConnect: false,
    //         transports: ["websocket", "polling"],
    //         query: {
    //           userId: user.value.id,
    //           adminId: user.value.id,
    //           role: user.value.role,
    //         },
    //       });

    //       if (!socket.active) {
    //         try {
    //           socket.connect();
    //           connection.value = socket;
    //           console.log("connection.value");
    //           provide(WebsocketContextKey, connection.value);
    //         } catch (error) {
    //           console.error("WebsocketProvider.start", error);
    //         }
    //       }
    //     }
    //   },

    //   unmounted() {
    //     if (socket && socket.active) {
    //       try {
    //         socket.disconnect();
    //       } catch (error) {
    //         console.error("WebsocketProvider.disconnect", error);
    //       }
    //     }
    //   },
    // });
  },
};

const useWebSocket = () => {
  const ctx = inject<Ref<Socket | null>>(WebsocketContextKey);
  return ctx || null;
};
export { WebsocketMixin, useWebSocket };
