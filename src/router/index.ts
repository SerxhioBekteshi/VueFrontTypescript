import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import PrivateRoute from "../PrivateRoute.vue";
import LayoutWrapper from "../components/LayoutWrapper.vue";
import AppLayout from "../layout/AppLayout.vue";
import LandingPage from "../views/LandingPage.vue";
import Quiz from "../views/admin/Quiz.vue";
import ProvidersRegistration from "../views/admin/ProvidersRegistration.vue";
import ProviderOrders from "../views/provider/ProviderOrders.vue";
import ProviderMeals from "../views/provider/ProviderMeals.vue";
import UserMeals from "../views/user/UserMeals.vue";
import Profile from "../views/Profile.vue";
import ProfileDetails from "../views/ProfileDetails.vue";
import QuizLayout from "../views/other/QuizLayout.vue";
import UserMainPage from "../views/user/UserMainPage.vue";
import MealsConfiguration from "../views/other/MealsConfigurations.vue";
import PaymentPage from "@/views/user/payments/index.vue";
import PaymentProcessPage from "@/views/other/PaymentProcessPage.vue";

const routes = [
  {
    path: "/admin",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Home,
      },
      {
        path: "quiz",
        name: "Quiz",
        component: Quiz,
      },
      {
        path: "providers/registration",
        name: "ProvidersRegistration",
        component: ProvidersRegistration,
      },
      {
        path: "mealsConfigurations",
        name: "mealsConfigurations",
        component: MealsConfiguration,
      },
    ],
  },
  {
    path: "/provider",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "ProviderDashboard",
        component: Home,
      },
      {
        path: "orders",
        name: "ProviderOrders",
        component: ProviderOrders,
      },
      {
        path: "meals",
        name: "ProviderMeals",
        component: ProviderMeals,
      },
    ],
  },
  {
    path: "/profile",
    component: AppLayout,
    children: [
      {
        path: "personal",
        name: "Profile",
        component: Profile,
      },
      {
        path: "details",
        name: "ProfileDetails",
        component: ProfileDetails,
      },
    ],
  },
  {
    path: "/user",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "meals",
        name: "UserMeals",
        component: UserMeals,
      },
      {
        path: "quiz",
        component: QuizLayout,
        name: "Quiz layout",
      },
      {
        path: "payments",
        component: PaymentPage,
        props: true,
        name: "Payment",
      },
      {
        path: "payments/:type",
        component: PaymentProcessPage,
        props: true,
        name: "PaymentProcesspage",
      },
      {
        path: "orders",
        name: "UserOrders",
        component: ProviderOrders,
      },
    ],
  },
  {
    path: "/",
    component: LandingPage,
    name: "Landing Page",
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/registerProvider",
    name: "RegisterProviderView",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  // {
  //   path: "/user/:type",
  //   component: PaypalPage,
  //   props: true,
  //   name: "Payment",
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
