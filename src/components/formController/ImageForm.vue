<template>
  <div>
    <form @onSubmit="(e: any) => e.preventDefault()">
      <InputFile
        :name="'image'"
        :label="'Meal image'"
        :imageData="imageData"
        :controller="controller"
        :includeId="includeId"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { inject } from "vue";
import InputFile from "../formElements/InputFile.vue";
import { string } from "yup";

export default defineComponent({
  name: "MealForm",
  components: { InputFile },
  props: {
    controller: { type: String, required: true },
    imageData: { type: Object, required: true },
    includeId: { type: Boolean, default: true },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
