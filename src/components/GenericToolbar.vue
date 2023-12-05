<template>
  <div
    style="
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    "
  >
    <div
      style="display: flex; justify-content: start; flex-wrap: wrap; gap: 1rem"
    >
      <div v-if="toggleColumnsVisibility">
        <MultiSelect
          :modelValue="selectedColumns"
          :options="selectColumns?.columns"
          optionLabel="title"
          @update:modelValue="onToggle"
          display="chip"
          placeholder="Select Columns"
          panel-style=""
          emptyMessage="No results found"
        />
      </div>
      <div v-if="showAddBt">
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
import ISelectColumn from "@/interfaces/database/ISelectColumn";
import IColumn from "@/interfaces/table/IColumn";
import Button from "primevue/button";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import InputPV from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import { defineComponent, markRaw, ref } from "vue";

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
  components: { Button, InputPV, DataViewLayoutOptions, MultiSelect },
  props: {
    selectColumns: { type: Object as () => ISelectColumn },
    controller: String,
    showExport: Boolean,
    onChange: Function,
    value: String,
    showSearch: Boolean,
    showAddBt: Boolean,
    toggleColumnsVisibility: Boolean,
    customComponent: { type: Object as () => Layout },
    actionButton: { type: Object as () => Action },
  },
  setup(props, { emit }) {
    const selectedColumns = ref<IColumn[]>(props.selectColumns?.columns ?? []);

    const onToggle = (val: any) => {
      selectedColumns.value = (props.selectColumns?.columns ?? [])?.filter(
        (col: any) => val.includes(col)
      );
      emit("columns-updated", selectedColumns.value);
    };

    // const actionButton = markRaw(props.actionButton)

    return { onToggle, selectedColumns };
  },
});
</script>
<style scoped>
::v-deep(.p-multiselect-label) {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.5rem !important;
}
</style>
