import { createRouter, createWebHistory } from "vue-router";

import profileRoutes from "./profile";
import baseRoutes from "./base";
import { useAbility } from "@casl/vue";
import aclRoutes from "./routesAcl";

const routes = [...baseRoutes, ...aclRoutes, ...profileRoutes];

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
      return;
    }
  } else {
    next();
  }
});

export default router;
