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
        @click="() => router.push(`/dashboard`)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "404NotFound",
  components: {
    Button,
  },
  setup() {
    const router = useRouter();

    return { router };
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
