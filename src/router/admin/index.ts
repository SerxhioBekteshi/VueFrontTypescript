import Home from "../base/Home/index.vue";
import AppLayout from "@/layout/AppLayout.vue";
import Quiz from "./Quiz.vue";
import ProvidersRegistration from "./ProvidersRegistration.vue";
import MealsConfiguration from "@/views/other/MealsConfigurations.vue";

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
    ],
  },
];

export default adminRoutes;
