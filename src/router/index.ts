import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./admin";
import providerRoutes from "./provider";
import profileRoutes from "./profile";
import userRoutes from "./user";
import baseRoutes from "./base";
import JwtManager from "@/utils/jwtManager";

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
//   console.log(to, "TO");

//   if (!token) {
//     next({ name: "Login" });
//   } else {
//     next({ name: "Home" });
//   }
// });

export default router;
