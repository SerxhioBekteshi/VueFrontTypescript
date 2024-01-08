import Home from "../base/Home/index.vue";
import AppLayout from "@/layout/AppLayout.vue";
import Quiz from "./Quiz.vue";
import ProvidersRegistration from "./ProvidersRegistration.vue";
import MealsConfiguration from "@/views/other/MealsConfigurations.vue";
import Permissions from "./permissions/index.vue";
import ProviderEmail from "./providerEmails/index.vue";
import AdminOrders from "./Orders.vue";

const adminRoutes = [
  {
    path: "/admin",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "orders",
        name: "Admin Orders",
        component: AdminOrders,
      },
      {
        path: "quiz",
        name: "Quiz",
        component: Quiz,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "providers/registration",
        name: "ProvidersRegistration",
        component: ProvidersRegistration,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "mealsConfigurations",
        name: "mealsConfigurations",
        component: MealsConfiguration,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "provider/emails",
        name: "Send email",
        component: ProviderEmail,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "permissions",
        name: "Permissions",
        component: Permissions,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default adminRoutes;
