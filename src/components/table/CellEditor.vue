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
  enums: {
    eColumnType,
  },
  setup(props, { emit }) {
    const localValue = ref(props.data[props.field]);
    const toast = useToast();

    const updateValue = () => {
      emit("input", localValue.value);
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
