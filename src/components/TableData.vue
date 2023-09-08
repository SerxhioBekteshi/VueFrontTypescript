<template>
  <div v-if="!showAddBt">
    <Button icon="pi pi-external-link" label="Add" />
  </div>
  <DataTable
    tableClass="editable-cells-table"
    scrollable
    :stripedRows="true"
    :value="tableData"
    ref="dt"
    editMode="cell"
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
      <Paginator
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink ',
          '960px':
            'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink ', //jumpToPageDropdown
          '1300px':
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
          default:
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
        }"
        :rows="pageSize"
        :totalRecords="totalItems"
        :rowsPerPageOptions="[3, 5, 10]"
        :rowPerPageDropdown="{ class: 'custom-dropdown-style' }"
        @page="handleChangePage"
        @update:rows="handleRowDropdownChange"
        :pt="{
          pageButton: ({ props, state, context }) => ({
            class: context.active ? 'bg-primary' : undefined,
          }),
        }"
      >
      </Paginator>
      <div style="display: flex; justify-content: center; gap: 1">
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

    <TableHeader
      v-if="tableColumns.length != 0"
      :columns="tableColumns"
      :rowCount="totalItems"
      :showEdit="showEdit"
      :showDelete="showDelete"
    />

    <Column
      v-for="(column, index) in filteredNotIncludedColumns"
      :key="index"
      :field="column.propertyName"
      :header="column.title"
      style="width: 25%"
    >
      <template #body="slotProps">
        <div v-if="dataLoading">
          <Skeleton width="80%" height="1.5rem" />
        </div>
        <div v-else>
          <TableCell
            :showEdit="showEdit"
            :showDelete="showDelete"
            :cellValue="slotProps.data[`${column.propertyName}`]"
            :cellColumn="column"
          />
        </div>
      </template>
      <template #editor="{ data, field }">
        <!-- {{ field }} -->
        <CellEditor
          v-model="data[field]"
          :data="data"
          :field="field"
          :column="column"
          @input="handleCellEditorInput"
        />
        <!-- <template v-if="field !== 'price'">
          <InputText v-model="data[field]" autofocus />
        </template>
        <template v-else>
          <InputNumber
            v-model="data[field]"
            mode="currency"
            currency="USD"
            locale="en-US"
            autofocus
          />
        </template> -->
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
            :showEdit="showEdit"
            :showDelete="showDelete"
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
import Paginator from "primevue/paginator";
import Modal from "../components/Modal.vue";
import IColumn from "@/interfaces/IColumn";
import GenericToolbar from "../components/GenericToolbar.vue";
import TableHeader from "../components/table/TableHeader.vue";
import TableCell from "../components/table/TableCell.vue";
import TableCellActions from "../components/table/TableCellActions.vue";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";
import CellEditor from "../components/table/CellEditor.vue";

interface Action {
  component: any;
  props: Record<string, unknown>;
}

export default defineComponent({
  name: "TableData",
  components: {
    DataTable,
    Button,
    Column,
    Message,
    Paginator,
    Modal,
    GenericToolbar,
    TableHeader,
    TableCell,
    TableCellActions,
    Toast,
    Skeleton,
    ProgressSpinner,
    CellEditor,
  },
  props: {
    controller: String,
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
    actionButton: { type: Object as () => Action },
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
    } = toRefs(props);

    const openModalFunction = (field: any, rowId: number) => {
      fieldModalToShow.value = { name: field, id: rowId };
      openModal.value = true;
    };

    const handleEditClick = (data: any, rowId: number) => {
      emit("edit-clicked", data, rowId);
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
        const res = await axios.post(`/table/${controller.value}`, {
          page: currentPage.value,
          pageSize: pageSize.value,
          search: searchValue.value,
        });
        if (res !== null) {
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

    watch([pageSize, currentPage, searchValue], () => {
      fetchData();
    });

    // watchEffect(() => {
    //   fetchData(); // Fetch data whenever any of the watched dependencies changes
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

    const onCellEditComplete = async (event: any) => {
      let { data, field } = event;
      if (data[field] !== cellValue.value) {
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
        } catch (err) {
          console.log(err, "ERR");
        }
      }
    };

    return {
      currentPage,
      pageSize,
      searchValue,
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
    };
  },
});
</script>
<style>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
