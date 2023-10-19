<template>
  <span class="p-float-label">
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
      :inputId="name"
      :optionValue="optionValue"
      v-model="value"
    />
    <label :for="name" :style="{ color: errorMessage ? 'red' : '' }">
      {{ label }}</label
    >
  </span>

  <div v-if="showError">
    <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent, ref } from "vue";
import Dropdown from "primevue/dropdown";

export default defineComponent({
  name: "InputSelect",
  components: { Dropdown, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String, required: true },
    options: { type: Array, required: true },
    optionLabel: { type: String, required: true },
    optionValue: { type: String, required: true },
    showError: { type: Boolean, required: false },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    // console.log(props.options, props.optionValue, value.value);
    const selectedValue = ref(
      props.options.find((opt: any) => opt[`${props.optionValue}`] === value)
    );
    // console.log(selectedValue.value, "SELECTED VALUE");

    return { value, errorMessage, meta, selectedValue };
  },
});
</script>
<style scoped></style>
