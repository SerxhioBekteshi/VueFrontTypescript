<template>
  <div>
    <!-- <button @click="toggle" class="p-link layout-topbar-button">
      <i :class="icon"></i>
      <span>Notification</span>
    </button> -->

    <Badge
      :value="numberOfUnseenNotifications"
      @click="toggle"
      severity="success"
      style="cursor: pointer"
    ></Badge>

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
              size="small"
              rounded
              aria-label="Mark as read"
              @click="markAllRead"
              :disabled="notifications.length === 0"
            />
            <p>Mark all as read</p>
          </div>
          <div>
            <Button
              v-tooltip="'Delete all'"
              icon="pi pi-trash"
              severity="warning"
              text
              size="small"
              :disabled="notifications.length === 0"
              rounded
              aria-label="Mark as read"
              @click="() => handleDelete()"
            />
          </div>
        </div>
      </template>
      <template #item="{ item: { msg } }">
        <NotificationSocket
          :item="msg"
          @handle-delete="handleDelete"
          @on-notification-click="markAsSeen"
        />
      </template>
      <template #end>
        <div v-if="isLoading" class="flex justify-content-center">
          <ProgressSpinner
            style="width: 30px; height: 30px"
            strokeWidth="2"
            fill="var(--surface-ground)"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          />
        </div>
        <div class="flex justify-content-between p-1">
          <div>
            <Button
              label="View all"
              link
              size="small"
              :disabled="notifications.length === 0"
            />
          </div>
          <div>
            <Button
              :disabled="notifications.length === 0"
              @click="() => (pageSize = pageSize + 5)"
              label="Load more"
              link
              size="small"
            />
          </div>
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
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import NotificationSocket from "./NotificationSocket.vue";
import { INotificationItem } from "@/interfaces/other/INotificationItem";
import { useToast } from "primevue/usetoast";
import Badge from "primevue/badge";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import router from "@/router";

export interface IOnNotificationClickObject {
  id: number;
  route: any;
}

export default defineComponent({
  name: "NotificationIcon",
  components: {
    Menu,
    NotificationSocket,
    Button,
    Badge,
    ProgressSpinner,
    Toast,
  },
  props: {
    icon: { type: String, required: false, default: "pi pi-ellipsis-v" },
  },
  setup() {
    const notifications = ref<INotificationItem[]>([]);
    const socket: any = useWebSocket();
    // const idsToDelete = ref<number[]>([]);
    const toast = useToast();
    const menu = ref<any>();
    const pageSize = ref<number>(5);
    const isLoading = ref<boolean>(false);

    const toggle = (event: any) => {
      menu.value.toggle(event);
    };

    watch([pageSize], () => {
      isLoading.value = true;
      getAllNotifications();
    });

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
        toast.add({
          life: 3000,
          detail: err?.message,
          severity: "error",
          summary: "Error notification delete",
        });
      }
    };

    const numberOfUnseenNotifications = computed(() => {
      return (
        notifications.value &&
        notifications.value.filter((notification: any) => {
          console.log(notification);
          return !notification?.msg?.seen;
        }).length
      );
    });

    const idsToDelete = computed(() => {
      return (
        notifications.value &&
        notifications.value.map((notification: any) => notification.msg.id)
      );
    });

    const getAllNotifications = async () => {
      try {
        const res = await axios.post("/table/notifications", {
          page: 1,
          pageSize: pageSize.value,
          search: "",
          filters: [],
        });
        if (res && res.data) {
          // idsToDelete.value = res.data.rows.map(
          //   (notification: any) => notification.id
          // );
          notifications.value = res.data.rows.map((element: any) => ({
            msg: element,
          }));
          isLoading.value = false;
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
            summary: notification.title,
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

    const markAsSeen = async (
      onNotificationClickObject: IOnNotificationClickObject
    ) => {
      const res: any = await axios.put(
        `/notification/${onNotificationClickObject.id}`
      );
      if (res && res.data) {
        if (onNotificationClickObject.route !== "") {
          router.push(onNotificationClickObject.route);
          getAllNotifications();
        } else {
          toast.add({
            life: 3000,
            detail: "This is a notification without navigation",
            severity: "error",
            summary: "info",
          });
        }
      }
    };

    return {
      toggle,
      markAllRead,
      handleDelete,
      getAllNotifications,
      markAsSeen,
      pageSize,
      numberOfUnseenNotifications,
      isLoading,
      menu,
      notifications,
    };
  },
});
</script>
<style scoped></style>
