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
          :options="getQuestionOptionsByFieldName(selectData, 'calories')"
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
          type="number"
          id="carbonFootprint"
          placeholder="Carbon footprint"
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
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        "
      >
        <FieldArray name="ingredients" v-slot="{ fields, push, remove }">
          <fieldset
            v-for="(field, idx) in fields"
            :key="field.key"
            class="ingredients"
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
                  Ingredient {{ idx + 1 }}
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
                      :name="`ingredients[${idx}].name`"
                      :label="'Enter the ingredient name'"
                      :id="`name_${idx}`"
                      :placeholder="'Ingredient name'"
                    />
                  </div>

                  <div>
                    <InputNumber
                      :name="`ingredients[${idx}].portion`"
                      :label="'Enter the portion'"
                      :id="`portion_${idx}`"
                      :placeholder="'Portion'"
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div style="margin-top: 1rem">
            <Button
              severity="info"
              size="small"
              style="width: fit-content"
              @click="push({ label: '', value: '' })"
            >
              Add ingredient
            </Button>
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

    const { value: name } = veeValidateForm.useField("name");
    const { value: cousine } = veeValidateForm.useField("cousine");
    const { value: carbonFootprint } =
      veeValidateForm.useField("carbonFootprint");
    const { value: dietCategory } = veeValidateForm.useField("dietCategory");
    const { value: calories } = veeValidateForm.useField("calories");
    const { value: intolerance } = veeValidateForm.useField("intolerance");
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
          console.log(selectData.value);

          const sth = selectData.value.find(
            (item: any) => item.fieldName === "cousine"
          );
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
      name,
      cousine,
      carbonFootprint,
      dietCategory,
      calories,
      intolerance,
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
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.1) !important;
  border-radius: 1rem;
  padding: 0rem !important;
}
</style>
