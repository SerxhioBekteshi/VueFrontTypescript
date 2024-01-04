<template>
  <div>
    <!-- <Button
      :icon="icon"
      @click="toggle"
      size="small"
      class="p-link layout-topbar-button"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    /> -->
    <button @click="toggle" class="p-link layout-topbar-button">
      <i :class="icon"></i>
      <span>Notification</span>
    </button>

    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item }">
        <NotificationSocket :item="item" />
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

export default defineComponent({
  name: "NotificationIcon",
  components: { Menu },
  props: {
    icon: { type: String, required: false, default: "pi pi-ellipsis-v" },
  },
  setup(props) {
    const notifications = ref<any>([]);
    const socket = useWebSocket();
    const menu = ref<any>();
    const items = ref<any>([]);

    const toggle = (event: any) => {
      console.log(menu.value);
      menu.value.toggle(event);
    };

    const getAllNotifications = async () => {
      try {
        const res = await axios.post("/table/notifications", {
          pageNumber: 1,
          pageSize: 10,
        });
        if (res) {
          notifications.value = res.data.rows;
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
      // getAllNotifications();
    });

    onMounted(() => {
      handleSocketAppNotification();
    });

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

    return { toggle, items, menu };
  },
});
</script>
<style scoped></style>
