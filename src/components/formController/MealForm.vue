<template>
  <div>
    <form @onSubmit="handlePrevent" v-if="selectData">
      <div class="gapper">
        <InputText
          :name="'name'"
          :label="'Meal Name'"
          :id="'name'"
          :placeholder="'Meal Name'"
        />
      </div>

      <div class="gapper">
        <InputSelect
          :name="'cousine'"
          :label="'Cousine'"
          :id="'cousine'"
          :placeholder="'Cousine'"
          :options="getQuestionOptionsByFieldName(selectData, 'cousine')"
        />
      </div>

      <div class="gapper">
        <InputSelect
          :name="'dietCategory'"
          :label="'Diet Category'"
          :id="'dietCategory'"
          :placeholder="'Diet Category'"
          :options="getQuestionOptionsByFieldName(selectData, 'dietCategory')"
        />
      </div>

      <div class="gapper">
        <InputSelect
          :name="'intolerance'"
          :label="'Intolerance'"
          :id="'intolerance'"
          :placeholder="'Intolerance'"
          :options="getQuestionOptionsByFieldName(selectData, 'intolerance')"
        />
      </div>

      <div class="gapper">
        <InputText
          :name="'calories'"
          :label="'Calories'"
          :id="'calories'"
          :placeholder="'Calories'"
        />
      </div>

      <div class="gapper">
        <InputSelect
          :name="'achievement'"
          :label="'Achievement'"
          :id="'achievement'"
          :placeholder="'Achievement'"
          :options="getQuestionOptionsByFieldName(selectData, 'achievement')"
        />
      </div>

      <div class="gapper">
        <InputNumber
          :label="'Carbon footprint'"
          :name="'carbonFootprint'"
          :id="'carbonFootprint'"
          :placeholder="'Carbon footprint'"
        />
      </div>

      <div class="gapper">
        <InputNumber
          :label="'Price'"
          :name="'price'"
          :id="'price'"
          :placeholder="'Price'"
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
        <FieldArray name="ingredients" v-slot="{ fields, push, remove }">
          <div style="margin-left: 1rem; margin-block: 0.5rem">
            <strong> Add ingredients </strong>
          </div>
          <fieldset
            v-for="(field, idx) in fields"
            :key="field.key"
            class="ingredients"
          >
            <div style="display: flex; justify-content: space-between">
              <div style="display: flex">
                <div>
                  <InputText
                    :name="`ingredients[${idx}].name`"
                    :label="'Name'"
                    :id="`name_${idx}`"
                    :placeholder="'Ingredient name'"
                  />
                </div>

                <div>
                  <InputNumber
                    :name="`ingredients[${idx}].portion`"
                    :label="'Portion'"
                    :id="`portion_${idx}`"
                    :placeholder="'Portion'"
                  />
                </div>
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
          </fieldset>

          <div style="margin-left: 1rem; margin-top: 0.5rem">
            <Button
              label="+ new ingredient"
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
import { defineComponent, onMounted, ref } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import { inject } from "vue";
import { FieldArray } from "vee-validate";
import InputNumber from "@/components/formElements/InputNumber.vue";
import Button from "primevue/button";
import InputSelect from "@/components/formElements/InputSelect.vue";
import axios from "axios";

export default defineComponent({
  name: "MealForm",
  components: { InputText, InputNumber, Button, FieldArray, InputSelect },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const { fields: ingredients } =
      veeValidateForm.useFieldArray("ingredients");

    const selectData = ref<any>();

    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    onMounted(async () => {
      try {
        const res: any = await axios.get(`quiz/get-all`);

        if (res && res.data) {
          selectData.value = res.data;
        }
      } catch (err: any) {
        console.log(err);
      }
    });

    const getQuestionOptionsByFieldName = (data: any, fieldName: string) => {
      const question = selectData.value.find(
        (item: any) => item.fieldName === fieldName
      );
      if (question) {
        return question.questionOptions;
      }

      return [];
    };

    return {
      handlePrevent,
      getQuestionOptionsByFieldName,
      selectData,
      ingredients,
    };
  },
});
</script>
<style scoped>
.gapper {
  margin-top: 1.5rem;
}

.ingredients {
  border: 1px solid transparent;
  border-top-color: rgba(0, 0, 0, 0) !important;
  border-radius: 1rem;
  padding: 1rem !important;
}
</style>
