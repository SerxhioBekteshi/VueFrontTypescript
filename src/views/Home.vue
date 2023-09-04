<template>
  <div>
    <TableData :controller="'meals'" />
  </div>
</template>

<script lang="ts">
// import Button from "primevue/button"
import TableData from "../components/TableData.vue";
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { TableData },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  data() {},
  methods: {},
});
</script>
<style></style>
