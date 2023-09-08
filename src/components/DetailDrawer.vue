<template>
  <Drawer
    :title="
      modeDrawer === eFormMode.Add.toString()
        ? `Add ${controller}`
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
import { defineComponent, onMounted, ref, watch } from "vue";
import Drawer from "../components/Drawer.vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useForm, useField, FieldArray } from "vee-validate"; // Import useForm
import { provide } from "vue";

export default defineComponent({
  name: "DetailDrawer",
  components: { Drawer, Toast },
  props: {
    modeDrawer: {
      type: String as () => keyof typeof eFormMode,
    },
    onClose: { type: Function },
    formData: { type: Object },
    controller: { type: String },
    validationSchema: { type: Object },
    fetchDataAfterSubmit: { type: Function },
  },
  setup(props) {
    const openDrawer = ref<boolean>(false);
    const toast = useToast();
    const { handleSubmit, resetForm, setFieldError, setErrors } = useForm({
      initialValues: props.formData,
      validationSchema: props.validationSchema,
    });

    // if (
    //   (props.formData !== null || props.formData !== undefined) &&
    //   openDrawer
    // ) {
    provide("veeValidateForm", {
      handleSubmit,
      resetForm,
      setFieldError,
      setErrors,
      useField,
      FieldArray,
    });
    // }

    const handleFormSubmit = async (data: any) => {
      let res: any = null;
      console.log(data, "aaaa");
      try {
        if (props.modeDrawer === eFormMode.Add.toString()) {
          res = await axios.post(`${props.controller}`, data);
        } else {
          res = await axios.put(
            `${props.controller}/${props.formData && props.formData.id}`,
            data
          );
        }

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

    const drawerActions = ref<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Submit",
          severity: "primary",
          onClick: handleSubmit(handleFormSubmit),
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
