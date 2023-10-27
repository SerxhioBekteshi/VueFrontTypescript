<template>
  <div class="card">
    <MealsPage :shouldCrud="false" :shouldRate="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealsPage from "../other/MealsPage.vue";

export default defineComponent({
  name: "UserMainPage",
  components: {
    MealsPage,
  },
  props: {},
  setup() {
    return {};
  },
});
</script>

<style scoped>
.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}

::v-deep .ingredients {
  all: unset !important;
}
::v-deep .custom-dropdown-style {
  background-color: lightgray;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 4px;
}
.image-wrapper {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
