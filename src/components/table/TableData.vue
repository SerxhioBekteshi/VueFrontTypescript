<template>
  <DataTable
    removableSort
    :tableClass="showEdit ? 'editable-cells-table' : ''"
    scrollable
    :stripedRows="true"
    :value="tableData"
    ref="dt"
    dataKey="id"
    v-model:selection="selectedRows"
    :editMode="showEdit ? 'cell' : undefined"
    tableStyle="min-width: 50rem"
    @cell-edit-complete="onCellEditComplete"
  >
    <template #header>
      <GenericToolbar
        v-if="tableColumns.length !== 0"
        :actionButton="actionButton"
        :selectColumns="selectColumns"
        :controller="controller"
        @change="handleSearchValue"
        @columns-updated="handleColumnsToShow"
        @insert-clicked="$emit('insert-clicked')"
        :value="searchValue"
        :showExport="showExport"
        :showSearch="showSearch"
        :showAddBt="showAddBt"
        :toggleColumnsVisibility="toggleColumnsVisibility"
      />
    </template>
    <template #footer>
      <div
        style="
          display: flex;
          justify-content: sstart;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
        "
      >
        <Button
          @click="
            () => {
              openModal = true;
              modalInformation = eFormMode.Delete;
            }
          "
          icon="pi pi-trash"
          severity="danger"
          rounded
          outlined
          size="small"
          aria-label="Cancel"
          v-if="selectedRows.length !== 0"
        />

        <TablePaginator
          :pageSize="pageSize"
          :totalItems="totalItems"
          :rowsPerPageOptions="rowsPerPageOptions"
          :handleChangePage="(event: any) => currentPage = event.page + 1"
          :handleRowDropdownChange="handleRowDropdownChange"
        />
      </div>

      <div style="display: flex; justify-content: center; margin-top: 1.5rem">
        In total there are {{ totalItems ? totalItems : 0 }} rows.
      </div>
    </template>
    <template #empty>
      <div v-if="dataLoading">
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <ProgressSpinner />
        </div>
      </div>
      <div v-else>
        <Message severity="error">There are no data</Message>
      </div>
    </template>

    <!-- <TableHeader
      v-if="tableColumns.length != 0"
      :columns="tableColumns"
      :rowCount="totalItems"
      :showEdit="showEdit"
      :showDelete="showDelete"
      :showCustomRowBt="showCustomRowBt"
    /> -->

    <Column
      :selectionMode="showDelete ? 'multiple' : undefined"
      headerStyle="width: 3rem"
    ></Column>

    <Column
      v-for="(column, index) in tableColumns"
      :key="index"
      :field="column.propertyName"
      :header="column.title"
      sortable
    >
      <template #body="slotProps">
        <div v-if="dataLoading">
          <Skeleton width="80%" height="1.5rem" />
        </div>
        <div v-else>
          <TableCell
            :cellValue="
              slotProps.data[`${column.propertyName}`]
                ? slotProps.data[`${column.propertyName}`]
                : slotProps.data[`${column.propertyName}`] === null
                ? 'NULL'
                : tableColumns[tableColumns.length - 1]
            "
            :cellColumn="column"
            :rowId="slotProps.data[`id`]"
            :additionalData="slotProps"
            :fieldToShowOnModalDelete="'name'"
            @custom-row-bt-clicked="
              $emit('custom-row-bt-clicked', slotProps.data.id)
            "
            @edit-clicked="
              $emit('edit-clicked', slotProps.data, slotProps.data.id)
            "
            @delete-clicked="openModalFunction"
            @on-cell-double-click="handleDoubleClick"
          />
        </div>
      </template>
      <!-- <template v-if="showEdit" #editor="{ data, field }">
        <CellEditor
          v-model="data[field]"
          :data="data"
          :field="field"
          :column="column"
          @input="handleCellEditorInput"
        />
      </template> -->
    </Column>
  </DataTable>

  <Modal
    v-model:openModal="openModal"
    @handleClose="() => (openModal = false)"
    :title="
      modalInformation === eFormMode.Delete
        ? `Delete ${controller}`
        : 'Data preview'
    "
    :actions="modalInformation === eFormMode.Delete ? modalActions : []"
  >
    <div
      v-if="modalInformation === eFormMode.Delete && selectedRows.length !== 0"
    >
      Are you sure you want to delete these users?
    </div>
    <div v-else-if="modalInformation === eFormMode.Delete">
      Are you sure you want to delete
      <span v-if="fieldModalToShow" style="font-weight: bold">
        {{ fieldModalToShow.name }}
      </span>
      ?
    </div>
    <div v-else>
      <div v-if="modalViewRenderType === eColumnType.Object">
        <DynamicObject :items="fieldModalToShow" />
      </div>
      <div v-else-if="modalViewRenderType === eColumnType.Array">
        <DynamicObject :items="fieldModalToShow" />
      </div>
    </div>
  </Modal>
  <Toast />
