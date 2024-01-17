<template>
  <div>
    <FileUpload
      @select="handleFileSelection($event)"
      :multiple="false"
      @uploader="handleFileUpload($event)"
      :maxFileSize="1000000"
      accept="image/*"
      :custom-upload="true"
      :cancelLabel="'Remove'"
      @error="handleError"
    >
      <template #content>
        <div v-if="blobImage" class="image-wrapper">
          <img class="image-content" :src="blobImage" alt="imageUpload" />
          <Badge
            v-if="!isLoading"
            :value="'Pending'"
            size="large"
            severity="warning"
          ></Badge>
        </div>
        <div v-else-if="imageData.image">
          <img
            class="image-content"
            :src="`http://localhost:1112/${imageData.image}`"
            alt="imageUpload"
          />
          <Badge
            v-if="!isLoading"
            :value="'Pending'"
            size="large"
            severity="warning"
          ></Badge>
        </div>
      </template>
    </FileUpload>

    <div v-if="showError">
      <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
    </div>

    <Toast />
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent, inject, ref } from "vue";
import axios from "axios";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import FileUpload from "primevue/fileupload";
import Badge from "primevue/badge";

export default defineComponent({
  name: "InputFile",
  components: { ValidationError, Toast, FileUpload, Badge },
  props: {
    imageData: { type: Object, required: true },
    name: { type: String, required: true },
    showError: { type: Boolean, default: true },
    controller: { type: String },
  },
  setup(props) {
    const { value, errorMessage, meta } = useField(() => props.name, undefined);
    const toast = useToast();
    const blobImage = ref<any>();
    const isLoading = ref<boolean>(false);
    console.log(props.imageData);
    const handleFileSelection = (event: any) => {
      blobImage.value = event.files[event.files.length - 1].objectURL;
    };

    const handleError = (event: any) => {
      console.log(event, "EVENT ERROR ");
      toast.add({
        life: 3000,
        detail: "awd",
        severity: "error",
        summary: "error image custom",
      });
    };

    const functionsFromMealPage: any = inject("closeAndFetchData");

    const handleFileUpload = async (event: any) => {
      // isLoading.value = true;
      const file = event.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res: any = await axios.put(
          `/${props.controller}/image/${props.imageData.id}`,
          formData
        );

        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          functionsFromMealPage.close();
          functionsFromMealPage.fetch();
        }
      } catch (err) {
        console.log(err, "FILE ERROR UPLOAD");
      }
      // finally {
      //   setTimeout(() => {
      //     isLoading.value = false;
      //   }, 3000);
      // }
    };

    return {
      value,
      errorMessage,
      meta,
      blobImage,
      isLoading,
      handleFileSelection,
      handleFileUpload,
      handleError,
    };
  },
});
</script>
<style scoped>
.image-wrapper {
  width: fit-content;
  height: 300px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

::v-deep .p-button {
  background-color: #059669 !important;
}
</style>
