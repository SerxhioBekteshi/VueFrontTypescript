<template>
  <div v-if="data">
    <div class="flex flex-column">
      <div style="text-align: center; margin-bottom: 1rem">
        <span style="font-weight: bold; font-size: 1.25rem">
          {{ data.order + 1 }}.
          {{ data.question }}
        </span>
      </div>
      <!-- <div v-if="data.questionType === 'select'">
        <InputSelect
          :options="data.questionOptions"
          :optionLabel="'label'"
          :optionValue="'value'"
          :label="data.question"
          :name="data.fieldName"
          :id="data.fieldName"
          :placeholder="data.question"
          v-bind="data.fieldName"
          :showError="false"
        />
      </div> -->
      <form @onSubmit="handlePrevent">
        <div
          v-if="data.questionType === 'radio'"
          class="flex justify-content-center flex-wrap gap-3"
        >
          <div v-for="(option, index) in data.questionOptions" :key="index">
            <div class="flex align-items-center" style="margin-inline: 1rem">
              <RadioButton
                :inputId="option.label + index"
                :name="data.fieldName"
                :value="option.value"
                v-model="stepField"
              />
              <label :for="option.label + index" class="ml-2">{{
                option.label
              }}</label>
            </div>
          </div>
        </div>
        <div
          v-if="data.questionType === 'checkbox'"
          class="flex justify-content-center flex-wrap gap-3"
        >
          <div v-for="(option, index) in data.questionOptions" :key="index">
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
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Checkbox from "primevue/checkbox";
// import InputSelect from "../../components/formElements/InputSelect.vue";
import RadioButton from "primevue/radiobutton";
import { defineComponent, inject, ref, watch } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Step",
  components: { RadioButton, Checkbox },
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    const veeQuizForm: any = inject("veeQuizForm");
    const fieldValue = ref("");

    const { value: stepField } = veeQuizForm.useField(props.data.fieldName);

    watch(
      stepField,
      (newValue: any) => {
        // Update the data object when stepField changes
        fieldValue.value = newValue;
        veeQuizForm.set;
        console.log(fieldValue.value);
      },
      { deep: true }
    );

    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    return { stepField, handlePrevent };
  },
});
</script>
<style scoped></style>
