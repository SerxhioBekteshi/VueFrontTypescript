<template>
  <span class="p-float-label">
    <InputNumber
      v-model="value"
      :id="id"
      :style="{ borderColor: errorMessage ? 'red' : '', width: '100%' }"
      :placeholder="placeholder"
      :class="{
        dirty: meta.dirty,
        // valid: meta.touched && meta.valid,
        // invalid: meta.touched && !meta.valid,
      }"
      :inputId="name"
      @blur="handleBlur"
    />
    <label
      :for="name"
      :style="{ marginBottom: '1rem', color: errorMessage ? 'red' : '' }"
    >
      {{ label }}
    </label>
  </span>

  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script setup>
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineProps, ref, watch } from "vue";
import InputNumber from "primevue/inputnumber";

const props = defineProps({
  name: { type: String, required: true },
  placeholder: { type: String },
  label: { type: String },
  feedback: { type: Boolean },
  id: { type: String },
});

const { handleChange, value, handleBlur, errorMessage, meta } = useField(
  () => props.name,
  { asNumber: true },
  undefined
);

// const validationListeners = {
//   blur: (evt) => handleBlur(evt, true),
//   change: handleChange,
//   input: (evt) => handleChange(evt, !!errorMessage.value),
// };
</script>
