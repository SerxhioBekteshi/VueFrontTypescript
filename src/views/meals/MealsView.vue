<template>
  <div class="card">
    <div>
      <DataView :value="meals" :layout="layout" dataKey="id" :laze="true">
        <template #header>
          <div style="display: flex; flex-direction: column">
            <!-- <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
              "
            > -->
            <GenericToolbar
              :show-export="true"
              :showSearch="true"
              :controller="'meals'"
              :showAddBt="ability.can('add', 'meals')"
              :value="searchValue"
              :actionButton="actionButton"
              :customComponent="customToolbarComponent"
              @update:modelValue="(newValue: any) => layout =
              newValue"
              @change="handleSearchValue"
            />
            <!-- </div> -->

            <TablePaginator
              :pageSize="pageSize"
              :totalItems="totalItems"
              :rowsPerPageOptions="rowsPerPageOptions"
              :handleChangePage="handleChangePage"
              :handleRowDropdownChange="handleRowDropdownChange"
            />
          </div>
        </template>
        <template #list="slotProps">
          <div v-if="meals && meals.length != 0" class="grid">
            <div
              v-for="(meal, index) in slotProps.items"
              :key="index"
              class="col-12 p-2"
            >
              <MealListView
                v-if="meal"
                :mealData="meal"
                :isLoading="isLoading"
                @stock-click="onStockClick"
                @edit-clicked="onEditClick"
                @upload-click="onUploadClick"
                @open-modal="openModalFunction"
              />
            </div>
          </div>
        </template>
        <template #grid="slotProps">
          <div v-if="meals && meals.length != 0" class="grid">
            <div
              v-for="(meal, index) in slotProps.items"
              :key="index"
              class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2"
            >
              <MealGridView
                v-if="meal"
                :mealData="meal"
                :isLoading="isLoading"
                @stock-click="onStockClick"
                @edit-clicked="onEditClick"
                @upload-click="onUploadClick"
                @open-modal="openModalFunction"
              />
            </div>
          </div>
        </template>
        <template #empty>
          <div v-if="isLoading">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <ProgressSpinner />
            </div>
          </div>
          <div v-else>
            <Message severity="error">There are no meals</Message>
          </div>
        </template>
      </DataView>
    </div>
  </div>

  <div v-if="formDrawerMode || formData">
    <DetailDrawer
      :onClose="invalidateState"
      :modeDrawer="formDrawerMode"
      :formData="formData"
      :controller="'meals'"
      :validationSchema="mealSchema"
      :fetchDataAfterSubmit="fetchMeals"
      :showSubmitButton="false"
    >
      <div v-if="formDrawerMode === eFormMode.Upload">
        <ImageForm :controller="'meals'" :imageData="formData || {}" />
      </div>
      <div v-else>
        <MealForm />
      </div>
    </DetailDrawer>
  </div>

  <div>
    <div v-if="typeof meal === 'object'">
      <DetailModal
        :customTitle="'Proceed with payment'"
        :onClose="invalidateState"
        :validationSchema="modalOrderSchema"
        @customSubmitAction="handleCheckout"
      >
        <OrderSystemMealForm :price="meal.price" />
      </DetailModal>
    </div>
    <div v-if="typeof meal === 'number'">
      <DetailModal
        :customTitle="'Delete'"
        :controller="'meal'"
        :onClose="invalidateState"
      >
        <div>
          Are you sure you want to delete
          <!-- <span style="font-weight: bold">
            {{ meal.name }}
          </span> -->
        </div>
      </DetailModal>
    </div>
    <div v-if="stockModal">
      <DetailModal
        :customTitle="'Update stock'"
        :onClose="invalidateState"
        :validationSchema="stockOrderSchema"
        :formData="stockModal"
        :modeDrawer="eFormMode.Edit"
        :controller="'meals/stock'"
        :fetchDataAfterSubmit="fetchMeals"
      >
        <MealsStockUpdate :mealStock="stockModal" />
      </DetailModal>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  defineComponent,
  watch,
  shallowRef,
  provide,
  computed,
} from "vue";
import DataView from "primevue/dataview";
import axios from "axios";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import GenericToolbar from "../../components/GenericToolbar.vue";
import Button from "primevue/button";
import { eFormMode } from "@/assets/enums/EFormMode";
import { PrimeIcons } from "primevue/api";
import DetailDrawer from "../../components/DetailDrawer.vue";
import DetailModal from "../../components/DetailModal.vue";
import MealForm from "../../components/formController/MealForm.vue";
import TablePaginator from "../../components/table/TablePaginator.vue";
import { PageState } from "primevue/paginator";
import { eRoles } from "@/assets/enums/eRoles";
import { eFilterOperator } from "@/assets/enums/eFilterOperator";
import { calculateFiltersForMeal } from "@/utils/functions";
import OrderSystemMealForm from "../orderMeals/OrderSystemMealForm.vue";
import IMeal from "@/interfaces/database/IMeal";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import { useRouter } from "vue-router";
import ImageForm from "@/components/formController/ImageForm.vue";
import {
  mealSchema,
  modalOrderSchema,
  stockOrderSchema,
} from "@/utils/validationSchemas";
import { useAbility } from "@casl/vue";
import { useStore } from "vuex";
import { RootState } from "@/store/vuexStore/types";
import { eMutationTypes } from "@/assets/enums/eMutationTypes";
import MealsStockUpdate from "./MealsStockUpdate.vue";
import MealGridView from "./viewType/MealGridView.vue";
import MealListView from "./viewType/MealListView.vue";

