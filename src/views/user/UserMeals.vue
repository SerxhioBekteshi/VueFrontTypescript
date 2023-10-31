<template>
  <div class="card">
    <MealsPage :shouldCrud="false" :shouldRate="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MealsPage from "../other/MealsPage.vue";
import axios from "axios";

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
