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
          name="sth"
          id="sth"
          :placeholder="data.question"
          aria-labelledby="multiple"
        />
      </div>
      <div
        v-if="data.questionType === 'radio'"
        class="flex justify-content-center"
      >
        <div v-for="(option, index) in data.questionOptions" :key="index">
          <div class="flex align-items-center" style="margin-inline: 1rem">
            <RadioButton
              :inputId="index.toString()"
              :name="option.label"
              :value="option.value"
              v-model="option.label"
            />
            <label :for="option.label" class="ml-2">{{ option.label }}</label>
          </div>
        </div>
      </div>
      <div
        v-if="data.questionType === 'checkbox'"
        class="flex justify-content-center"
      >
        <div v-for="(option, index) in data.questionOptions" :key="index">
          <div class="flex align-items-center" style="margin-inline: 1rem">
            <Checkbox
              :inputId="index.toString()"
              :name="option.label"
              :value="option.value"
            />
            <label :for="option.label" class="ml-2">{{ option.label }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Checkbox from "primevue/checkbox";
import InputSelect from "../../components/formElements/InputSelect.vue";
import RadioButton from "primevue/radiobutton";
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Step",
  components: { RadioButton, InputSelect, Checkbox },
  props: {
    data: { type: Object, required: true },
  },
  setup(props) {
    console.log(props.data);
    return {};
  },
});
</script>
<style scoped></style>
