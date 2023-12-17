<template>
  <div class="card">
    <MealsPage :shouldCrud="true" :shouldRate="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealsPage from "@/views/other/MealsPage.vue";

export default defineComponent({
  name: "ProviderMeals",
  components: { MealsPage },
  props: {},
  setup() {
    return {};
  },
});
</script>
<style></style>
