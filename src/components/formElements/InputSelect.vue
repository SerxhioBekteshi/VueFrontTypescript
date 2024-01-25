<template>
  <!-- <div v-if="!isLoading"> -->
  <span class="p-float-label">
    <Dropdown
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
      :disabled="disabled"
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
import { PropType, defineComponent, onMounted, ref, watch } from "vue";
import Dropdown from "primevue/dropdown";
import axios from "axios";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "InputSelect",
  components: { Dropdown, ValidationError, Toast },
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
    disabled: { type: Boolean, default: false },
    includeEmptyOption: { type: Boolean, default: false },
    defaultValue: { default: null },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField<string | null>(
      () => props.name,
      undefined,
      {
        initialValue:
          props.defaultValue !== undefined ? props.defaultValue : null,
      }
    );
    const toast = useToast();

    const selectOptions = ref<any[]>(props.options);
    // type: [String, null] as PropType<string | null>
    const isLoading = ref<boolean>(props.controller ? true : false);
    // const selectedValue = ref();

    watch(value, (newValue) => {
      console.log(newValue, "AAAA?");
    });

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

            if (props.includeEmptyOption) {
              selectOptions.value.unshift({
                [props.optionValue]: null,
                [props.optionLabel]: "",
              });
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

      if (props.includeEmptyOption) {
        selectOptions.value.unshift({
          [props.optionValue]: null,
          [props.optionLabel]: "",
        });
      }
      // if (props.options)
      //   selectedValue.value = props.options.find(
      //     (opt: any) => opt[`${props.optionValue}`] === value
      //   );
    });

    return { value, errorMessage, meta, selectOptions, isLoading };
  },
});
</script>
<style scoped></style>
