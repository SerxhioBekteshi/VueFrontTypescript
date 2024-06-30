<template>
  <div>
    <form @submit.prevent="handlePrevent" v-if="selectData">
      <div class="gapper">
        <InputText
          :name="'name'"
          :label="'Meal Name'"
          :id="'name'"
          :placeholder="'Meal Name'"
        />
      </div>

      <div class="gapper">
        <div
          v-if="
            !optionContainsValue('cousine', veeValidateForm.values.cousine) &&
            modeDrawer === eFormMode.Edit.toString()
          "
        >
          <InputTextPrimeVue
            :name="'cousine'"
            :label="'Cousine'"
            :value="veeValidateForm.values.cousine"
            :disabled="true"
            style="width: 100%"
          />
        </div>
        <div v-else>
          <InputSelect
            :name="'cousine'"
            :label="'Cousine'"
            :id="'cousine'"
            :placeholder="'Cousine'"
            :options="getQuestionOptionsByFieldName(selectData, 'cousine')"
          />
        </div>
      </div>

      <div class="gapper">
        <div
          v-if="
            !optionContainsValue(
              'dietCategory',
              veeValidateForm.values.dietCategory
            ) && modeDrawer === eFormMode.Edit.toString()
          "
        >
          <InputTextPrimeVue
            :name="'dietCategory'"
            :label="'Diet Category'"
            :value="veeValidateForm.values.dietCategory"
            :disabled="true"
            style="width: 100%"
          />
        </div>
        <div v-else>
          <InputSelect
            :name="'dietCategory'"
            :label="'Diet Category'"
            :id="'dietCategory'"
            :placeholder="'Diet Category'"
            :options="getQuestionOptionsByFieldName(selectData, 'dietCategory')"
          />
        </div>
      </div>

      <div class="gapper">
        <div
          v-if="
            !optionContainsValue(
              'intolerance',
              veeValidateForm.values.intolerance
            ) && modeDrawer === eFormMode.Edit.toString()
          "
        >
          <InputTextPrimeVue
            :name="'intolerance'"
            :label="'Intolerance'"
            :value="veeValidateForm.values.intolerance"
            :disabled="true"
            style="width: 100%"
          />
        </div>
        <div v-else>
          <InputSelect
            :name="'intolerance'"
            :label="'Intolerance'"
            :id="'intolerance'"
            :placeholder="'Intolerance'"
            :options="getQuestionOptionsByFieldName(selectData, 'intolerance')"
          />
        </div>
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
        <div
          v-if="
            !optionContainsValue(
              'achievement',
              veeValidateForm.values.achievement
            ) && modeDrawer === eFormMode.Edit.toString()
          "
        >
          <InputTextPrimeVue
            :name="'achievement'"
            :label="'Achievement'"
            :value="veeValidateForm.values.achievement"
            :disabled="true"
            style="width: 100%"
          />
        </div>
        <div v-else>
          <InputSelect
            :name="'achievement'"
            :label="'Achievement'"
            :id="'achievement'"
            :placeholder="'Achievement'"
            :options="getQuestionOptionsByFieldName(selectData, 'achievement')"
          />
        </div>
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
import { default as InputTextPrimeVue } from "primevue/inputtext";
import { eFormMode } from "@/assets/enums/EFormMode";

export default defineComponent({
  name: "MealForm",
  components: {
    InputText,
    InputNumber,
    Button,
    FieldArray,
    InputSelect,
    InputTextPrimeVue,
  },
  props: {
    modeDrawer: {
      type: String as () => keyof typeof eFormMode,
    },
  },
  enums: {
    eFormMode,
  },
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

    const optionContainsValue = (fieldName: string, value: string) => {
      return getQuestionOptionsByFieldName(selectData.value, fieldName).some(
        (option: any) => option.label === value || option.value === value
      );
    };

    console.log(veeValidateForm.values.achievement, "awdawd");
    return {
      handlePrevent,
      getQuestionOptionsByFieldName,
      optionContainsValue,
      selectData,
      ingredients,
      veeValidateForm,
      eFormMode,
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
