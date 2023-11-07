<template>
  <div class="card">
    <div>
      <DataView :value="meals" :layout="layout" dataKey="id">
        <template #header>
          <div style="dispay: flex; flex-direction: column">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
              "
            >
              <GenericToolbar
                :show-export="true"
                :showSearch="true"
                :controller="'meals'"
                :showAddBt="shouldCrud"
                :value="searchValue"
                :actionButton="actionButton"
                :customComponent="customToolbarComponent"
                @update:modelValue="(newValue: any) => layout =
              newValue"
                @change="handleSearchValue"
              />
            </div>

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
          <div v-if="meals && meals.length != 0" class="col-12">
            <MealsSkeleton v-if="isLoading" :layout="'list'" />

            <div
              v-else
              class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
            >
              <div
                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
              >
                <div
                  class="flex flex-column align-items-center sm:align-items-start gap-3"
                >
                  <div class="text-2xl font-bold text-900">
                    {{ slotProps.data.name }}
                  </div>
                  <Rate
                    :controller="'meals/rate'"
                    :rateId="slotProps.data.id"
                    :rateValue="slotProps.data.rating"
                    :shouldRate="shouldRate"
                  />
                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <span class="font-semibold">{{
                        slotProps.data.dietCategory
                      }}</span>
                    </span>

                    <Tag
                      :value="slotProps.data.inventoryStatus"
                      :severity="getSeverity(slotProps.data)"
                    >
                      STOCK
                    </Tag>
                  </div>
                  <div>
                    <span class="text-xl"
                      >{{ slotProps.data.calories }} Cal</span
                    >,
                    <span class="text-xl">{{ slotProps.data.price }} $</span>
                  </div>
                  <div>
                    <span :style="{ fontWeight: 'bold' }">
                      Carbon Footprint:
                    </span>
                    {{ slotProps.data.carbonFootprint }} %
                  </div>

                  <div>
                    <span :style="{ fontWeight: 'bold' }"> Intolerance: </span>
                    {{ slotProps.data.intolerance }}
                  </div>
                </div>

                <div class="flex flex-column align-items-center gap-2">
                  <!-- BUTONAT -->
                  <div v-if="shouldCrud">
                    <Button
                      icon="pi pi-file-edit"
                      severity="help"
                      text
                      rounded
                      size="small"
                      style="padding-left: 0; padding-right: 0"
                      @click="onEditClick(slotProps.data)"
                      aria-label="Favorite"
                    />
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      rounded
                      style="padding-inline: 0; padding-right: 0"
                      @click="() => openModalFunction(slotProps.data, 'delete')"
                      size="small"
                      aria-label="Cancel"
                    />
                  </div>
                  <div v-else>
                    <Button
                      icon="pi pi-cart-plus"
                      severity="warning"
                      text
                      rounded
                      size="small"
                      @click="() => openModalFunction(slotProps.data, 'order')"
                    />
                  </div>
                  <!-- IMAZHI -->
                  <div class="image-wrapper">
                    <img
                      class="image-content"
                      :src="`http://localhost:1112/${slotProps.data.image}`"
                      :alt="slotProps.data.name"
                    />
                    {{ slotProps.data.image }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #grid="slotProps">
          <div
            v-if="meals && meals.length != 0"
            class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2"
          >
            <div class="p-4 border-1 surface-border surface-card border-round">
              <MealsSkeleton v-if="isLoading" :layout="'grid'" />
              <div v-else>
                <div class="header-layout">
                  <div class="flex align-items-center gap-2">
                    <span class="font-semibold">{{
                      slotProps.data.dietCategory
                    }}</span>
                  </div>
                  <div v-if="shouldCrud" style="display: flex">
                    <Button
                      icon="pi pi-file-edit"
                      severity="help"
                      text
                      rounded
                      size="small"
                      @click="onEditClick(slotProps.data)"
                      aria-label="Favorite"
                    />
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      rounded
                      @click="() => openModalFunction(slotProps.data, 'delete')"
                      size="small"
                      aria-label="Cancel"
                    />
                  </div>
                  <div v-else>
                    <Button
                      icon="pi pi-cart-plus"
                      severity="warning"
                      text
                      rounded
                      size="small"
                      @click="() => openModalFunction(slotProps.data, 'order')"
                    />
                  </div>
                </div>
                <div>
                  <div class="flex flex-column align-items-center gap-3 py-5">
                    <div class="image-wrapper">
                      <img
                        class="image-content"
                        :src="`http://localhost:1112/${slotProps.data.image}`"
                        :alt="slotProps.data.name"
                      />
                      {{ slotProps.data.image }}
                    </div>

                    <div class="text-2xl font-bold">
                      {{ slotProps.data.name }}
                    </div>
                    <Rate
                      :controller="'meals/rate'"
                      :rateId="slotProps.data.id"
                      :rateValue="slotProps.data.rating"
                      :shouldRate="shouldRate"
                    />

                    <Tag
                      :value="slotProps.data.inventoryStatus"
                      :severity="getSeverity(slotProps.data)"
                      >HSTOCK</Tag
                    >
                  </div>
                </div>

                <div class="custom-layout">
                  <span class="text-xl font-semibold"
                    >{{ slotProps.data.calories }} Calories
                  </span>
                  <span class="text-xl font-semibold"
                    >{{ slotProps.data.price }} $
                  </span>
                </div>

                <div>
                  <div :style="{ marginTop: '1rem' }">
                    <span :style="{ fontWeight: 'bold' }">
                      Carbon Footprint:
                    </span>
                    {{ slotProps.data.carbonFootprint }} %
                  </div>

                  <div :style="{ marginTop: '1rem' }">
                    <span :style="{ fontWeight: 'bold' }"> Intolerance: </span>
                    {{ slotProps.data.intolerance }}
                  </div>

                  <div :style="{ marginTop: '1rem' }">
                    <Accordion :activeIndex="1">
                      <AccordionTab
                        :key="'Ingredients'"
                        :header="'Ingredients '"
                      >
                        <div
                          v-if="
                            slotProps.data.ingredients &&
                            slotProps.data.ingredients.length !== 0
                          "
                        >
                          <div
                            v-for="ingredient in slotProps.data.ingredients"
                            v-bind:key="ingredient.id"
                          >
                            <ul>
                              <li>ingredient: {{ ingredient.name }}</li>
                              <li>amount: {{ ingredient.portion }}</li>
                            </ul>
                          </div>
                        </div>
                        <div v-else>
                          <InlineMessage style="width: 100%" severity="error">
                            No ingredients
                          </InlineMessage>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </div>
                </div>
              </div>
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
      :validationSchema="schema"
      :fetchDataAfterSubmit="fetchMeals"
    >
      <MealForm />
    </DetailDrawer>
  </div>

  <div>
    <Modal
      v-model:openModal="openModal"
      @handleClose="handleModalClose"
      :title="'Delete meal'"
      :actions="modalActions"
    >
      <div v-if="reasonOfModalOpen === 'delete'">
        Are you sure you want to delete
        <span style="font-weight: bold">
          {{ meal.name }}
        </span>
      </div>
      <div v-else>
        <OrderSystemMealForm :price="meal.price" />
      </div>
    </Modal>
  </div>
  <Toast />
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  defineComponent,
  watch,
  computed,
  shallowRef,
} from "vue";
import * as yup from "yup";
import DataView from "primevue/dataview";
import Tag from "primevue/tag";
import axios from "axios";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Toast from "primevue/toast";
import InlineMessage from "primevue/inlinemessage";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import GenericToolbar from "../../components/GenericToolbar.vue";
import { useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { eFormMode } from "@/assets/enums/EFormMode";
import { PrimeIcons } from "primevue/api";
import DetailDrawer from "../../components/DetailDrawer.vue";
import MealForm from "../../components/formController/MealForm.vue";
import Rate from "../../components/formElements/Rate.vue";
import Modal from "../../components/Modal.vue";
import TablePaginator from "../../components/table/TablePaginator.vue";
import { PageState } from "primevue/paginator";
import { eRoles } from "@/assets/enums/eRoles";
import { useReduxSelector } from "@/store/redux/helpers";
import { eFilterOperator } from "@/assets/enums/eFilterOperator";
import { calculateFiltersForMeal } from "@/utils/functions";
import OrderSystemMealForm from "./OrderSystemMealForm.vue";
import IMeal from "@/interfaces/database/IMeal";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import MealsSkeleton from "./MealsSkeleton.vue";

export default defineComponent({
  name: "MealsPage",
  components: {
    DataView,
    Accordion,
    AccordionTab,
    MealsSkeleton,
    ProgressSpinner,
    GenericToolbar,
    Tag,
    Rate,
    DetailDrawer,
    MealForm,
    Button,
    Modal,
    TablePaginator,
    Toast,
    InlineMessage,
    Message,
    OrderSystemMealForm,
    // DataViewLayoutOptions,
  },
  props: {
    shouldCrud: { type: Boolean, required: true },
    shouldRate: { type: Boolean, required: true },
  },
  setup() {
    const profile = useReduxSelector((state) => state.user);
    const formDrawerMode = ref<any>();
    const meals = ref<IMeal[]>([]);
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(5);
    const totalItems = ref<number>(0);
    const isLoading = ref<boolean>(false);
    const searchValue = ref<string>("");
    const formData = ref<IMeal>();
    const rate = ref<any>();
    const toast = useToast();
    const rowsPerPageOptions = ref<number[]>([3, 5, 10]);
    const quizResult = ref<any>();
    const reasonOfModalOpen = ref<string>("");
    const layout = ref<any>("grid");

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

    const invalidateState = () => {
      formDrawerMode.value = "";
      formData.value = undefined;
    };

    const fetchMeals = async () => {
      isLoading.value = true;
      try {
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

    const openModal = ref<boolean>(false);
    const meal = ref<any>();

    const schema = yup.object().shape({
      ingredients: yup
        .array()
        .of(
          yup.object().shape({
            name: yup
              .string()
              .required("Ingredient name is required")
              .label("Name"),
            portion: yup
              .number()
              .required("Ingredient portion is required")
              .label("Portion"),
          })
        )
        .strict(),
      name: yup.string().required("Name is required").label("Name"),
      price: yup.number().required("Price is required").label("Price"),
      cousine: yup.string().required("Cousine is required").label("Cousine"),
      carbonFootprint: yup
        .number()
        .required("Carbon footprint is required")
        .label("Carbon footprint"),
      dietCategory: yup
        .string()
        .required("Diet category is required")
        .label("Diet category"),
      calories: yup
        .number()
        .required("Calories are required")
        .label("Calories"),
      achievement: yup
        .string()
        .required("Health goal is required")
        .label("Health goal"),
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
        pt: {
          [`${layout.value}Button`]: {
            style: {
              backgroundColor: layout.value ? "#6366F1" : "#ffffff",
              color: layout.value ? "#ffffff" : "#6366F1",
            },
          },
        },
      },
    });

    const openModalFunction = (m: any, cause: string) => {
      openModal.value = true;
      reasonOfModalOpen.value = cause;
      meal.value = m;
    };

    const handleModalClose = () => {
      openModal.value = false;
    };

    const deleteMeal = async () => {
      try {
        const res: any = await axios.delete(`/meals/${meal.value.id}`);
        if (res && res.data.message) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          handleModalClose();
          fetchMeals();
        }
      } catch (err) {
        console.log(err, "ERROR");
      }
    };

    const modalActions = computed<any>(() => {
      return [
        {
          component: Button,
          props: {
            type: "Submit",
            icon: "pi pi-times",
            label: reasonOfModalOpen.value === "Delete" ? "Delete" : "Checkout",
            severity: "danger",
            onclick: deleteMeal,
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
      ];
    });

    const getSeverity = (product: any) => {
      switch (product.inventoryStatus) {
        case "INSTOCK":
          return "success";

        case "LOWSTOCK":
          return "warning";

        case "OUTOFSTOCK":
          return "danger";

        default:
          return undefined;
      }
    };

    // const fetchMeal = (meal: any) => {
    //   const mealObjectToAdd = JSON.parse(JSON.stringify(meal));
    //   formDrawerMode.value = "edit";
    //   resetForm({ values: mealObjectToAdd });
    // };

    const handleChangePage = (event: PageState) => {
      currentPage.value = event.page + 1;
    };

    const handleRowDropdownChange = (rowsPerPage: number) => {
      pageSize.value = rowsPerPage;
      currentPage.value = 1;
    };

    return {
      meals,
      pageSize,
      currentPage,
      handleChangePage,
      handleRowDropdownChange,
      meal,
      reasonOfModalOpen,
      isLoading,
      openModal,
      layout,
      searchValue,
      formDrawerMode,
      schema,
      formData,
      actionButton,
      modalActions,
      rate,
      rowsPerPageOptions,
      totalItems,
      customToolbarComponent,
      getSeverity,
      handleModalClose,
      invalidateState,
      handleAddData,
      fetchMeals,
      handleSearchValue,
      onEditClick,
      deleteMeal,
      openModalFunction,
    };
  },
});
</script>

<style scoped>
.image-wrapper {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-layout {
  display: flex;
  flex-direction: column;
  justify-content: start; /* Default for screens above 700px */
}

@media (min-width: 700px) {
  .custom-layout {
    flex-direction: row;
    justify-content: space-between; /* For screens 700px and above */
  }
}

.header-layout {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

@media (min-width: 650px) {
  .header-layout {
    flex-direction: row;
    justify-content: space-between;
  }
}

.centered-content-layout {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 800px) {
  .centered-content-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-block: 3rem;
  }
}
</style>