export default defineComponent({
  name: "MealsView",
  components: {
    DataView,
    ProgressSpinner,
    GenericToolbar,
    DetailDrawer,
    DetailModal,
    MealForm,
    ImageForm,
    TablePaginator,
    Message,
    OrderSystemMealForm,
    MealsStockUpdate,
    MealGridView,
    MealListView,
  },
  enums: {
    eFormMode,
  },
  setup() {
    const store = useStore<RootState>();
    const profile = computed(() => store.getters.getUserInfo);
    const router = useRouter();
    const ability = useAbility();

    const formDrawerMode = ref<any>();
    const meals = ref<IMeal[]>([]);
    const meal = ref<any>(undefined);
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(5);
    const totalItems = ref<number>(0);
    const isLoading = ref<boolean>(true);
    const searchValue = ref<string>("");
    const formData = ref<IMeal>();
    const rate = ref<any>();
    const rowsPerPageOptions = ref<number[]>([3, 5, 10]);
    const quizResult = ref<any>();
    const layout = ref<any>("grid");
    const stockModal = ref<any>();

    const getQuizResults = async () => {
      try {
        const res: any = await axios.get("quizResult/get-all");
        if (res && res.data) {
          quizResult.value = res.data;
          fetchMeals();
        }
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    const handleAddData = () => {
      formDrawerMode.value = eFormMode.Add;
    };

    const onEditClick = (data: IMeal) => {
      formDrawerMode.value = eFormMode.Edit;
      formData.value = data;
    };

    const onUploadClick = (id: any, image: any) => {
      formData.value = { id, image };
      formDrawerMode.value = eFormMode.Upload;
    };

    const onStockClick = (id: number, stock: number) => {
      stockModal.value = { id, stock };
    };

    const invalidateState = () => {
      formDrawerMode.value = null;
      meal.value = undefined;
      formData.value = undefined;
      stockModal.value = undefined;
    };

    const fetchMeals = async () => {
      try {
        isLoading.value = true;
        let formattedFilters;
        if (profile.value.role === eRoles.User)
          formattedFilters = calculateFiltersForMeal(quizResult.value);

        const res: any = await axios.post("/table/meals", {
          page: currentPage.value,
          pageSize: pageSize.value,
          search: searchValue.value,
          filters:
            profile.value.role === eRoles.Provider
              ? [
                  {
                    columnName: "providerId",
                    operation: eFilterOperator.Equal,
                    value: profile.value.id,
                  },
                ]
              : formattedFilters,
        });
        if (res && res.data) {
          meals.value = res.data.rows;
          totalItems.value = res.data.totalCount;
        }
        isLoading.value = false;
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    const handleSearchValue = (event: any) => {
      setTimeout(() => {
        searchValue.value = event.target.value;
        currentPage.value = 1;
      }, 100);
    };

    watch([pageSize, currentPage, searchValue], () => {
      fetchMeals();
    });

    onMounted(() => {
      if (profile.value.role === eRoles.User) getQuizResults();
      else fetchMeals();
    });

    const actionButton = shallowRef<any>({
      component: Button,
      props: {
        icon: PrimeIcons.PLUS,
        label: "Insert",
        severity: "primary",
        onClick: handleAddData,
      },
    });

    const customToolbarComponent = shallowRef<any>({
      component: DataViewLayoutOptions,
      props: {
        modelValue: layout.value,
        // unstyled: true,
        // pt: {
        //   [`${layout.value}Button`]: {
        //     style: {
        //       backgroundColor: layout.value ? "red" : "black",
        //       color: layout.value ? "black" : "Red",
        //     },
        //   },
        // },
      },
    });

    const openModalFunction = (m: any, cause: string) => {
      if (cause === "order") meal.value = m;
      else meal.value = m;
    };

    const handleCheckout = (dataComing: any) => {
      store.commit(eMutationTypes.SET_PAYMENT, {
        quantity: parseInt(dataComing.quantity),
        name: meal.value.name,
        price: meal.value.price,
        id: meal.value.id,
      });

      router.push("/payments/paypal");
    };

    const handleChangePage = (event: PageState) => {
      currentPage.value = event.page + 1;
    };

    const handleRowDropdownChange = (rowsPerPage: number) => {
      pageSize.value = rowsPerPage;
      currentPage.value = 1;
    };

    provide("closeAndFetchData", { close: invalidateState, fetch: fetchMeals });

    return {
      meals,
      pageSize,
      currentPage,
      handleChangePage,
      handleRowDropdownChange,
      ability,
      meal,
      modalOrderSchema,
      stockOrderSchema,
      mealSchema,
      isLoading,
      layout,
      searchValue,
      formDrawerMode,
      formData,
      actionButton,
      rate,
      rowsPerPageOptions,
      totalItems,
      customToolbarComponent,
      eFormMode,
      invalidateState,
      handleAddData,
      fetchMeals,
      handleSearchValue,
      onEditClick,
      onUploadClick,
      openModalFunction,
      handleCheckout,
      stockModal,
      onStockClick,
    };
  },
});
</script>

<style scoped></style>
