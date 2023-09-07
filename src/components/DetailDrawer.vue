<template>
  <Drawer
    :title="'title'"
    v-model:openDrawer="openDrawer"
    @handleClose="handleCloseDrawer"
    :actions="drawerActions"
  >
    <!-- <div>
    <FormProvider v-if="formData !== undefined && open" :methods="methods">
      <slot></slot>
    </FormProvider>
  </div> -->
    <div>SOME DRAWER DIV</div>
  </Drawer>
</template>

<script lang="ts">
import { eFormMode } from "@/assets/enums/EFormMode";
import Button from "primevue/button";
import InputPV from "primevue/inputtext";
import { defineComponent, ref } from "vue";
import { string } from "yup";

interface Action {
  component: any;
  props: Record<string, unknown>;
}

export default defineComponent({
  name: "GenericToolbar",
  components: { Button, InputPV },
  props: {
    modeDrawer: {
      type: String,
      validator: (value: eFormMode) => {
        return Object.values(eFormMode).includes(value);
      },
    },
    onClose: { type: Function },
    formData: { type: null },
    controller: { type: string, required: true },
    onSave: { type: Function },
  },
  setup() {
    const openDrawer = ref<boolean>(false);

    const drawerActions = ref<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Submit",
          severity: "primary",
        },
      },
      {
        component: Button,
        props: {
          label: "Cancel",
          icon: "pi pi-check",
          severity: "info",
        },
      },
    ]);

    const handleCloseDrawer = () => {
      //onClose();
      openDrawer.value = false;
    };
    // const eFormMode = {
    //   Add: "Insert",
    //   Edit: "Edit",
    // };

    return { eFormMode, drawerActions, openDrawer, handleCloseDrawer };
  },
});
</script>
<style></style>
