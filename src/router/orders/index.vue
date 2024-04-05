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
import { RootState } from "@/store/vuexStore/types";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Orders",
  components: { TableData },
  setup() {
    const router = useRouter();
    const onCustomRowBtClick = (rowId: number) => {
      router.push(`/orders/${rowId}`);
    };
    return { onCustomRowBtClick };
  },
});
</script>
<style></style>
