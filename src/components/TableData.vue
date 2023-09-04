<template>
  <DataTable
    :stripedRows="true"
    :value="tableData"
    ref="dt"
    tableStyle="min-width: 50rem"
  >
    <template #header>
      <!-- <div v-if="showExport || showSearch">

      </div> -->
      <!-- <GenericToolbar
        :tableColumns="tableColumns"
        :controller="controller"
        :onChange="handleSearchValue"
        :value="searchValue"
        :showExport="showExport"
        :showSearch="showSearch"
      /> -->

      <div
        class="flex gap-3 p-flex-column-xs xs:justify-content-start sm:justify-content-between"
      >
        <div>
          <Button icon="pi pi-external-link" label="Add" />
        </div>
        <!-- <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputPV
              v-model="searchValue"
              @change="handleSearchValue"
              placeholder="Search"
            />
          </span>
        </div> -->
      </div>
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
    </template>
    <template #empty>
      <Message severity="warn">There are no meals</Message>
    </template>
    <template> KETU DO JETE PAGINATORi </template>
    <Column field="code" header="Code" exportHeader="Product Code"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
  </DataTable>

  <Modal
    v-model:openModal="openModal"
    @handleClose="handleModalClose"
    :title="'Delete meal'"
    :actions="modalActions"
  >
    Are you sure you want to delete this meal
    <!-- {{ getNameById(mealObject, mealIdToDelete) }} -->
  </Modal>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import { onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import InputPV from "primevue/inputtext";
import Message from "primevue/message";
import Paginator from "primevue/paginator";
import Modal from "../components/Modal.vue";
import IColumn from "@/interfaces/IColumn";

// const { controller, checkbox = true, actions, showExport, showAddBt, showEdit, showDelete, showExport, showSearch, } = defineProps({
//   controller: String,
// });
const openModalFunction = () => {
  openModal.value = true;
};

const handleModalClose = () => {
  openModal.value = false;
};
const modalActions = ref<any[]>([
  {
    component: Button,
    props: {
      type: "Submit",
      icon: "pi pi-times",
      label: "Delete",
      severity: "danger",
      // onclick: handleDelete,
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

const tableColumns = ref<any>([]);
const searchValue = ref<string>("");
const tableData = ref<any>();

const dataLoading = ref<boolean>(true);
const openModal = ref<boolean>(false);

const fetchData = async () => {
  try {
    const res = await axios.post(`/table/meals`, {
      pageNumber: currentPage.value,
      pageSize: pageSize.value,
      searchValue: searchValue.value,
    });

    if (res !== null) {
      tableData.value = res;
      dataLoading.value = false;

      // we will
    }
  } catch (err: any) {
    console.error(err);
  }
};

// const updateColumns = (cols: IColumn[]) => {
//   const newCols = cols.map((col: IColumn) => {
//     const colProp = columns?.find((c: IColumn) => c.field === col.field);
//     return colProp ? { ...col, ...colProp } : col;
//   });
//    setTableColumns(newCols);
// };

// const handleDelete = async (ids: readonly number[] | number) => {
//   const res = await axios.post(
//     `${controller}/delete`,
//     Array.isArray(ids) ? ids : [ids]
//   );

//   if (res !== null) {
//     //success mesage
//   }
// };

const handleChangePage = (event: any) => {
  currentPage.value = event.page + 1;
  // currentPage.value = newPage;
};

const handleRowDropdownChange = (rowsPerPage: any) => {
  pageSize.value = rowsPerPage;
  currentPage.value = 1;
};

watchEffect(() => {
  fetchData(); // Fetch data whenever any of the watched dependencies changes
});

onMounted(() => {
  fetchData();
});

const handleSearchValue = (event: any) => {
  setTimeout(() => {
    searchValue.value = event.target.value;
    pageSize.value = 0;
  }, 1000);
  //   fetchData(currentPage.value, pageSize.value, event.target.value);
};
</script>
