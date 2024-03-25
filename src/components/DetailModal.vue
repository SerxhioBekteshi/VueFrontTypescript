<template>
  <Modal
    :title="
      modeDrawer === eFormMode.Add.toString()
        ? `Add ${controller}`
        : eFormMode.Edit.toString() === modeDrawer
        ? `Edit ${controller}`
        : `${customTitle}`
    "
    v-model:openModal="openModal"
    @handleClose="handleCloseModal"
    :actions="modalActions"
  >
    <slot></slot>
  </Modal>
  <Toast />
</template>

<script lang="ts">
import { eFormMode } from "@/assets/enums/EFormMode";
import Button from "primevue/button";
import { defineComponent, onMounted, ref, shallowRef } from "vue";
import Modal from "../components/Modal.vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useForm, useField, FieldArray, useFieldArray } from "vee-validate"; // Import useForm
import { provide } from "vue";

export default defineComponent({
  name: "DetailModal",
  components: { Modal, Toast },
  emits: ["customSubmitAction"],
  props: {
    modeDrawer: {
      type: String as () => keyof typeof eFormMode,
    },
    customTitle: { type: String },
    onClose: { type: Function, required: true },
    formData: { type: Object },
    controller: { type: String },
    validationSchema: { type: Object },
    fetchDataAfterSubmit: { type: Function },
    additionalDataToSubmit: { type: Object },
  },
  setup(props, { emit }) {
    const openModal = ref<boolean>(false);
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
      console.log(data, "DATA");
      try {
        if (props.modeDrawer && props.controller) {
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
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
        } else {
          emit("customSubmitAction", data);
        }

        if (props.fetchDataAfterSubmit) {
          props.fetchDataAfterSubmit();
        }
        handleCloseModal();
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    const handleCloseModal = () => {
      openModal.value = false;
      resetForm();
      if (props.onClose) {
        props.onClose();
      }
    };

    const modalActions = shallowRef<any[]>([
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
          severity: "danger",
          onClick: handleCloseModal,
        },
      },
    ]);

    onMounted(() => {
      openModal.value = true;
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
      modalActions,
      openModal,
      handleCloseModal,
    };
  },
});
</script>
<style></style>
