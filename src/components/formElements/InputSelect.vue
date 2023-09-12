<template>
  <label :for="name" :style="{ color: errorMessage ? 'red' : '' }">
    {{ label }}</label
  >
  <Dropdown
    :optionLabel="optionLabel"
    :options="options"
    :style="{ borderColor: errorMessage ? 'red' : '', width: '100%' }"
    :placeholder="placeholder"
    :id="id"
    :class="{
      dirty: meta.dirty,
      // valid: meta.touched && meta.valid,
      // invalid: meta.touched && !meta.valid,
    }"
    :optionValue="optionValue"
    v-model="value"
  />
  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script setup>
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineProps, ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String },
  label: { type: String },
  options: { type: Array },
  optionLabel: { type: String },
  optionValue: { type: String },
});
const { value, errorMessage, meta } = useField(() => props.name, undefined);
// const selectedValue = ref(null);
// watch(
//   () => value,
//   (newValue) => {
//     selectedValue.value = newValue;
//   }
// );

// // Watch for changes in the selectedValue and update the value of the field
// watch(
//   () => selectedValue.value,
//   (newValue) => {
//     value.value = newValue;
//   }
// );
</script>
