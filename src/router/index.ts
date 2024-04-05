import { createRouter, createWebHistory } from "vue-router";

import profileRoutes from "./profile";
import baseRoutes from "./base";
import { useAbility } from "@casl/vue";
import aclRoutes from "./routesAcl";
import { computed } from "vue";
import { useStore } from "vuex";

const routes = [...baseRoutes, ...aclRoutes, ...profileRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiredPermissions: any = to.meta.permissions;
  const abilities = useAbility();
  const store = useStore();
  const isLoggedIn = computed(() => store.state.user.user);

  const isBaseRoute = baseRoutes.some((route) => route.path === to.path);
  if (isBaseRoute) {
    next();
    return;
  }

  if (!isLoggedIn.value && to.path !== "/") {
    next("/");
    return;
  }

  if (requiredPermissions) {
    // console.log(requiredPermissions);
    console.log(abilities.rules);
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
