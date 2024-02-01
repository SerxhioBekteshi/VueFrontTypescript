<template>
  <div class="card">
    <MealsPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealsPage from "@/views/other/MealsPage.vue";
import { useAbility } from "@casl/vue";

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
