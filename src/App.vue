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

    watch(notification, (newValue: any, oldValue: any) => {
      if (newValue !== "") {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: notification.value,
          life: 3000,
        });
        setTimeout(() => {
          store.commit(eMutationTypes.CLEAR_ERROR_MESSAGE);
        }, 500);
      }
    });

    onMounted(() => {
      const user = computed(() => store.getters.getUserInfo);

      if (user.value?.role) {
        socket = io("http://localhost:1112", {
          autoConnect: false,
          transports: ["websocket", "polling"],
          query: {
            userId: user.value.id,
            adminId: user.value.id,
            // providerId: user.value.id,
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

    return {
      notification,
    };
  },
});
</script>
