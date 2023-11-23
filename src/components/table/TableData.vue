<template>
  <!-- <div v-if="!showAddBt">
    <Button icon="pi pi-external-link" label="Add" />
  </div> -->
  <DataTable
    :tableClass="showEdit ? 'editable-cells-table' : ''"
    scrollable
    :stripedRows="true"
    :value="tableData"
    ref="dt"
    :editMode="showEdit ? 'cell' : undefined"
    tableStyle="min-width: 50rem"
    @cell-edit-complete="onCellEditComplete"
  >
    <template #header>
      <GenericToolbar
        :actionButton="actionButton"
        :tableColumns="tableColumns"
        :controller="controller"
        @change="handleSearchValue"
        :value="searchValue"
        :showExport="showExport"
        :showSearch="showSearch"
        :showAddBt="showAddBt"
      />
    </template>
    <template #footer>
      <TablePaginator
        :pageSize="pageSize"
        :totalItems="totalItems"
        :rowsPerPageOptions="rowsPerPageOptions"
        :handleChangePage="handleChangePage"
        :handleRowDropdownChange="handleRowDropdownChange"
      />

      <div style="display: flex; justify-content: center; margin-top: 1.5rem">
        In total there are {{ totalItems ? totalItems : 0 }} rows.
      </div>
    </template>
    <template #empty>
      <div v-if="dataLoading">
        <div
          style="display: flex; justify-content: center; align-items: center"
          ProgressSpinner
        >
          <ProgressSpinner />
        </div>
      </div>
      <div v-else>
        <Message severity="error">There are no data</Message>
      </div>
    </template>

    <TableHeader
      v-if="tableColumns.length != 0"
      :columns="tableColumns"
      :rowCount="totalItems"
      :showEdit="showEdit"
      :showDelete="showDelete"
      :showCustomRowBt="showCustomRowBt"
    />

    <Column
      v-for="(column, index) in filteredNotIncludedColumns"
      :key="index"
      :field="column.propertyName"
      :header="column.title"
      sortable
    >
      <template #body="slotProps">
        <div v-if="dataLoading">
          <Skeleton width="80%" height="1.5rem" />
        </div>
        <div v-else class="truncate-cell-content">
          <TableCell
            :cellValue="slotProps.data[`${column.propertyName}`]"
            :cellColumn="column"
          />
        </div>
      </template>
      <template v-if="showEdit" #editor="{ data, field }">
        <CellEditor
          v-model="data[field]"
          :data="data"
          :field="field"
          :column="column"
          @input="handleCellEditorInput"
        />
      </template>
    </Column>

    <Column field="" header="" frozen alignFrozen="right">
      <template #body="slotProps">
        <div v-if="dataLoading">
          <Skeleton width="80%" height="1rem" />
        </div>
        <div v-else>
          <TableCellActions
            @edit-clicked="handleEditClick"
            :fieldToShowOnModalDelete="'name'"
            @delete-clicked="openModalFunction"
            @custom-row-bt-clicked="handleCustomRowBtClick"
            :columnIcons="tableColumns[tableColumns.length - 1]"
            :additionalData="slotProps"
          />
        </div>
      </template>
    </Column>
  </DataTable>

  <Modal
    v-model:openModal="openModal"
    @handleClose="handleModalClose"
    :title="'Delete meal'"
    :actions="modalActions"
  >
    Are you sure you want to delete
    <span style="font-weight: bold">
      {{ fieldModalToShow.name }}
    </span>
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
  computed,
  defineComponent,
  onMounted,
  ref,
  toRef,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import axios from "axios";
import Message from "primevue/message";
import Modal from "@/components/Modal.vue";
import IColumn from "@/interfaces/table/IColumn";
import GenericToolbar from "@/components/GenericToolbar.vue";
import TableHeader from "./TableHeader.vue";
import TableCell from "./TableCell.vue";
import TableCellActions from "./TableCellActions.vue";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
import CellEditor from "@/components/table/CellEditor.vue";
import { eFilterOperator } from "@/assets/enums/eFilterOperator";
import TablePaginator from "./TablePaginator.vue";

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
    TableHeader,
    TableCell,
    TableCellActions,
    Toast,
    Skeleton,
    ProgressSpinner,
    CellEditor,
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
    actionButton: { type: Object as () => Action },
    keyWhereFilter: { type: String, default: "" },
    // onEditClick: { type: Function },
  },
  setup(props, { emit }) {
    const toast = useToast();

    const {
      controller,
      checkbox,
      actions,
      showExport = false,
      showAddBt,
      showEdit,
      showDelete,
      showSearch,
      showCustomRowBt,
    } = toRefs(props);

    const openModalFunction = (field: any, rowId: number) => {
      fieldModalToShow.value = { name: field, id: rowId };
      openModal.value = true;
    };

    const handleEditClick = (data: any, rowId: number) => {
      emit("edit-clicked", data, rowId);
    };

    const handleCustomRowBtClick = (rowId: number) => {
      emit("custom-row-bt-clicked", rowId);
    };

    const handleModalClose = () => {
      openModal.value = false;
    };

    const handleCellEditorInput = (newCellValue: any) => {
      cellValue.value = newCellValue;
    };

    const filteredNotIncludedColumns = computed(() =>
      tableColumns.value.slice(0, -1)
    );

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

    const modalActions = ref<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Delete",
          severity: "danger",
          onclick: handleDeleteButtonModal,
        },
      },
      {
        component: Button,
        props: {
          label: "Cancel",
          icon: "pi pi-check",
          severity: "info",
          onclick: handleModalClose,
        },
      },
    ]);

    const currentPage = ref<number>(1);
    const pageSize = ref<any>(3);
    const totalItems = ref<number>(0);
    const rowsPerPageOptions = ref<any>([3, 5, 10]);
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
        const res = await axios.post(
          `/table/${props.controller?.split("/")[0]}`,
          {
            page: currentPage.value,
            pageSize: pageSize.value,
            search: searchValue.value,
            filters: [
              {
                columnName: props.keyWhereFilter,
                operation: eFilterOperator.Equal,
                value: props.controller?.split("/")[1],
              },
            ],
          }
        );
        if (res !== null) {
          console.log(res.data.rows, "ROWS??");
          tableData.value = res.data.rows;
          totalItems.value = res.data.totalCount;
          tableColumns.value = res.data.columns;
          // we will
        }
      } catch (err: any) {
        console.error(err);
      }
      dataLoading.value = false;
    };
    const handleChangePage = (event: any) => {
      currentPage.value = event.page + 1;
      // currentPage.value = newPage;
    };

    const handleRowDropdownChange = (rowsPerPage: any) => {
      pageSize.value = rowsPerPage;
      currentPage.value = 1;
    };

    watch([pageSize, currentPage, searchValue, controller], () => {
      fetchData();
    });

    onMounted(() => {
      fetchData();
    });

    const handleSearchValue = (event: any) => {
      setTimeout(() => {
        searchValue.value = event.target.value;
        currentPage.value = 1;
      }, 100);
    };

    // const isEditing = ref(false);
    // const fieldToEdit = ref("");
    // const handleCellClick = () => {
    //   console.log("click", "AA");
    // };

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
      fieldModalToShow,
      filteredNotIncludedColumns,
      openModalFunction,
      handleEditClick,
      handleModalClose,
      handleChangePage,
      handleRowDropdownChange,
      handleSearchValue,
      onCellEditComplete,
      handleCellEditorInput,
      fetchData,
      handleCustomRowBtClick,
    };
  },
});
</script>
<style scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}

/* .truncate-cell-content {
  max-width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */
</style>
