<template>
  <!-- <div
    style="display: flex; justify-content: space-between;, margin-top: 0.5rem; margin-bottom: 0.2rem"
  > -->
  <div
    class="flex gap-3 p-flex-column-xs xs:justify-content-start sm:justify-content-between"
  >
    <div v-if="showAddBt">
      <Button icon="pi pi-external-link" label="Add" />
    </div>
    <div v-if="showSearch">
      <div class="p-inputgroup flex-1">
        <InputPV
          :value="value"
          @change="$emit('change', $event)"
          placeholder="Search"
        />
        <Button icon="pi pi-search" severity="secondary" outlined disabled />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import Button from "primevue/button";
import InputPV from "primevue/inputtext";

import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "GenericToolbar",
  components: { Button, InputPV },
  props: {
    tableColumns: Array,
    controller: String,
    showExport: Boolean,
    onChange: Function,
    value: String,
    showSearch: Boolean,
    showAddBt: Boolean,
  },
  // setup() {
  //   console.log("sd");
  // },
});
</script>
<style></style>
