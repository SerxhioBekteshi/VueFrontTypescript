<template>
  <div>
    <button @click="toggle" class="p-link layout-topbar-button">
      <i :class="icon"></i>
      <span>Notification</span>
    </button>

    <Menu
      ref="menu"
      id="overlay_menu"
      :model="notifications"
      :popup="true"
      style="width: 300px; height: fit-content"
    >
      <template #start>
        <div class="flex align-items-center g-1 pb-2 flex-wrap">
          <Button
            icon="pi pi-sync"
            severity="danger"
            text
            rounded
            aria-label="Mark as read"
            @click="markAllRead"
          />
          <p>Mark all as read</p>
        </div>
      </template>
      <template #item="{ item: { msg } }">
        <NotificationSocket :item="msg" />
      </template>
    </Menu>
  </div>
  <Toast />
</template>

<script lang="ts">
import { useWebSocket } from "@/hooks/userWebSocket/socketPlugin";
import axios from "axios";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import NotificationSocket from "./NotificationSocket.vue";
import { INotificationItem } from "@/interfaces/other/INotificationItem";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "NotificationIcon",
  components: { Menu, NotificationSocket, Button },
  props: {
    icon: { type: String, required: false, default: "pi pi-ellipsis-v" },
  },
  setup(props) {
    const notifications = ref<INotificationItem[]>([]);
    const socket: any = useWebSocket();

    const toast = useToast();
    const menu = ref<any>();

    const toggle = (event: any) => {
      menu.value.toggle(event);
    };

    const getAllNotifications = async () => {
      try {
        const res = await axios.post("/table/notifications", {
          page: 1,
          pageSize: 10,
          search: "",
          filters: [],
        });
        if (res && res.data) {
          console.log(res.data);
          notifications.value = res.data.rows.map((element: any) => ({
            msg: element,
          }));
        }
      } catch (error) {
        console.log(error, "error in notification componenet");
      }
    };

    const markAllRead = async () => {
      const res = await axios.post("/notification/markAllRead");
      if (res && res.data > 0) {
        getAllNotifications();
      }
    };

    onMounted(() => {
      getAllNotifications();
    });

    onMounted(() => {
      if (socket && socket.active) {
        const handleAppNotification = (message: any) => {
          notifications.value = [message, ...notifications.value];
          toast.add({
            life: 3000,
            detail: message.message,
            severity: "info",
            summary: "New registration",
          });
        };

        socket.on("AppNotification", handleAppNotification);

        onUnmounted(() => {
          if (socket !== null && socket.active) {
            socket.off("AppNotification", handleAppNotification);
          }
        });
      }
    });

    return { toggle, markAllRead, menu, notifications };
  },
});
</script>
<style scoped></style>
