<template>
  <Column
    v-for="(column, index) in columns"
    :key="index"
    :field="column.propertyName"
    :header="column.title"
  ></Column>
</template>

<script lang="ts">
import IColumn from "@/interfaces/IColumn";
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
  },
  // setup(props) {
  //   console.log(props.columns?.length, "TABLE HEADER");
  // },
});
</script>
<style></style>
