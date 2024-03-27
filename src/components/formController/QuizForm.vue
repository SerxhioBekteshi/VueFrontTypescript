<template>
  <div>
    <form @onSubmit="(e: any) =>  e.preventDefault()">
      <!-- <div style="margin-block: 3rem">
        <Tag severity="info" style="font-size: 1rem" :value="inputTypeValue">
        </Tag>
      </div> -->

      <div style="margin-bottom: 2rem">
        <InputText
          :name="'question'"
          :label="'Determine the question'"
          :placeholder="'Question'"
        />
      </div>

      <div style="margin-bottom: 2rem">
        <InputNumber
          :name="'order'"
          :label="'Determine the order of this question'"
          :placeholder="'Order'"
        />
      </div>

      <div style="margin-bottom: 1rem">
        <InputText
          :name="'fieldName'"
          :label="'Field name'"
          :placeholder="'Field name'"
        />
      </div>

      <div
        style="
          display: flex;
          border-radius: 1rem;
          flex-direction: column;
          padding-block: 1rem;
          margin-block: 0.5rem;
          background-color: var(--cyan-50);
        "
      >
        <FieldArray name="questionOptions" v-slot="{ fields, push, remove }">
          <div style="margin-left: 1rem; margin-block: 0.5rem">
            <strong> Add options </strong>
          </div>
          <fieldset
            v-for="(field, idx) in fields"
            :key="field.key"
            class="questionOptions"
          >
            <div style="display: flex; justify-content: space-between">
              <div style="display: flex">
                <div>
                  <InputText
                    :name="`questionOptions[${idx}].label`"
                    :label="'Enter the label'"
                    :id="`label_${idx}`"
                    :placeholder="'Label'"
                  />
                </div>

                <div>
                  <InputText
                    :name="`questionOptions[${idx}].value`"
                    :label="'Enter the value'"
                    :id="`value_${idx}`"
                    :placeholder="'Value'"
                  />
                </div>

                <div>
                  <Button
                    icon="pi pi-trash"
                    rounded
                    text
                    size="small"
                    severity="danger"
                    @click="remove(idx)"
                    :disabled="fields.length <= 1"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <div style="margin-left: 1rem; margin-top: 0.5rem">
            <Button
              label="+ new option"
              link
              size="small"
              style="width: fit-content"
              @click="push({ portion: '', name: '' })"
            />
          </div>
        </FieldArray>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import InputNumber from "@/components/formElements/InputNumber.vue";
import { inject } from "vue";
import { FieldArray } from "vee-validate";
import Button from "primevue/button";
// import Tag from "primevue/tag";

export default defineComponent({
  name: "QuizForm",
  components: { InputText, InputNumber, FieldArray, Button },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const inputTypeValue = computed(() => {
      return veeValidateForm.useField("questionType").value.value;
    });

    return { inputTypeValue };
  },
});
</script>
<style scoped>
.questionOptions {
  border: 1px solid transparent;
  border-top-color: rgba(0, 0, 0, 0) !important;
  border-radius: 1rem;
  padding: 1rem !important;
}
</style>
