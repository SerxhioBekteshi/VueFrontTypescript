<template>
  <div
    v-if="options.length !== 0"
    style="display: flex; flex-wrap: wrap; gap: 1rem"
  >
    <div v-for="(option, index) in options" :key="index">
      <ToggleButton
        :modelValue="toggleStates[index]"
        @update:modelValue="handleOptionsValues(index)"
        :onLabel="option.label"
        :offLabel="option.label"
        onIcon="pi pi-check"
        offIcon="pi pi-times"
        class="w-9rem"
      />
    </div>
    <!--         @input="(value: any) => toggleStates[index] = value"
 -->
  </div>
  <div v-else>
    <ToggleButton
      :modelValue="(value as boolean)"
      @update:modelValue="handleChange"
      :onLabel="labelOn"
      :offLabel="labelOff"
      onIcon="pi pi-check"
      offIcon="pi pi-times"
      class="w-9rem"
    />
  </div>

  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent, onMounted, ref } from "vue";
import ToggleButton from "primevue/togglebutton";

interface IOption {
  label: string;
  value: string;
}

export default defineComponent({
  name: "InputSelect",
  components: { ToggleButton, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    labelOn: { type: String, default: "Disactive" },
    labelOff: { type: String, default: "Active" },
    options: { type: Array as () => IOption[], default: () => [] },
    class: { type: String },
  },
  setup(props) {
    const { value, errorMessage, meta, handleChange } = useField(
      () => props.name,
      undefined
    );

    const toggleStates = ref(Array(props.options.length).fill(false));
    const labelValue = ref<string[]>([]);

    onMounted(() => {
      if (Array.isArray(value.value)) {
        labelValue.value = value.value;
        value.value.forEach((val: any) => {
          const index = props.options.findIndex(
            (option) => option.value === val
          );
          if (index !== -1) {
            toggleStates.value[index] = true;
          }
        });
      }
    });

    const handleOptionsValues = (index: number) => {
      toggleStates.value[index] = !toggleStates.value[index];
      props.options.map((option: any, i: number) => {
        if (i === index && toggleStates.value[index])
          labelValue.value.push(option.label);
        else if (i === index && !toggleStates.value[index])
          labelValue.value = labelValue.value.filter(
            (label) => label !== option.label
          );
      });

      handleChange(labelValue.value);
    };

    return {
      value,
      handleChange,
      handleOptionsValues,
      errorMessage,
      meta,
      toggleStates,
    };
  },
});
</script>
<style scoped></style>
