<template>
  <router-view />
  <Toast />
</template>

<script lang="ts">
import { Socket, io } from "socket.io-client";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import { RootState } from "./store/vuexStore/types";
// import { useToast } from "primevue/usetoast";
// import store from "./store/vuexStore/storeModules";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { eMutationTypes } from "./assets/enums/eMutationTypes";

export default defineComponent({
  name: "App",
  components: { Toast },
  setup() {
    const WebsocketContextKey = "WebSocketProvider";
    const connection = ref<any>(null);
    let socket: Socket | null = null;
    const toast = useToast();

    const store = useStore<RootState>();
    const notification = computed(() => store.getters.getErrorMessage);
    console.log(notification.value, "WHY NOT?????");

    watch([notification.value], () => {
      if (notification.value !== "") {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: notification.value,
          group: "br",
          life: 3000,
        });
        setTimeout(() => {
          store.commit(eMutationTypes.CLEAR_ERROR_MESSAGE);
        }, 3000);
      }
    });
    // watch(
    //   () => store.getters.getErrorMessage,
    //   (message, prevMessage) => {
    //     console.log("error message", message);
    //     if (message) {
    //       toast.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: message,
    //         group: "br",
    //         life: 6000,
    //       });
    //     }
    //   }
    // );

    onMounted(() => {
      const user = computed(() => store.getters.getUserInfo);

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
            console.error("WebsocketProvider.start error", error);
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
