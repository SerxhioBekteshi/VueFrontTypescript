<template>
  <label :for="name" :style="{ color: errorMessage ? 'red' : '' }">
    {{ label }}</label
  >
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
    v-model="value"
  />
  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script setup>
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineProps, ref, watch } from "vue";
import Calendar from "primevue/calendar";
import { computed } from "vue";
import moment from "moment";

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String },
  label: { type: String },
  selectionMode: { type: String },
  dateFormat: { type: String },
  disabled: { type: Boolean },
});

const { value, errorMessage, meta } = useField(() => props.name, undefined);

// Store the formatted date as a string
const formattedDate = ref(moment(value).format("YYYY-MM-DD"));

const derivedFormattedDate = computed({
  get: () => formattedDate.value,
  set: (newValue) => {
    formattedDate.value = newValue;
    // Emit an event to update the parent's birthDate prop when the value changes
    console.log(newValue);
    // emit("update:birthDate", newValue);
  },
});
</script>
