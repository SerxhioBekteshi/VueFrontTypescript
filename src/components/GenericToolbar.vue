<template>
  <div class="flex justify-content-between flex-wrap gap-3 w-full">
    <div v-if="showAddBt">
      <div>
        <component
          v-if="actionButton"
          :is="actionButton.component"
          v-bind="actionButton.props"
        ></component>
      </div>
    </div>
    <div class="flex flex-wrap gap-3">
      <div v-if="showSearch">
        <div class="p-inputgroup flex-1">
          <InputPV
            :value="value"
            @change="$emit('change', $event)"
            placeholder="Search"
          />
          <Button icon="pi pi-search" severity="secondary" outlined disabled />
        </div>
      </div>

      <div v-if="customComponent">
        <component
          :is="customComponent.component"
          v-bind="customComponent.props"
          @update:modelValue="$emit('update:modelValue', $event)"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import InputPV from "primevue/inputtext";
import { defineComponent } from "vue";

interface Action {
  component: any;
  props: Record<string, unknown>;
}

interface Layout {
  component: any;
  props: Record<string, unknown>;
}

export default defineComponent({
  name: "GenericToolbar",
  components: { Button, InputPV, DataViewLayoutOptions },
  props: {
    tableColumns: Array,
    controller: String,
    showExport: Boolean,
    onChange: Function,
    value: String,
    showSearch: Boolean,
    showAddBt: Boolean,
    customComponent: { type: Object as () => Layout },
    actionButton: { type: Object as () => Action },
  },
  setup(props) {
    return {};
  },
});
</script>
<style scoped></style>
