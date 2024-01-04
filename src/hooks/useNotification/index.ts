import { ref, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:1112"); // Update with your socket server details

const notifications = ref<any[]>([]);

const useNotification = () => {
  const addNotification = (notification: any) => {
    notifications.value.push(notification);
  };

  const clearNotifications = () => {
    notifications.value = [];
  };

  const connectSocket = () => {
    socket.connect();
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };

  return {
    notifications,
    socket,
    addNotification,
    clearNotifications,
    connectSocket,
    disconnectSocket,
  };
};

export default useNotification;
