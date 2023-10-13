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
import Profile from "../views/Profile.vue";
import ProfileDetails from "../views/ProfileDetails.vue";
import QuizLayout from "../views/other/QuizLayout.vue";
import PersonalDemo from "../components/stepperViews/PaymentDemo.vue";
import SeatDemo from "../components/stepperViews/SeatDemo.vue";
import PaymentDemo from "../components/stepperViews/PaymentDemo.vue";
import ConfirmationDemo from "../components/stepperViews/ConfirmationDemo.vue";

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
    ],
  },
  {
    path: "/admin/quiz",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Quiz",
        component: Quiz,
      },
    ],
  },
  {
    path: "/admin/providers/registration",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "ProvidersRegistration",
        component: ProvidersRegistration,
      },
    ],
  },

  {
    path: "/provider",
    component: AppLayout,
    // component: AppLayout,
    children: [
      {
        path: "",
        name: "ProviderDashboard",
        component: Home,
        // children: [
        //   {
        //     path: "",
        //     component: Home,
        //   },
        // ],
      },
    ],
  },
  {
    path: "/provider/orders",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "ProviderOrders",
        component: ProviderOrders,
      },
    ],
  },
  {
    path: "/provider/meals",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "ProviderMeals",
        component: ProviderMeals,
      },
    ],
  },
  {
    path: "/profile/personal",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "Profile",
        component: Profile,
      },
    ],
  },
  {
    path: "/profile/details",
    component: AppLayout,
    children: [
      {
        path: "",
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
        name: "ProviderMeals",
        component: ProviderMeals,
      },
    ],
  },
  {
    path: "/user/quiz",
    component: QuizLayout,
    name: "Quiz layout",
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
  //   path: "/user/quiz/personal",
  //   component: PersonalDemo,
  //   name: "PersonalDemo",
  // },
  // {
  //   path: "/user/quiz/seat",
  //   name: "SeatDemo",
  //   component: SeatDemo,
  // },
  // {
  //   path: "/user/quiz/payment",
  //   name: "PaymentDemo",
  //   component: PaymentDemo,
  // },
  // {
  //   path: "/user/quiz/confirmation",
  //   name: "ConfirmationDemo",
  //   component: ConfirmationDemo,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
