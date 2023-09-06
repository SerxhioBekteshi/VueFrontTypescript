<template>
  <div v-if="column.propertyType === eDataType.String">
    <InputText :value="data[field]" @input="updateData" autofocus />
  </div>
  <div
    v-if="
      column.propertyType === eDataType.Number ||
      column.propertyType === eDataType.Decimal
    "
  >
    <InputNumber :value="data[field]" @input="updateData" autofocus />
  </div>
  <div
    v-if="
      column.propertyType === eDataType.DateTime ||
      column.propertyType === eDataType.DateOnly
    "
  >
    DateInput but it will be created later
  </div>
  <div v-if="column.propertyType === eDataType.Tags">
    Tags meaning is the array type
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, h, ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

export default defineComponent({
  name: "CellEditor",
  components: { InputText, InputNumber },
  props: {
    data: {
      type: null as unknown as PropType<any>,
    },
    field: {
      type: null as unknown as PropType<any>,
    },
    column: {
      type: null,
    },
  },
  setup(props, { emit }) {
    const updateData = (value: any) => {
      console.log(value, "aaaa");
      //   console.log(props.field, props.data, value, "CHECKS HERe");
      emit("update:data", { field: props.field, value, data: props.data });
    };
    const eDataType = {
      Number: 0,
      String: 1,
      DateTime: 2,
      Decimal: 3,
      Boolean: 4,
      Icons: 5,
      Link: 6,
      DateOnly: 7,
      Actions: 8,
      Select: 9,
      Tags: 10,
      Image: 11,
    };

    return { updateData, eDataType };
  },
});
</script>
<style></style>
