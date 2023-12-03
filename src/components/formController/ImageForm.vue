<template>
  <div>
    <form @onSubmit="handlePrevent">
      <!-- <InputFile :name="'image'" :label="'Meal image'" :id="'mealImage'" /> -->
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import { inject } from "vue";

export default defineComponent({
  name: "MealForm",
  components: {},
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const { value: image } = veeValidateForm.useField("name");

    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    return {
      handlePrevent,
      image,
    };
  },
});
</script>
<style scoped></style>
