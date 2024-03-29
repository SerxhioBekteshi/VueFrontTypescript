<template>
  <!-- <div v-if="!isLoading"> -->
  <span class="p-float-label">
    <MultiSelect
      :optionLabel="optionLabel"
      :options="selectOptions"
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
  <!-- </div> -->

  <Toast />
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent, onMounted, ref } from "vue";
import MultiSelect from "primevue/multiselect";
import axios from "axios";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "InputSelect",
  components: { MultiSelect, ValidationError, Toast },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String, required: true },
    options: { type: Array, default: () => [] },
    optionLabel: { type: String, default: "label" },
    optionValue: { type: String, default: "value" },
    showError: { type: Boolean, default: true },
    controller: { type: String },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    const toast = useToast();
    const selectOptions = ref<any[]>(props.options);
    const isLoading = ref<boolean>(props.controller ? true : false);

    onMounted(async () => {
      if (props.controller) {
        try {
          const res: any = await axios.get(`${props.controller}`);

          if (res && res.data) {
            selectOptions.value = res.data.map((option: any) => {
              return { value: option.id, label: option.label };
            });

            if (!selectOptions.value) {
              selectOptions.value = res.data.filter(
                (option: any) => option.fieldName === props.name
              )[0].questionOptions;
            }

            isLoading.value = false;
            // selectedValue.value = selectOptions.value.find((opt: any) => {
            //   opt[`${props.optionValue}`] === value.value;
            // });
          }
        } catch (err) {
          toast.add({
            life: 3000,
            detail: err,
            severity: "error",
            summary: "Error",
          });
        }
      }
    });

    return { value, errorMessage, meta, selectOptions, isLoading };
  },
});
</script>
<style scoped></style>
