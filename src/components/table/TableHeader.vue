<template>
  <Column
    v-for="(column, index) in columns"
    :key="index"
    :field="column.propertyName"
    :header="column.title"
  ></Column>
</template>

<script lang="ts">
import IColumn from "@/interfaces/table/IColumn";
import Column from "primevue/column";
import { PropType, defineComponent, ref } from "vue";
export default defineComponent({
  name: "TableHeader",
  components: { Column },
  props: {
    columns: Array as PropType<IColumn[]>,
    rowCount: Number,
    showEdit: Boolean,
    showDelete: Boolean,
    showCustomRowBt: Boolean,
  },
  setup(props) {
    const calculateColumnWidth = (headerContent: any) => {
      const minWidth = 10;

      const dynamicWidth = Math.max(headerContent.length * 8, minWidth) + 20;

      return `${dynamicWidth}px`;
    };

    return { calculateColumnWidth };
  },
});
</script>
<style></style>
