<template>
  <div
    class="card flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <ProgressSpinner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressSpinner from "primevue/progressspinner";
export default defineComponent({
  components: { ProgressSpinner },
});
</script>

<style scoped>
/* Add your styles here */
</style>
