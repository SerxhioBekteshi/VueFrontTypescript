import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import PrivateRoute from "../PrivateRoute.vue"
import LayoutWrapper from "../components/LayoutWrapper.vue"
const routes = [
  {
    path: "/home",
    name: "Home",
    // component: PrivateRoute,
    children: [
      {
        path: '',
        component: LayoutWrapper,
        children: [
          {
            path: '',
            component: Home
          }
        ]
      }
    ]
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  //   {
  //     path: "/feed",
  //     name: "Feed",
  //     component: Feed,
  //   },
  //   {
  //     path: "/companies",
  //     name: "Companies",
  //     component: Companies,
  //   },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
