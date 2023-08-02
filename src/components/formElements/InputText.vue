<template>
  <InputText
    :value="value"
    :type="type || 'text'"
    style="style"
    :style="{ borderColor: errorMessage ? 'red' : '' }"
    :id="id"
    :class="{
      dirty: meta.dirty,
      valid: meta.touched && meta.valid,
      invalid: meta.touched && !meta.valid,
    }"
    @change="handleChange"
    @blur="handleBlur"
  />
  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script setup>
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineProps, ref, watch } from "vue";
import InputText from "primevue/inputtext";
const props = defineProps({
  name: String,
  type: String,
});

const { handleChange, value, handleBlur, errorMessage, meta } = useField(
  () => props.name,
  undefined
);

// const validationListeners = {
//   blur: (evt) => handleBlur(evt, true),
//   change: handleChange,
//   input: (evt) => handleChange(evt, !!errorMessage.value),
// };
</script>
