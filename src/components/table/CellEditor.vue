<template>
  <InputText :value="data[field]" @input="updateData" autofocus />
</template>

<script lang="ts">
// import eDataType from "@/assets/enums/eDataType";
import { PropType, defineComponent, h, ref } from "vue";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "CellEditor",
  components: { InputText },
  props: {
    data: {
      type: null as unknown as PropType<any>,
    },
    field: {
      type: null as unknown as PropType<any>,
    },
  },
  setup(props, { emit }) {
    console.log(props.data.value, "aaaaa");
    const updateData = (value: any) => {
      emit("update:data", { field: props.field, value });
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

    return { updateData };
  },
});
</script>
<style></style>
