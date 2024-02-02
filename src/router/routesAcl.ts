import Home from "./base/Home/index.vue";
import AppLayout from "@/layout/AppLayout.vue";
import QuizConfiguration from "./quizConfiguration/index.vue";
import QuizLayout from "./quiz/index.vue";
import ProvidersRegistration from "./providersRegistration/index.vue";
import MealsConfiguration from "./mealsConfiguration/index.vue";
import Permissions from "./permissions/index.vue";
import ProviderEmail from "./providerEmails/index.vue";
import Orders from "./orders/index.vue";
import OrderDetails from "./orderDetails/index.vue";
import Meals from "./meals/index.vue";

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
        path: "quizConfiguration",
        name: "QuizConfiguration",
        component: QuizConfiguration,
        meta: {
          permissions: { action: "read", subject: "quiz configuration" },
        },
      },
      {
        path: "quiz",
        name: "QuizLayout",
        component: QuizLayout,
        meta: {
          permissions: { action: "read", subject: "quiz layout" },
        },
      },
      {
        path: "providers/registration",
        name: "ProvidersRegistration",
        component: ProvidersRegistration,
        meta: {
          permissions: { action: "read", subject: "provider accounts" },
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
