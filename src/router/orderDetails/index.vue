<template>
  <div>
    <TableData
      v-if="orderId"
      :controller="`orderDetails/${orderId}`"
      :keyWhereFilter="'orderId'"
      ref="tableDataRef"
      :showEdit="false"
      :showAddBt="false"
      :showDelete="false"
      :showExport="false"
    />
  </div>
</template>

<script lang="ts">
import TableData from "@/components/table/TableData.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "OrderDetails",
  components: { TableData },
  setup() {
    const route = useRoute();
    const orderId = ref<number>(0);

    onMounted(() => {
      orderId.value = parseInt(
        Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
      );
    });

    return { orderId };
  },
});
</script>
<style></style>
