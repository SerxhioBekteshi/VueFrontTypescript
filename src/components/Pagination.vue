<script setup lang="ts">
import Paginator from "primevue/paginator";
import { onMounted, ref } from "vue";

const currentPage = ref<number>(1);
const pageSize = ref<any>(3);
const totalItems = ref<number>(0);

const handlePageChange = (event: any) => {
  currentPage.value = event.page + 1;
  //   fetchData(event.page + 1, pageSize.value);
};

const handleRowDropdownChange = (rowsPerPage: any) => {
  pageSize.value = rowsPerPage;
  //   fetchData(currentPage.value, rowsPerPage);
};

// onMounted(async () => {
//   await fetchData(currentPage.value, pageSize.value);
// });

// const fetchMeals = async (currentPage: number, pageSize: number) => {
//   isLoading.value = true;
//   const res: any = await axios.post("/meal/get-all", {
//     currentPage: currentPage,
//     pageSize: pageSize,
//   });
//   if (res.data) {
//     meals.value = res.data.meals;
//     totalItems.value = res.data.totalItems;
//   }
//   isLoading.value = false;
// };
</script>

<template>
  <div>
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
      @page="handlePageChange"
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

<style>
::v-deep .p-paginator {
  background-color: transparent !important;
}
</style>
