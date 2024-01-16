<template>
  <router-view />
</template>

<script lang="ts">
import { Socket, io } from "socket.io-client";
import {
  Ref,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
} from "vue";
import { useReduxSelector } from "./store/redux/helpers";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const WebsocketContextKey = "WebSocketProvider";
    const connection = ref<any>(null);
    let socket: Socket | null = null;

    onMounted(() => {
      const user = useReduxSelector((state) => state.user);
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
            console.log("connection.value");
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
  },
});
</script>
