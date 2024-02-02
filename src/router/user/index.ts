import AppLayout from "@/layout/AppLayout.vue";
import Home from "../base/Home/index.vue";
import UserMeals from "./UserMeals.vue";
import PaymentPage from "./payments/index.vue";
import PaymentProcessPage from "./PaymentProcessPage/index.vue";
import OrderDetails from "../provider/OrderDetails.vue";
import UserOrders from "./orders/index.vue";

const userRoutes = [
  {
    path: "/user",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "meals",
        name: "UserMeals",
        component: UserMeals,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "payments",
        component: PaymentPage,
        props: true,
        name: "Payment",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "payments/:type",
        component: PaymentProcessPage,
        name: "PaymentProcesspage",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "orders",
        name: "UserOrders",
        component: UserOrders,
        meta: { permissions: { action: "read", subject: "Order" } },
      },
      {
        path: "orders/:id",
        name: "OrderDetails",
        component: OrderDetails,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default userRoutes;
