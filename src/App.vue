<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { useReduxSelector } from "./store/redux/helpers";
import { Socket, io } from "socket.io-client";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const user = useReduxSelector((state) => state.user);

    const connection = ref<Socket | null>(null);
    const WebsocketContextKey = Symbol();

    const initializeSocket = () => {
      let socket: Socket | null = null;
      if (user.value?.role) {
        socket = io("http://localhost:1112", {
          autoConnect: false,
          transports: ["websocket", "polling"],
          query: {
            // userObjectId: user.value._id,
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

    const handleSocket = () => {
      console.log(connection);
      // connection..on("AppNotification", (notification: any) => {
      //   console.log(notification, "WHAT???");
      //   toast.add({
      //     life: 3000,
      //     detail: notification.message,
      //     severity: "info",
      //     summary: "New notification",
      //   });
      // });
    };

    onMounted(() => {
      handleSocket();
    });

    onMounted(() => {
      startSocket();

      provide(WebsocketContextKey, connection.value);
    });

    // socket.on("AppNotification", (notification: any) => {
    //   console.log(notification, "WHAT");
    //   // app.config.globalProperties.toast({
    //   //   title: "Notification",
    //   //   message: notification.message,
    //   //   position: "top-right",
    //   //   duration: 5000,
    //   //   type: "info",
    //   // });
    // });
  },
});
</script>
