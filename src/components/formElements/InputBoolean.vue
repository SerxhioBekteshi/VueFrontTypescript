<template>
  <label
    :for="name"
    :style="{ marginBottom: '1rem', color: errorMessage ? 'red' : '' }"
  >
    {{ label }}
  </label>
  <div>
    <InputSwitch
      :name="name"
      :inputId="name"
      :id="id"
      :class="{ 'p-invalid': errorMessage }"
      v-model="value"
    />
  </div>

  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { PropType, Ref, defineComponent } from "vue";
import InputSwitch from "primevue/inputswitch";

export default defineComponent({
  name: "InputCheckbox",
  components: { InputSwitch, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    const typedValue: Ref<string | boolean | undefined> = value as Ref<
      string | boolean | undefined
    >;

    return { value: typedValue, errorMessage, meta };
  },
});
</script>
<style scoped></style>