</template>

<script lang="ts">
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import Toast from "primevue/toast";
import Skeleton from "primevue/skeleton";
import {
  // computed,
  defineComponent,
  onMounted,
  ref,
  shallowRef,
  toRefs,
  watch,
} from "vue";
import axios from "axios";
import Message from "primevue/message";
import Modal from "@/components/Modal.vue";
import IColumn from "@/interfaces/table/IColumn";
import GenericToolbar from "@/components/GenericToolbar.vue";
// import TableHeader from "./TableHeader.vue";
import TableCell from "./TableCell.vue";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
// import CellEditor from "@/components/table/CellEditor.vue";
import { eFilterOperator } from "@/assets/enums/eFilterOperator";
import TablePaginator from "./TablePaginator.vue";
import ISelectColumn from "@/interfaces/database/ISelectColumn";
import { eFormMode } from "@/assets/enums/EFormMode";
import eColumnType from "@/assets/enums/eColumnType";
import IFilter from "@/interfaces/table/IFilter";
import DynamicObject from "./DynamicObject.vue";
interface Action {
  component: any;
  props: Record<string, unknown>;
}

export default defineComponent({
  name: "TableData",
  components: {
    DataTable,
    Column,
    Message,
    Modal,
    GenericToolbar,
    // TableHeader,
    TableCell,
    Toast,
    Skeleton,
    ProgressSpinner,
    // CellEditor,
    DynamicObject,
    Button,
    TablePaginator,
  },
  props: {
    controller: { type: String },
    checkbox: { type: Boolean, default: false },
    actions: {
      type: [Array, Object, String, Number, Boolean, Function],
      default: null,
    },
    showExport: { type: Boolean, default: true },
    showEdit: { type: Boolean, default: true },
    showAddBt: { type: Boolean, default: true },
    showDelete: { type: Boolean, default: true },
    showSearch: { type: Boolean, default: true },
    showCustomRowBt: { type: Boolean, default: false },
    actionButton: { type: Object as () => Action, default: null },
    keyWhereFilter: { type: String, default: "" },
    selectableRows: { type: Boolean, default: true },
    toggleColumnsVisibility: { type: Boolean, default: true },
  },
  emits: [
    "edit-clicked",
    "custom-row-bt-clicked",
    "insert-clicked",
    "on-cell-double-click",
  ],
  enums: {
    eFormMode,
    eColumnType,
  },
  setup(props) {
    const toast = useToast();
    const modalInformation = ref<string>("");
    const modalViewRenderType = ref<any>();

    const {
      controller,
      // checkbox,
      // actions,
      // showExport = false,
      // showAddBt,
      // showEdit,
      // showDelete,
      // showSearch,
      // showCustomRowBt,
      // keyWhereFilter,
      // selectableRows,
      // toggleColumnsVisibility,
    } = toRefs(props);

    const openModalFunction = (field: any, rowId: number) => {
      fieldModalToShow.value = { name: field, id: rowId };
      modalInformation.value = eFormMode.Delete;
      openModal.value = true;
    };

    const handleDoubleClick = (cellValue: any, type: any) => {
      modalInformation.value = eFormMode.View;
      fieldModalToShow.value = cellValue;
      modalViewRenderType.value = type;
      openModal.value = true;
    };

    const handleCellEditorInput = (newCellValue: any) => {
      cellValue.value = newCellValue;
    };

    const handleDeleteButtonModal = async () => {
      try {
        const res: any = await axios.delete(
          `${controller.value}/${fieldModalToShow.value.id}`
        );

        if (res !== null) {
          openModal.value = false;
          fetchData();
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
        }
      } catch (err) {
        console.log(err, "err modal delete");
      }
    };

    const handleMultipleDelete = async () => {
      const selectedIds = selectedRows.value.map((row: any) =>
        parseInt(row.id)
      );

      try {
        const res: any = await axios.post(`/table/delete/${controller.value}`, {
          ids: selectedIds,
        });

        if (res !== null) {
          openModal.value = false;
          fetchData();
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          selectedRows.value = [];
        }
      } catch (err) {
        console.log(err, "err multiple delete");
      }
    };

    const selectedRows = ref<any>([]);

    const modalActions = shallowRef<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Delete",
          severity: "danger",
          onclick: () => {
            selectedRows.value.length !== 0
              ? handleMultipleDelete()
              : handleDeleteButtonModal();
          },
        },
      },
      {
        component: Button,
        props: {
          label: "Cancel",
          icon: "pi pi-check",
          severity: "info",
          onclick: () => (openModal.value = false),
        },
      },
    ]);

    const currentPage = ref<number>(1);
    const pageSize = ref<any>(3);
    const totalItems = ref<number>(0);
    const rowsPerPageOptions = ref<any>([3, 5, 10]);
    const selectColumns = ref<ISelectColumn>({ columns: [], firstColumn: {} });
    const tableColumns = ref<IColumn[]>([]);
    const searchValue = ref<string>("");
    const tableData = ref<any>();

    const dataLoading = ref<boolean>(true);
    const openModal = ref<boolean>(false);
    const fieldModalToShow = ref<any>(null);

    const cellValue = ref<any>(null);

    const fetchData = async () => {
      dataLoading.value = true;
      try {
        const filters: IFilter[] = [];

        if (props.keyWhereFilter) {
          const filterObject = {
            columnName: props.keyWhereFilter,
            operation: eFilterOperator.Equal,
            value: props.controller?.split("/")[1],
          };

          filters.push(filterObject);
        }

        const res = await axios.post(
          `/table/${props.controller?.split("/")[0]}`,
          {
            page: currentPage.value,
            pageSize: pageSize.value,
            search: searchValue.value,
            filters: filters,
          }
        );
        if (res !== null) {
          tableData.value = res.data.rows;
          totalItems.value = res.data.totalCount;
          tableColumns.value = res.data.columns;
          selectColumns.value.columns = res.data.columns.slice(1);
          selectColumns.value.firstColumn = res.data.columns[0];
        }
      } catch (err: any) {
        console.error(err);
      }
      dataLoading.value = false;
    };

    const handleRowDropdownChange = (rowsPerPage: any) => {
      pageSize.value = rowsPerPage;
      currentPage.value = 1;
    };

    watch([pageSize, currentPage, searchValue, controller], () => {
      fetchData();
    });

    // watch(selectedRows, (newValue) => {
    //   console.log("myState changed:", newValue);
    // });

    onMounted(() => {
      fetchData();
    });

    const handleSearchValue = (event: any) => {
      setTimeout(() => {
        searchValue.value = event.target.value;
        currentPage.value = 1;
      }, 100);
    };

    const handleColumnsToShow = (columns: any) => {
      tableColumns.value = [selectColumns.value.firstColumn, ...columns];
    };

    const onCellEditComplete = async (event: any) => {
      let { data, field, newValue } = event;
      if (data[field] === cellValue.value) {
        toast.add({
          life: 3000,
          detail: `Can't edit with the same value`,
          severity: "error",
          // summary: "This field is a required one",
        });
        cellValue.value = null;
      } else {
        if (!cellValue.value) {
          toast.add({
            life: 3000,
            detail: `Can't leave empty cell`,
            severity: "error",
            summary: "This field is a required one",
          });
          cellValue.value = null;
        } else {
          data[field] = cellValue;
          try {
            const res: any = await axios.put(
              `${controller.value}/${data.id}`,
              data
            );

            if (res != null) {
              toast.add({
                life: 3000,
                detail: `Field ${field} was edited successfully`,
                severity: "success",
                summary: "info",
              });
            }
            cellValue.value = null;
          } catch (err) {
            console.log(err, "ERR");
          }
        }
      }
    };

    return {
      currentPage,
      pageSize,
      searchValue,
      rowsPerPageOptions,
      modalActions,
      tableData,
      dataLoading,
      openModal,
      totalItems,
      tableColumns,
      selectColumns,
      fieldModalToShow,
      selectedRows,
      eFormMode,
      modalInformation,
      modalViewRenderType,
      eColumnType,
      handleMultipleDelete,
      openModalFunction,
      handleRowDropdownChange,
      handleSearchValue,
      onCellEditComplete,
      handleCellEditorInput,
      fetchData,
      handleColumnsToShow,
      handleDoubleClick,
    };
  },
});
</script>
<style scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
