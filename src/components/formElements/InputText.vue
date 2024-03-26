<template>
  <span class="p-float-label">
    <InputText
      v-model="value"
      :type="'text'"
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
      :disabled="disabled"
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

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "InpuText",
  components: { InputText, ValidationError },
  props: {
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
    feedback: { type: Boolean },
    id: { type: String },
    disabled: { type: Boolean, default: false },
    defaultValue: { default: "" },
  },
  setup(props) {
    const { handleChange, value, handleBlur, errorMessage, meta } =
      useField<any>(() => props.name, {
        initialValue: props.defaultValue,
      });

    return { value, errorMessage, meta, handleBlur };
  },
});
// const state = value;

// const validationListeners = {
//   blur: (evt) => handleBlur(evt, true),
//   change: handleChange,
//   input: (evt) => handleChange(evt, !!errorMessage.value),
// };
</script>
