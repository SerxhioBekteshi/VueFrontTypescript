<template>
  <slot></slot>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  provide,
  watch,
} from "vue";
import { io, Socket } from "socket.io-client";
// import { useGetUser } from '../useGetUser';
// import { useReduxSelector } from "@/store/redux/helpers";
// import useGetUser from "../useGetUser";

export const WebsocketKey = Symbol("Websocket");

export default defineComponent({
  name: "WebsocketProvider",
  props: {
    children: {
      type: Object,
      required: true,
    },
  },
  setup(props, { slots }) {
    // const user = useGetUser();
    // const user = useReduxSelector((state) => state.user);
    //      const store = useStore<RootState>();
      // const user = computed(() => store.getters.getUserInfo);
    // const connection = ref<Socket | null>(null);

    // const initializeSocket = () => {
    //   let socket: Socket | null = null;
    //   if (user.value?.role) {
    //     socket = io("http://localhost:1112", {
    //       autoConnect: false,
    //       transports: ["websocket", "polling"],
    //       query: {
    //         userObjectId: user.value._id,
    //         userId: user.value.id,
    //         role: user.value.role,
    //       },
    //     });

    //     if (!socket.active) {
    //       try {
    //         socket.connect();
    //         connection.value = socket;
    //       } catch (error) {
    //         console.log("WebsocketProvider.start", error);
    //       }
    //     }
    //   }
    // };

    // onMounted(() => {
    //   initializeSocket();
    //   provide(WebsocketKey, connection.value);
    // });

    // watch(
    //   () => user.value.role,
    //   () => {
    //     // React to changes in user role
    //     if (connection.value) {
    //       // Handle socket disconnection or reconnection if needed
    //     }
    //     initializeSocket();
    //   }
    // );

    // onBeforeUnmount(() => {
    //   if (connection.value && connection.value.active) {
    //     try {
    //       connection.value.disconnect();
    //     } catch (error) {
    //       console.log("WebsocketProvider.disconnect", error);
    //     }
    //   }
    // });

    return () => slots.default?.();
  },
});
