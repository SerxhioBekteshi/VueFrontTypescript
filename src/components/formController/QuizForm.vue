<template>
  <div>
    <form @onSubmit="handlePrevent">
      <div style="margin-bottom: 2rem">
        <InputText
          name="question"
          :label="'Determine the question'"
          placeholder="Question"
        />
      </div>

      <div style="margin-bottom: 2rem">
        <InputNumber
          name="order"
          :label="'Determine the order of this question'"
          placeholder="Order"
        />
      </div>

      <div style="margin-bottom: 1rem">
        <InputNumber
          name="fieldName"
          :label="'Field name'"
          placeholder="Field name"
        />
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <FieldArray name="questionOptions" v-slot="{ fields, push, remove }">
          <fieldset
            v-for="(field, idx) in fields"
            :key="field.key"
            class="questionOptions"
          >
            <div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  background-color: #f5f5f5;
                  padding-inline: 1rem;
                  border-top-left-radius: 1rem;
                  border-top-right-radius: 1rem;
                "
              >
                <legend style="margin-block: 1.75rem">
                  Option {{ idx + 1 }}
                </legend>
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
              <div class="grid" style="margin-top: 1rem; padding-inline: 1rem">
                <div
                  class="col-12"
                  :style="{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                  }"
                >
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
                </div>
              </div>
            </div>
          </fieldset>

          <div>
            <Button
              severity="info"
              size="small"
              style="margin-top: 1rem, width: fit-content;"
              @click="push({ label: '', value: '' })"
            >
              Add option
            </Button>
          </div>
        </FieldArray>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import InputNumber from "@/components/formElements/InputNumber.vue";
import { inject } from "vue";
import { FieldArray } from "vee-validate";
import Button from "primevue/button";

export default defineComponent({
  name: "QuizForm",
  components: { InputText, InputNumber, FieldArray, Button },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const { value: question } = veeValidateForm.useField("question");
    const { value: order } = veeValidateForm.useField("order");
    const { fields: questionOptions } =
      veeValidateForm.useFieldArray("questionOptions");
    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    return { handlePrevent, question, order, questionOptions };
  },
});
</script>
<style scoped>
.questionOptions {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.1) !important;
  border-radius: 1rem;
  padding: 0rem !important;
}
</style>
