<template>
  <Drawer
    :title="
      modeDrawer === eFormMode.Add.toString()
        ? `Add ${controller}`
        : modeDrawer === eFormMode.Upload.toString()
        ? 'Upload image'
        : `Edit ${controller}`
    "
    v-model:openDrawer="openDrawer"
    @handleClose="handleCloseDrawer"
    :actions="drawerActions"
  >
    <div v-if="isLoading"><ProgressSpinner /></div>
    <div v-else>
      <slot></slot>
    </div>
  </Drawer>
  <Toast />
</template>

<script lang="ts">
import { eFormMode } from "@/assets/enums/EFormMode";
import Button from "primevue/button";
import { defineComponent, onMounted, ref, shallowRef } from "vue";
import Drawer from "../components/Drawer.vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useForm, useField, FieldArray, useFieldArray } from "vee-validate"; // Import useForm
import { provide } from "vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "DetailDrawer",
  components: { Drawer, Toast, ProgressSpinner },
  props: {
    modeDrawer: {
      type: String as () => keyof typeof eFormMode,
    },
    onClose: { type: Function, required: true },
    formData: { type: Object },
    controller: { type: String, required: true },
    validationSchema: { type: Object, required: true },
    fetchDataAfterSubmit: { type: Function },
    showSubmitButton: { type: Boolean, default: true },
    additionalDataToSubmit: { type: Object },
    shouldRefreshPageIfFieldNull: {
      type: String,
      required: false,
      default: "",
    },
    width: {
      type: Number,
    },
  },
  enums: {
    eFormMode,
  },
  emits: ["validateDataBeforeSubmit"],
  setup(props, { emit }) {
    const openDrawer = ref<boolean>(false);
    const toast = useToast();
    const isLoading = ref<boolean>(false);

    const { handleSubmit, resetForm, setFieldError, setErrors, values } =
      useForm({
        initialValues: props.formData,
        validationSchema: props.validationSchema,
      });

    provide("veeValidateForm", {
      handleSubmit,
      resetForm,
      setFieldError,
      setErrors,
      useField,
      FieldArray,
      useFieldArray,
      values,
    });

    const handleFormSubmit = async (data: any) => {
      let res: any = null;
      if (
        Object.prototype.hasOwnProperty.call(emit, "validateDataBeforeSubmit")
      ) {
        emit("validateDataBeforeSubmit", data, async (validatedData: any) => {
          await submitData(validatedData, res);
        });
      } else {
        await submitData(data, res);
      }
    };

    const submitData = async (data: any, res: any) => {
      try {
        if (props.modeDrawer === eFormMode.Add.toString()) {
          res = await axios.post(`${props.controller}`, {
            ...data,
            ...(props.additionalDataToSubmit
              ? props.additionalDataToSubmit
              : {}),
          });
        } else {
          res = await axios.put(
            `${props.controller}/${props.formData && props.formData.id}`,
            data
          );
        }

        // if (res && res.status === "201") {
        //   //some custom action
        //   emit("");
        // } else
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          if (props.fetchDataAfterSubmit) {
            await props.fetchDataAfterSubmit();
          }
          handleCloseDrawer();
          if (
            props.shouldRefreshPageIfFieldNull &&
            data[`${props.shouldRefreshPageIfFieldNull}`] == null
          ) {
            location.reload();
          }
        }
      } catch (Error: any) {
        toast.add({
          life: 3000,
          detail: Error,
          severity: "error",
          summary: "info",
        });
      }
    };

    const handleCloseDrawer = () => {
      openDrawer.value = false;
      resetForm();
      if (props.onClose) {
        props.onClose();
      }
    };

    const drawerActions = shallowRef<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Submit",
          severity: "primary",
          onClick: handleSubmit(handleFormSubmit),
          // disabled: !props.showSubmitButton,
        },
      },
      {
        component: Button,
        props: {
          label: "Cancel",
          icon: "pi pi-check",
          severity: "info",
          onClick: handleCloseDrawer,
        },
      },
    ]);

    onMounted(() => {
      isLoading.value = true;
      openDrawer.value = true;
      isLoading.value = false;
    });

    // watch([props.formData], ([newFormData]) => {
    //   if (newFormData) {
    //         for (const [key, value] of Object.entries(newFormData)) {
    //           newSetValue(key, value);
    //         }
    //   }
    // });

    return {
      eFormMode,
      drawerActions,
      openDrawer,
      isLoading,
      handleCloseDrawer,
    };
  },
});
</script>
<style></style>
