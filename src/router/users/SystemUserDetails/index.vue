<template>
  <div v-if="!isLoading">
    <UserDetails :userDetails="userDetails" />
  </div>
  <div
    v-else
    class="flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <ProgressSpinner />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import AuthManager from "@/utils/authManager";
import ProgressSpinner from "primevue/progressspinner";
import UserDetails from "@/views/userDetails/index.vue";

export default defineComponent({
  name: "SystemUserDetails",
  components: {
    ProgressSpinner,
    UserDetails,
  },
  enums: {},
  setup() {
    const route = useRoute();
    const userId = ref<number>(0);
    const toast = useToast();
    const userDetails = ref<any>();
    const isLoading = ref<boolean>(true);

    onMounted(() => {
      userId.value = parseInt(
        Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
      );
      fetchUserDetails();
    });

    const fetchUserDetails = async () => {
      try {
        isLoading.value = true;
        const res: any = await axios.get(`user/${userId.value}`);

        if (res && res.data) {
          userDetails.value = AuthManager.handleUserDataBasedOnRole(res.data);
          isLoading.value = false;
        }
      } catch (err: any) {
        toast.add({
          life: 3000,
          detail: err.message,
          severity: "error",
          summary: "info",
        });
        isLoading.value = false;
      }
    };

    return {
      userId,
      userDetails,
      isLoading,
    };
  },
});
</script>
<style scoped lang="scss">
.instagram {
  color: var(--pink-500);
}

.facebook {
  color: var(--blue-600);
}

.twitter {
  color: var(--cyan-300);
}
</style>
