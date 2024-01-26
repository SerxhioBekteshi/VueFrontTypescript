import Home from "./base/Home/index.vue";
import AppLayout from "@/layout/AppLayout.vue";
import Quiz from "./admin/Quiz.vue";
import ProvidersRegistration from "./admin/providersRegistration/index.vue";
import MealsConfiguration from "@/views/other/MealsConfigurations.vue";
import Permissions from "./admin/permissions/index.vue";
import ProviderEmail from "./admin/providerEmails/index.vue";
import Orders from "./admin/Orders.vue";
import OrderDetails from "./provider/OrderDetails.vue";
import Meals from "./provider/ProviderMeals.vue";

const aclRoutes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Home,
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: { permissions: { action: "read", subject: "orders" } },
      },
      {
        path: "orders/:id",
        name: "OrderDetails",
        component: OrderDetails,
      },
      {
        path: "quiz",
        name: "Quiz",
        component: Quiz,
        meta: { permissions: { action: "read", subject: "quiz" } },
      },
      {
        path: "providers/registration",
        name: "ProvidersRegistration",
        component: ProvidersRegistration,
        meta: {
          permissions: { action: "read", subject: "providers accounts" },
        },
      },
      {
        path: "mealsConfigurations",
        name: "mealsConfigurations",
        component: MealsConfiguration,
        meta: {
          permissions: { action: "read", subject: "meals configurations" },
        },
      },
      {
        path: "provider/emails",
        name: "ProviderEmails",
        component: ProviderEmail,
        meta: { permissions: { action: "read", subject: "provider emails" } },
      },

      {
        path: "permissions",
        name: "Permissions",
        component: Permissions,
        meta: { permissions: { action: "read", subject: "permissions" } },
      },
      {
        path: "meals",
        name: "Meals",
        component: Meals,
        meta: { permissions: { action: "read", subject: "meals" } },
      },
    ],
  },
];

export default aclRoutes;
