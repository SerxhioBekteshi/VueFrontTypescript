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
    <slot></slot>
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

export default defineComponent({
  name: "DetailDrawer",
  components: { Drawer, Toast },
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
  },
  enums: {
    eFormMode,
  },
  setup(props) {
    const openDrawer = ref<boolean>(false);
    const toast = useToast();
    const { handleSubmit, resetForm, setFieldError, setErrors } = useForm({
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
    });

    const handleFormSubmit = async (data: any) => {
      let res: any = null;
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

        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          if (props.fetchDataAfterSubmit) {
            props.fetchDataAfterSubmit();
          }
          handleCloseDrawer();
          if (data[`${props.shouldRefreshPageIfFieldNull}`] == null) {
            location.reload();
          }
        }
      } catch (err) {
        console.log(err, "ERR");
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
      openDrawer.value = true;
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
      handleCloseDrawer,
    };
  },
});
</script>
<style></style>
