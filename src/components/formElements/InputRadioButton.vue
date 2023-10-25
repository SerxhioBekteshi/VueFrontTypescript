<template>
  <div v-for="(option, index) in options" :key="index">
    <div class="flex align-items-center" style="margin-inline: 1rem">
      <RadioButton
        :inputId="`${option.label}${index}`"
        :name="name"
        :value="option.value"
        :style="{ borderColor: errorMessage ? 'red' : '' }"
        :id="id"
        v-model="value"
      />
      <label :for="`${option.label}${index}`" class="ml-2">{{
        option.label
      }}</label>
    </div>
  </div>

  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { PropType, defineComponent, ref } from "vue";
import RadioButton from "primevue/radiobutton";

export interface IRadioButton {
  value: string;
  label: string;
}

export default defineComponent({
  name: "InputCheckbox",
  components: { RadioButton, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
    options: { type: Array as PropType<IRadioButton[]>, required: true },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    return { value, errorMessage, meta };
  },
});
</script>
<style scoped></style>
