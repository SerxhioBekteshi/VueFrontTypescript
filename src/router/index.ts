import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./admin";
import providerRoutes from "./provider";
import profileRoutes from "./profile";
import userRoutes from "./user";
import baseRoutes from "./base";
import JwtManager from "@/utils/jwtManager";
import { inject } from "vue";
import { useAbility } from "@casl/vue";

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

router.beforeEach((to, from, next) => {
  const requiredPermissions = to.meta.permissions;
  const abilities = useAbility();

  console.log(abilities);
  // // next();
  // if (requiredPermissions) {
  //   // Check if the user has the required permissions
  //   if (ability.can(requiredPermissions.action, requiredPermissions.subject)) {
  //     next();
  //   } else {
  //     next("/404NotFound");
  //   }
  // } else {
  next(); // Route doesn't require specific permissions, proceed
  // }
});

export default router;
