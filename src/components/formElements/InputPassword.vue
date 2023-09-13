<template>
  <div>
    <label :for="name" :style="{ color: errorMessage ? 'red' : '' }">
      {{ label }}</label
    >
    <span :class="`p-input-icon-${iconPosition} w-full`">
      <i :class="`pi ${icon} hoverOnIcon`" @click="$emit('iconAction')" />
      <InputText
        :value="value"
        :type="'text'"
        :style="{ borderColor: errorMessage ? 'red' : '', width: '100%' }"
        :placeholder="placeholder"
        :id="id"
        :class="{
          dirty: meta.dirty,
          valid: !errorMessage,
          invalid: errorMessage,
        }"
        @change="handleChange"
        :feedback="feedback"
      />
    </span>
    <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineProps, ref, getCurrentInstance, defineEmits } from "vue";
import InputText from "primevue/inputtext";

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  placeholder: { type: String },
  label: { type: String },
  style: { type: Object },
  feedback: { type: Boolean, default: false },
  handleOnBlur: { type: Function },
  handleOnKeyUp: { type: Function },
  handleOnFocus: { type: Function },
  icon: { type: String },
  iconPosition: { type: String },
});
// const { emit } = getCurrentInstance();
// const emit = defineEmits(["iconAction"]); // Define the emits option with your event name

// const handleIconActionClick = () => {
//   emit("iconAction");
// };

const { handleChange, value, errorMessage, meta } = useField(
  () => props.name,
  undefined
);
</script>
<style>
.hoverOnIcon:hover {
  cursor: pointer;
}
</style>
