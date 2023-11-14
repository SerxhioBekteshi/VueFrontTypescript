<template>
  <div>
    <Paginator
      :template="{
        '640px':
          'PrevPageLink CurrentPageReport NextPageLink RowsPerPageDropdown',
        '960px':
          'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown', //jumpToPageDropdown
        '1300px':
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
        default:
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      }"
      :rows="pageSize"
      :totalRecords="totalItems"
      :rowPerPageDropdown="{ class: 'custom-dropdown-style' }"
      :rowsPerPageOptions="rowsPerPageOptions"
      @page="handleChangePage"
      @update:rows="handleRowDropdownChange"
      :pt="{
        pageButton: ({ props, state, context }) => ({
          class: context.active ? 'bg-primary' : undefined,
        }),
      }"
    >
    </Paginator>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Paginator, { PageState } from "primevue/paginator";

export default defineComponent({
  name: "ProfilePassword",
  components: { Paginator },
  props: {
    pageSize: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    rowsPerPageOptions: { type: Array as () => number[], required: true },
    handleChangePage: {
      type: Function as PropType<(event: PageState) => void>,
      required: true,
    },
    handleRowDropdownChange: {
      type: Function as PropType<(value: number) => void>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
::v-deep .p-paginator {
  background-color: transparent !important;
}
</style>
