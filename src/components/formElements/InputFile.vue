<template>
  <FileUpload
    @select="handleFileSelection($event)"
    :multiple="false"
    @uploader="handleFileUpload($event)"
    :maxFileSize="1000000"
    accept="image/*"
    :custom-upload="true"
  />

  <div v-if="showError">
    <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
  </div>

  <Toast />
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "InputFile",
  components: { ValidationError, Toast },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    showError: { type: Boolean, default: true },
    controller: { type: String },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    const toast = useToast();

    const handleFileSelection = (event: any) => {
      console.log(event.files[event.files.length - 1].objectURL);
      // blobImage.value = event.files[event.files.length - 1].objectURL;
    };

    const handleFileUpload = async (event: any) => {
      const file = event.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res: any = await axios.post(
          `/${props.controller}/image`,
          formData
        );

        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
        }
      } catch (err) {
        console.log(err, "FILE ERROR UPLOAD");
      }
    };

    return { value, errorMessage, meta, handleFileSelection, handleFileUpload };
  },
});
</script>
<style scoped></style>
