<template>
  <ToggleButton
    :onLabel="labelOn"
    :offLabel="labelOff"
    onIcon="pi pi-check"
    offIcon="pi pi-times"
    class="w-9rem"
  />

  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent } from "vue";
import ToggleButton from "primevue/togglebutton";

export default defineComponent({
  name: "InputSelect",
  components: { ToggleButton, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    labelOn: { type: String, required: true },
    labelOff: { type: String, required: true },
    options: { type: Array, default: () => [] },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);

    return { value, errorMessage, meta };
  },
});
</script>
<style scoped></style>
