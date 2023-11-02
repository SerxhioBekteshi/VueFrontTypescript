<template>
  <span class="p-float-label">
    <Calendar
      :style="{ borderColor: errorMessage ? 'red' : '', width: '100%' }"
      :placeholder="placeholder"
      :id="id"
      :selectionMode="selectionMode"
      :dateFormat="dateFormat"
      :disabled="disabled"
      :class="{
        dirty: meta.dirty,
        // valid: meta.touched && meta.valid,
        // invalid: meta.touched && !meta.valid,
      }"
      v-model="formattedDate"
      :showIcon="showIcon"
      :showButtonBar="showButtonBar"
      :inputId="name"
      :inputStyle="inputStyle"
      @update:modelValue="handleValueChange"
      @clear-click="handleClearClick"
    />
    <label :for="name" :style="{ color: errorMessage ? 'red' : '' }">
      {{ label }}</label
    >
  </span>

  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script setup>
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineProps, ref } from "vue";
import Calendar from "primevue/calendar";
import { onMounted } from "vue";
import moment from "moment";
import { inject } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String },
  label: { type: String },
  selectionMode: { type: String },
  dateFormat: { type: String },
  showButtonBar: { type: Boolean, default: true },
  showIcon: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  inputStyle: { type: Object },
});

const { value, errorMessage, meta } = useField(() => props.name, undefined);
const profileDetailsForm = inject("profileDetailsForm");
const formattedDate = ref(moment(value).format("YYYY/MM/DD"));

const handleValueChange = (newValue) => {
  const formattedValue = moment(newValue).format("YYYY/MM/DD");
  formattedDate.value = formattedValue;
  profileDetailsForm.setFieldValue(props.name, formattedValue);
};

const handleClearClick = () => {
  formattedDate.value = ref(moment(value.value).format("YYYY/MM/DD"));
};

onMounted(() => {
  formattedDate.value = moment(value.value).format("YYYY/MM/DD");
});
</script>
