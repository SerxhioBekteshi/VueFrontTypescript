<template>
  <div v-for="(option, index) in options" :key="index">
    <div class="flex align-items-center" style="margin-inline: 1rem">
      <Checkbox
        :inputId="`${option.label}${index}`"
        :name="name"
        :value="option.value"
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
import Checkbox from "primevue/checkbox";

export interface ICheckBox {
  value: string;
  label: string;
}

export default defineComponent({
  name: "InputCheckbox",
  components: { Checkbox, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
    options: { type: Array as PropType<ICheckBox[]>, required: true },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    // console.log(props.options, props.optionValue, value.value);
    // const selectedValue = ref(
    //   props.options.find((opt: any) => opt[`${props.optionValue}`] === value)
    // );
    // // console.log(selectedValue.value, "SELECTED VALUE");

    return { value, errorMessage, meta };
  },
});
</script>
<style scoped></style>
