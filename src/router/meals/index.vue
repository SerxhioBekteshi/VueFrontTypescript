<template>
  <div class="card">
    <MealsView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealsView from "@/views/meals/MealsView.vue";

export default defineComponent({
  name: "MealsPage",
  components: { MealsView },
  props: {},
  setup() {
    return {};
  },
});
</script>
<style></style>
