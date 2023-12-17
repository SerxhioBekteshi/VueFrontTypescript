<template>
  <div>
    <TableData
      :controller="'orders'"
      ref="tableDataRef"
      :showEdit="false"
      :showAddBt="false"
      :showDelete="false"
      :showExport="false"
      @custom-row-bt-clicked="onCustomRowBtClick"
    />
  </div>
</template>

<script lang="ts">
// import Button from "primevue/button"
import TableData from "@/components/table/TableData.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UserOrders",
  components: { TableData },
  setup() {
    const onCustomRowBtClick = (rowId: number) => {
      console.log(rowId, "AWDAWDAD");
    };
    return { onCustomRowBtClick };
  },
});
</script>
<style></style>
