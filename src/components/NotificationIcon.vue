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
      :dismissable="false"
      style="width: 300px; max-height: 400px; overflow-y: auto"
    >
      <template #start>
        <div class="flex justify-content-between">
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
          <div>
            <Button
              icon="pi pi-trash"
              severity="warning"
              text
              rounded
              aria-label="Mark as read"
              @click="() => handleDelete()"
            />
          </div>
        </div>
      </template>
      <template #item="{ item: { msg } }">
        <NotificationSocket :item="msg" @handle-delete="handleDelete" />
      </template>
      <template #end>
        <div class="flex justify-content-between p-3">
          <div>View all</div>
          <div>Load more</div>
        </div>
      </template>
    </Menu>
  </div>
  <Toast />
</template>

<script lang="ts">
import { useWebSocket } from "@/hooks/userWebSocket/index";
import axios from "axios";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
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
    const idsToDelete = ref<number[]>([]);
    const toast = useToast();
    const menu = ref<any>();

    const toggle = (event: any) => {
      menu.value.toggle(event);
    };

    const handleDelete = async (id?: number) => {
      try {
        const res: any = await axios.post("/notification/deleteAll", {
          ids: id ? [id] : idsToDelete.value,
        });
        if (res && res.data > 0) {
          toast.add({
            life: 3000,
            detail: `${res.data} notification were deleted`,
            severity: "warn",
            summary: "Notification delete",
          });
          getAllNotifications();
        }
      } catch (err: any) {
        console.log(err, "ERROR");
      }
    };

    const getAllNotifications = async () => {
      try {
        const res = await axios.post("/table/notifications", {
          page: 1,
          pageSize: 5,
          search: "",
          filters: [],
        });
        if (res && res.data) {
          idsToDelete.value = res.data.rows.map(
            (notification: any) => notification.id
          );
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
        const handleAppNotification = (notification: any) => {
          notifications.value = [...notifications.value, notification];
          toast.add({
            life: 3000,
            detail: notification.message,
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

    return { toggle, markAllRead, menu, notifications, handleDelete };
  },
});
</script>
<style scoped></style>
