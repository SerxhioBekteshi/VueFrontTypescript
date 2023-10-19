<template>
  <div>
    <form @onSubmit="handlePrevent">
      <div style="margin-top: 1rem">
        <InputText
          name="name"
          :label="'Meal Name'"
          id="name"
          placeholder="Meal Name"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          name="cousine"
          :label="'Cousine'"
          id="cousine"
          placeholder="Cousine"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Diet Category'"
          name="dietCategory"
          id="dietCategory"
          placeholder="Diet category"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Intolerance'"
          name="intolerance"
          id="intolerance"
          placeholder="Intolerance"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Calories'"
          name="calories"
          type="number"
          id="calories"
          placeholder="Calories"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Carbon footprint'"
          name="carbonFootprint"
          type="number"
          id="carbonFootprint"
          placeholder="Carbon footprint"
        />
      </div>

      <!-- <div>
        <FieldArray
          class="ingredients"
          name="ingredients"
          v-slot="{ fields, push, remove }"
        >
          {{ (fields, "fields") }}

          <fieldset v-for="(field, idx) in fields" :key="field.key">
            <legend>Ingredient #{{ idx }}</legend>

            <div class="grid">
              <div
                class="col-9"
                :style="{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }"
              >
                <div :style="{ display: 'flex', flexDirection: 'column' }">
                  <label :for="`name_${idx}`">Name</label>
                  <InputText
                    :type="'text'"
                    :id="`name_${idx}`"
                    :name="`ingredients[${idx}].name`"
                  />
                  <ErrorMessage :name="`ingredients[${idx}].name`" />
                </div>

                <div :style="{ display: 'flex', flexDirection: 'column' }">
                  <label :for="`portion_${idx}`">Portion</label>
                  <InputText
                    :type="'number'"
                    :id="`portion_${idx}`"
                    :name="`ingredients[${idx}].portion`"
                  />
                  <ErrorMessage :name="`ingredients[${idx}].portion`" />
                </div>
              </div>

              <div class="col-3" style="display: flex; align-items: center">
                <Button
                  icon="pi pi-times"
                  rounded
                  severity="danger"
                  @click="remove(idx)"
                  :disabled="fields.length <= 1"
                />
              </div>
            </div>
          </fieldset>

          <Button
            severity="success"
            style="margin-top: 1rem"
            @click="push({ name: '', portion: null })"
          >
            Add ingredient
          </Button>
        </FieldArray>
      </div> -->
    </form>
  </div>
</template>

<script lang="ts">
// import Button from "primevue/button"
import { defineComponent, ref } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import { inject } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MealForm",
  components: { InputText },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const { value: name } = veeValidateForm.useField("name");
    const { value: cousine } = veeValidateForm.useField("cousine");
    const { value: carbonFootprint } =
      veeValidateForm.useField("carbonFootprint");
    const { value: dietCategory } = veeValidateForm.useField("dietCategory");
    const { value: calories } = veeValidateForm.useField("calories");
    const { value: intolerance } = veeValidateForm.useField("intolerance");

    console.log(name.value);
    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    return {
      handlePrevent,
      name,
      cousine,
      carbonFootprint,
      dietCategory,
      calories,
      intolerance,
    };
  },
});
</script>
<style></style>
