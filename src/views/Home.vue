<template>
  <div>
    <TableData
      :controller="'meals'"
      :actionButton="actionButton"
      :onEditClick="onEditClick"
    />
  </div>
</template>

<script lang="ts">
// import Button from "primevue/button"
import Button from "primevue/button";
import TableData from "../components/TableData.vue";
import { defineComponent, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { eFormMode } from "@/assets/enums/EFormMode";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { TableData },
  setup() {
    const handleAddData = () => {
      modeDrawer.value = eFormMode.Add;
    };

    const onEditClick = () => {
      modeDrawer.value = eFormMode.Edit;
      //from an event emitter from the edit click i get the formData to pass as a state
    };

    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const actionButton = ref<any>({
      component: Button,
      props: {
        type: "Submit",
        icon: PrimeIcons.PLUS,
        label: "Add",
        severity: "primary",
        onClick: handleAddData,
      },
    });

    return { actionButton, handleAddData, onEditClick };
  },
});
</script>
<style></style>
