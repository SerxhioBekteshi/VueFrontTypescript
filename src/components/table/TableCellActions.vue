<template>
  <div
    v-if="columnIcons && columnIcons.length !== 0"
    style="display: flex; justify-content: end"
  >
    <div v-for="(icon, index) in columnIcons.icons" :key="index">
      <Button
        @click="handleIconClick(icon)"
        :severity="icon.color"
        :icon="icon.name"
        rounded
        text
        size="small"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

export default defineComponent({
  name: "TableCell",
  components: { Button },
  props: {
    columnIcons: {
      type: null,
    },
    additionalData: {
      type: null,
    },
    fieldToShowOnModalDelete: {
      type: null,
    },
  },
  setup(props, { emit }) {
    const handleIconClick = (icon: any) => {
      switch (icon.icon) {
        case "edit":
          emit(
            "edit-clicked",
            props.additionalData.data,
            props.additionalData.data.id
          );

          break;
        case "delete":
          emit(
            "delete-clicked",
            props.additionalData.data[props.fieldToShowOnModalDelete],
            props.additionalData.data.id
          );
          break;

        case "details":
          emit("custom-row-bt-clicked", props.additionalData.data.id);
          break;
      }
    };

    return {
      handleIconClick,
    };
  },
});
</script>
<style></style>
