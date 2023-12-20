<template>
  <div class="not-found">
    <div class="content">
      <i class="pi pi-exclamation-triangle not-found-icon"></i>
      <h1>404 - Not Found</h1>
      <p>
        The page you are looking for might be unavailable or does not exist.
      </p>
      <router-link to="/">Go back to the home page</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "404NotFound",
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
