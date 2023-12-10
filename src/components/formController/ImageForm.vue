<template>
  <div>
    <form @onSubmit="(e: any) => e.preventDefault()">
      <InputFile
        :name="'image'"
        :label="'Meal image'"
        :imageData="imageData"
        :controller="controller"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { inject } from "vue";
import InputFile from "../formElements/InputFile.vue";

export default defineComponent({
  name: "MealForm",
  components: { InputFile },
  props: {
    controller: { type: String, required: true },
    imageData: { type: Object, required: true },
  },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const { value: image } = veeValidateForm.useField("image");

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
