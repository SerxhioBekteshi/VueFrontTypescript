import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./admin";
import providerRoutes from "./provider";
import profileRoutes from "./profile";
import userRoutes from "./user";
import baseRoutes from "./base";

const routes = [
  ...adminRoutes,
  ...userRoutes,
  ...providerRoutes,
  ...profileRoutes,
  ...baseRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token: any = JwtManager.accessToken;

//   if (to.meta.requiresAuth && !token) {
//     next({ name: "Home" });
//   } else {
//     next({ name: "LoginView" });
//   }
// });

export default router;
