import AppLayout from "@/layout/AppLayout.vue";
import Home from "../base/Home/index.vue";
import ProviderMeals from "./ProviderMeals.vue";
import ProviderOrders from "./ProviderOrders.vue";

const providerRoutes = [
  {
    path: "/provider",
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
        path: "orders",
        name: "ProviderOrders",
        component: ProviderOrders,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "meals",
        name: "ProviderMeals",
        component: ProviderMeals,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default providerRoutes;
