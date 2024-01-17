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
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UserOrders",
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
