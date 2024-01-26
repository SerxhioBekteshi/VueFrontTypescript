import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./admin";
import providerRoutes from "./provider";
import profileRoutes from "./profile";
import userRoutes from "./user";
import baseRoutes from "./base";
import JwtManager from "@/utils/jwtManager";
import { inject } from "vue";
import { useAbility } from "@casl/vue";
import aclRoutes from "./routesAcl";

// const routes = [
//   ...adminRoutes,
//   ...userRoutes,
//   ...providerRoutes,
//   ...profileRoutes,
//   ...baseRoutes,
// ];

const routes = [...baseRoutes, ...aclRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiredPermissions: any = to.meta.permissions;
  const abilities = useAbility();

  if (requiredPermissions) {
    // console.log(requiredPermissions);
    // console.log(abilities.rules);
    // console.log(
    //   abilities.can(requiredPermissions.action, requiredPermissions.subject)
    // );
    // Check if the user has the required permissions
    if (
      abilities.can(requiredPermissions.action, requiredPermissions.subject)
    ) {
      next();
    } else {
      next("/404NotFound");
    }

    next();
  } else next();
});

export default router;
