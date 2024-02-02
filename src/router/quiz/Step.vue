<template>
  <div v-if="data">
    <div class="flex flex-column">
      <div style="text-align: center; margin-bottom: 1rem">
        <span style="font-weight: bold; font-size: 1.25rem">
          {{ data.order + 1 }}.
          {{ data.question }}
        </span>
      </div>
      <div v-if="data.questionType === 'select'">
        <InputSelect
          :options="data.questionOptions"
          :optionLabel="'label'"
          :optionValue="'value'"
          :label="data.question"
          :name="data.fieldName"
          :id="data.fieldName"
          :placeholder="data.question"
          :showError="false"
        />
      </div>
      <form @onSubmit="handlePrevent">
        <div
          v-if="data.questionType === 'radio'"
          class="flex justify-content-center flex-wrap gap-3"
        >
          <InputRadioButton
            :options="data.questionOptions"
            :name="data.fieldName"
            :id="data.id.toString()"
          />
        </div>
        <div
          v-if="data.questionType === 'checkbox'"
          class="flex justify-content-center flex-wrap gap-3"
        >
          <InputCheckBox
            :options="data.questionOptions"
            :name="data.fieldName"
            :id="data.id.toString()"
          />
          <!-- <div v-for="(option, index) in data.questionOptions" :key="index">
            <div class="flex align-items-center" style="margin-inline: 1rem">
              <Checkbox
                :inputId="option.label + index"
                :name="data.fieldName"
                :value="option.value"
                v-model="stepField"
              />
              <label :for="option.label + index" class="ml-2">{{
                option.label
              }}</label>
            </div>
          </div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import InputSelect from "../../components/formElements/InputSelect.vue";
import { defineComponent, inject } from "vue";
import InputCheckBox from "@/components/formElements/InputCheckBox.vue";
import InputRadioButton from "@/components/formElements/InputRadioButton.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Step",
  components: { InputRadioButton, InputSelect, InputCheckBox },
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    const veeQuizForm: any = inject("veeQuizForm");
    const { value: stepField } = veeQuizForm.useField(props.data.fieldName);

    // const fieldValue = ref("");
    // watch(
    //   stepField,
    //   (newValue: any) => {
    //     console.log(fieldValue.value);
    //     const key = props.data.fieldName;
    //     // veeQuizForm.setFieldValue(key, newValue);
    //   },
    //   { deep: true }
    // );

    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    return { stepField, handlePrevent };
  },
});
</script>
<style scoped></style>
