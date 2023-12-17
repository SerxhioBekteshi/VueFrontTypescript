<template>
  <div class="card">
    <MealsPage :shouldCrud="false" :shouldRate="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealsPage from "@/views/other/MealsPage.vue";

export default defineComponent({
  name: "UserMeals",
  components: { MealsPage },
  props: {},
  setup() {
    return {};
  },
});
</script>
<style></style>
