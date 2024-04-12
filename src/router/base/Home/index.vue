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
import AuthManager from "@/utils/authManager";
import { useToast } from "primevue/usetoast";
import { defineComponent, onMounted, ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import UserDetails from "@/views/userDetails/index.vue";

export default defineComponent({
  name: "Dashboard",
  components: { UserDetails, ProgressSpinner },
  enums: {},
  setup() {
    const toast = useToast();
    const userDetails = ref<any>();
    const isLoading = ref<boolean>(true);

    onMounted(() => {
      fetchUserDetails();
    });

    const fetchUserDetails = async () => {
      try {
        isLoading.value = true;
        const res: any = await AuthManager.getUserData();
        if (res) {
          userDetails.value = AuthManager.handleUserDataBasedOnRole(res);
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
      userDetails,
      isLoading,
    };
  },
});
</script>
<style></style>
