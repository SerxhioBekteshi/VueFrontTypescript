import { useReduxSelector } from "@/store/redux/helpers";
import { io } from "socket.io-client";
import { App } from "vue";

const socketPlugin = {
  install: (app: App) => {
    // Set up WebSocket connection

    const user = useReduxSelector((state) => state.user);

    const socket = io("http://localhost:1112", {
      //   autoConnect: false,
      transports: ["websocket", "polling"],
      query: {
        //   userObjectId: user.value._id,
        userId: 1,
        //   role: user.value.role,
      },
    });
    // Adjust the server URL

    console.log(user, "USER");
    // Handle incoming notifications
    socket.on("AppNotification", (notification: any) => {
      app.config.globalProperties.toast({
        title: "Notification",
        message: notification.message,
        position: "top-right",
        duration: 5000,
        type: "info",
      });
    });

    // Add the socket instance to the app for easy access in components
    app.config.globalProperties.socket = socket;
  },
};

export default socketPlugin;
