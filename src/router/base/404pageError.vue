<template>
  <div class="not-found">
    <div class="content">
      <i class="pi pi-exclamation-triangle not-found-icon"></i>
      <h1>404 - Not Found</h1>
      <p>
        The page you are looking for might be unavailable or does not exist.
      </p>
      <Button
        label="Go back to the home page"
        link
        @click="() => navigateWhereNeeded()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { eRoles } from "@/assets/enums/eRoles";
import { RootState } from "@/store/vuexStore/types";
import Button from "primevue/button";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "404NotFound",
  components: {
    Button,
  },
  setup() {
    const router = useRouter();
    const store = useStore<RootState>();
    const profile = computed(() => store.getters.getUserInfo);

    const navigateWhereNeeded = () => {
      if (
        profile.value?.role === eRoles.User &&
        profile.value?.quizResults == undefined
      ) {
        router.push("/quiz");
      } else router.push(`/dashboard`);
    };
    return { router, navigateWhereNeeded };
  },
});
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  text-align: center;
}

.not-found-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}
</style>
