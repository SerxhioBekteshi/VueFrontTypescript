<template>
  <div>
    <form @onSubmit="handleSubmitClicked">
      <div style="margin-top: 1rem">
        <InputText
          name="name"
          :label="'Meal Name'"
          id="name"
          placeholder="Meal Name"
          v-bind="name"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          name="cousine"
          :label="'Cousine'"
          id="cousine"
          placeholder="Cousine"
          v-bind="cousine"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Diet Category'"
          name="dietCategory"
          id="dietCategory"
          placeholder="Diet category"
          v-bind="dietCategory"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Intolerance'"
          name="intolerance"
          id="intolerance"
          placeholder="Intolerance"
          v-bind="intolerance"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Calories'"
          name="calories"
          type="number"
          id="calories"
          placeholder="Calories"
          v-bind="calories"
        />
      </div>

      <div style="margin-top: 1rem">
        <InputText
          :label="'Carbon footprint'"
          name="carbonFootprint"
          type="number"
          id="carbonFootprint"
          placeholder="Carbon footprint"
          v-bind="carbonFootprint"
        />
      </div>
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
    const veeValidateForm = inject("veeValidateForm");
    const { value: name } = veeValidateForm.useField<any>("name");
    const { value: cousine } = veeValidateForm.useField("cousine");
    const { value: carbonFootprint } =
      veeValidateForm.useField("carbonFootprint");
    const { value: dietCategory } = veeValidateForm.useField("dietCategory");
    const { value: calories } = veeValidateForm.useField("calories");
    const { value: intolerance } = veeValidateForm.useField("intolerance");

    console.log(veeValidateForm, "aa");
    const handleSubmitClicked = (event: any) => {
      event.preventDefault();
    };

    return {};
  },
});
</script>
<style></style>
