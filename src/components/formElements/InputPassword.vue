<template>
  <div style="display: flex; flex-direction: column">
    <label
      style="padding-left: 0.5rem; margin-bottom: 0.5rem"
      :for="name"
      :style="{ color: errorMessage ? 'red' : '' }"
    >
      {{ label }}
    </label>
    <span :class="`p-input-icon-${iconPosition} w-full`">
      <i
        :class="`pi pi ${
          inputType === 'password' ? 'pi-eye' : 'pi-eye-slash'
        } hoverOnIcon`"
        @click="toggleShowPassword"
      />
      <InputText
        :value="value"
        :type="inputType"
        :style="{ borderColor: errorMessage ? 'red' : '', width: '100%' }"
        :placeholder="placeholder"
        :inputId="name"
        :id="id"
        :class="{
          dirty: meta.dirty,
          // valid: !errorMessage,
          // invalid: errorMessage,
        }"
        @change="handleChange"
        @keyup="handleOnKeyUp"
        @blur="handleOnBlur"
        @focus="handleOnFocus"
      />
    </span>

    <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { PropType, defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "InputPassword",
  components: { InputText, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
    style: { type: Object },
    handleOnBlur: { type: Function as PropType<(event: FocusEvent) => void> },
    handleOnKeyUp: {
      type: Function as PropType<(event: KeyboardEvent) => void>,
    },
    handleOnFocus: { type: Function as PropType<(event: FocusEvent) => void> },
    iconPosition: { type: String },
  },
  setup(props) {
    const inputType = ref<string>("password");

    const toggleShowPassword = () => {
      inputType.value = inputType.value === "password" ? "text" : "password";
    };

    const { value, handleChange, errorMessage, meta } = useField(
      () => props.name,
      undefined
      // {
      //   // Conditionally enable or disable validation based on formSubmitted
      //   enabled: () => veeValidateForm.isSubmitting,
      // }
    );

    return {
      inputType,
      errorMessage,
      value,
      meta,
      handleChange,
      toggleShowPassword,
    };
  },
});
</script>
<style>
.hoverOnIcon:hover {
  cursor: pointer;
}
</style>
