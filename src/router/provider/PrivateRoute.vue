<template>
  <router-view v-if="isLoggedUserAllowed" />
</template>

<script lang="ts">
import { eRoles } from "@/assets/enums/eRoles";
import { useReduxSelector } from "@/store/redux/helpers";
import { ref, watch, onMounted, defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const loggedUser = useReduxSelector((state) => state.user);

    const isLoggedUserAllowed = computed(() => {
      return loggedUser.value && loggedUser.value.role === eRoles.Provider;
    });

    const checkUser = () => {
      if (!loggedUser.value) {
        // Redirect to login if the user is not authenticated
        router.push({
          path: "/login",
          query: { prev: router.currentRoute.value.fullPath },
        });
      } else if (
        loggedUser.value &&
        loggedUser.value.role !== eRoles.Provider
      ) {
        // Redirect to a specific route based on the user's role
        router.push({ path: "/" + loggedUser.value.role.toLowerCase() });
      }
    };

    watch(router.currentRoute, checkUser);

    onMounted(checkUser);

    return {
      isLoggedUserAllowed,
    };
  },
});
</script>
