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
</template>

<script lang="ts">
import { useWebSocket } from "@/hooks/userWebSocket";
import axios from "axios";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import NotificationSocket from "./NotificationSocket.vue";
import { INotificationItem } from "@/interfaces/other/INotificationItem";

export default defineComponent({
  name: "NotificationIcon",
  components: { Menu, NotificationSocket, Button },
  props: {
    icon: { type: String, required: false, default: "pi pi-ellipsis-v" },
  },
  setup(props) {
    const notifications = ref<INotificationItem[]>([]);
    const socket = useWebSocket();
    console.log(socket, "SOCKET");
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
          notifications.value = res.data.rows.map((element: any) => ({
            msg: element,
          }));
        }
      } catch (error) {
        console.log(error, "error in notification componenet");
      }
    };

    const handleSocketAppNotification = () => {
      //   if (socket?.value && socket?.value.active) {
      //     const handleAppNotification = (message) => {
      //       notifications.value = [message, ...notifications.value];
      // Assuming dispatch is a method in your component
      // toast.add
      //   dispatch({
      //     type: 'createNotification',
      //     timeout: 3000,
      //     message: message.message,
      //     clickable: !!message.route,
      //     route: `/${user.role}/${message.route}`,
      //     id: message._id,
      //   });
      // };
      // socket.value.on("AppNotification", handleAppNotification);
      //   }
    };

    onMounted(() => {
      getAllNotifications();
    });

    onMounted(() => {
      handleSocketAppNotification();
    });

    const markAllRead = async () => {
      const res = await axios.post("/notification/markAllRead");
      if (res && res.data > 0) {
        const copyNotifications = [...notifications.value];
        copyNotifications.forEach((notification) => {
          if (notification.seen === false) {
            notification.seen = true;
          }
        });
      }
    };

    // onBeforeUnmount(() => {
    //   if (socket.value !== null && socket.value.active) {
    //     socket.value.off("AppNotification");
    //   }
    // });

    watch(
      () => notifications.value,
      (newNotifications, oldNotifications) => {
        handleSocketAppNotification();
      }
    );

    return { toggle, markAllRead, menu, notifications };
  },
});
</script>
<style scoped></style>
