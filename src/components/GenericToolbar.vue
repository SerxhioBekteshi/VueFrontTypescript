<template>
  <div
    :class="`flex justify-content-${
      showAddBt ? 'between' : 'end'
    } flex-wrap gap-3 w-full`"
  >
    <div vstyle="text-align: left">
      <MultiSelect
        :modelValue="selectedColumns"
        :options="tableColumns"
        optionLabel="title"
        @update:modelValue="onToggle"
        display="chip"
        placeholder="Select Columns"
      />
    </div>
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
import IColumn from "@/interfaces/table/IColumn";
import Button from "primevue/button";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import InputPV from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import { PropType, defineComponent, ref, watch } from "vue";

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
    tableColumns: { type: Array as PropType<IColumn[]>, required: true },
    controller: String,
    showExport: Boolean,
    onChange: Function,
    value: String,
    showSearch: Boolean,
    showAddBt: Boolean,
    customComponent: { type: Object as () => Layout },
    actionButton: { type: Object as () => Action },
  },
  setup(props, { emit }) {
    const selectedColumns = ref<IColumn[]>(props.tableColumns);

    const onToggle = (val: any) => {
      selectedColumns.value = props.tableColumns?.filter((col: any) =>
        val.includes(col)
      );
      emit("columns-updated", selectedColumns.value);
    };

    return { onToggle, selectedColumns };
  },
});
</script>
<style scoped></style>
