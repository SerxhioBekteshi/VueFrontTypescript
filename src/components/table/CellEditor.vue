<template>
  <div v-if="column.propertyType === eColumnType.String">
    <InputText v-model="localValue" @input="updateValue" autofocus />
  </div>
  <div
    v-if="
      column.propertyType === eColumnType.Number ||
      column.propertyType === eColumnType.Decimal
    "
  >
    <InputNumber
      v-model="numberValue"
      @input="updateValue"
      :useGrouping="column.propertyType !== eColumnType.Number"
      autofocus
    />
  </div>
  <div
    v-if="
      column.propertyType === eColumnType.DateTime ||
      column.propertyType === eColumnType.DateOnly
    "
  >
    <Calendar v-model="localValue" @input="updateValue" autofocus />
  </div>
  <div v-if="column.propertyType === eColumnType.Tags">
    Tags meaning is the array type
  </div>
  <div v-if="column.propertyType === eColumnType.Image"></div>
  <Toast />
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import { useToast } from "primevue/usetoast";
import eColumnType from "@/assets/enums/eColumnType";

export default defineComponent({
  name: "CellEditor",
  components: { InputText, InputNumber, Calendar },
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
    // onCellEditComplete: {
    //   type: Function as PropType<
    //     (event: { data: any; field: any; newValue: any }) => void
    //   >,
    // },
  },
  setup(props, { emit }) {
    const localValue = ref(props.data[props.field]);
    const toast = useToast();

    const updateValue = () => {
      emit("input", localValue.value);
    };
    const eColumnType = {
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
      Status: 12,
      Array: 13,
      Object: 14,
    };

    const showImageToast = () => {
      toast.add({
        severity: "error",
        summary: "Can't edit cell of images",
        life: 3000, // Adjust the duration as needed
      });
    };

    const numberValue = computed({
      get: () => parseFloat(localValue.value),
      set: (newValue) => {
        localValue.value = newValue;
        updateValue();
      },
    });

    return {
      eColumnType,
      localValue,
      updateValue,
      showImageToast,
      numberValue,
    };
  },
});
</script>
<style></style>
