<template>
  <div class="card">
    <MealsPage :shouldCrud="false" :shouldRate="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import MealsPage from "@/views/other/MealsPage.vue";

export default defineComponent({
  name: "UserMainPage",
  components: {
    MealsPage,
  },
  props: {},
  setup() {
    const notificationRef = ref(null);

    onMounted(() => {
      // Access the global socket instance provided in main.ts
      const socket = (window as any).$socket;

      if (socket) {
        // Listen for AppNotification events
        socket.on("AppNotification", (notification: any) => {
          // Handle the notification, update UI, etc.
          console.log("New Notification:", notification);

          // You can update the UI or perform other actions based on the notification
          // For example, display a toast message
          notificationRef.value = notification;
        });
      }
    });

    onBeforeUnmount(() => {
      // Clean up event listeners or perform other cleanup tasks
      const socket = (window as any).$socket;
      if (socket) {
        socket.off("AppNotification");
      }
    });

    return {};
  },
});
</script>

<style scoped></style>
