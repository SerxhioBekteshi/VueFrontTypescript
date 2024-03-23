<template>
  <div class="card flex flex-column align-items-center gap-3">
    <Button type="button" label="Toggle All" text @click="toggleAll" />
    <PanelMenu
      v-model:expandedKeys="expandedKeys"
      :model="items"
      class="w-full"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PanelMenu from "primevue/panelmenu";
import { MenuItem } from "primevue/menuitem";
import Button from "primevue/button";

export default defineComponent({
  props: {
    items: { type: Array as () => MenuItem[], required: true },
  },
  components: {
    PanelMenu,
    Button,
  },
  setup(props) {
    const expandedKeys = ref({});

    const toggleAll = () => {
      if (Object.keys(expandedKeys.value).length) collapseAll();
      else expandAll();
    };

    const expandAll = () => {
      for (let node of props.items) {
        expandNode(node);
      }

      expandedKeys.value = { ...expandedKeys.value };
    };

    const collapseAll = () => {
      expandedKeys.value = {};
    };

    const expandNode = (node) => {
      if (node.items && node.items.length) {
        expandedKeys.value[node.key] = true;

        for (let child of node.items) {
          expandNode(child);
        }
      }
    };

    return { expandedKeys, toggleAll };
  },
});
</script>
<style scoped></style>
