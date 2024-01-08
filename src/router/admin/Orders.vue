<template>
  <div>
    <TableData
      :controller="'orders'"
      ref="tableDataRef"
      :showEdit="false"
      :showAddBt="false"
      :showDelete="false"
      :showExport="false"
      :showCustomRowBt="true"
      :selectableRows="false"
      @custom-row-bt-clicked="onCustomRowBtClick"
    />
  </div>
</template>

<script lang="ts">
import TableData from "@/components/table/TableData.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdminOrders",
  components: { TableData },
  setup() {
    const router = useRouter();
    const onCustomRowBtClick = (rowId: number) => {
      router.push(`/user/orders/${rowId}`);
    };
    return { onCustomRowBtClick };
  },
});
</script>
<style></style>
