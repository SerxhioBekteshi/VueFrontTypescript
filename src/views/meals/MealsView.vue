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
                :showAddBt="ability.can('add', 'meals')"
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
                    :shouldRate="ability.can('custom', 'meals')"
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
                  <Button
                    icon="pi pi-file-edit"
                    severity="help"
                    v-if="ability.can('edit', 'meals')"
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
                    v-if="ability.can('delete', 'meals')"
                    rounded
                    style="padding-inline: 0; padding-right: 0"
                    @click="
                      () => openModalFunction(slotProps.data.id, 'delete')
                    "
                    size="small"
                    aria-label="Cancel"
                  />

                  <Button
                    icon="pi pi-cart-plus"
                    severity="warning"
                    text
                    v-if="ability.can('custom', 'meals')"
                    rounded
                    size="small"
                    @click="() => openModalFunction(slotProps.data, 'checkout')"
                  />

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

                  <div style="display: flex">
                    <Button
                      icon="pi pi-file-edit"
                      severity="help"
                      text
                      v-if="ability.can('edit', 'meals')"
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
                      v-if="ability.can('delete', 'meals')"
                      @click="
                        () => openModalFunction(slotProps.data.id, 'delete')
                      "
                      size="small"
                      aria-label="Cancel"
                    />

                    <Button
                      icon="pi pi-cart-plus"
                      severity="warning"
                      text
                      v-if="ability.can('custom', 'meals')"
                      rounded
                      size="small"
                      @click="
                        () => openModalFunction(slotProps.data, 'checkout')
                      "
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
                      :shouldRate="ability.can('custom', 'meals')"
                    />

                    <Tag
                      :value="slotProps.data.inventoryStatus"
                      :severity="getSeverity(slotProps.data)"
                      >HSTOCK</Tag
                    >
                    <Button
                      icon="pi pi-upload"
                      severity="warning"
                      rounded
                      outlined
                      size="small"
                      v-if="ability.can('upload', 'meals')"
                      @click="
                        () =>
                          onUploadClick(slotProps.data.id, slotProps.data.image)
                      "
                    />
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
                          <main
                            class="leaderboard_profiles"
                            v-for="ingredient in slotProps.data.ingredients"
                            v-bind:key="ingredient.id"
                          >
                            <article class="leaderboard__profile">
                              <!-- <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Mark Zuckerberg"
                                class="leaderboard__picture"
                              /> -->
                              <span class="leaderboard__name">{{
                                ingredient.name
                              }}</span>
                              <span class="leaderboard__value"
                                >{{ ingredient.portion }}g<span
                                  >Amount</span
                                ></span
                              >
                            </article>
                          </main>
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
import Tag from "primevue/tag";
import axios from "axios";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import InlineMessage from "primevue/inlinemessage";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import GenericToolbar from "../../components/GenericToolbar.vue";
import Button from "primevue/button";
import { eFormMode } from "@/assets/enums/EFormMode";
import { PrimeIcons } from "primevue/api";
import DetailDrawer from "../../components/DetailDrawer.vue";
import DetailModal from "../../components/DetailModal.vue";
import MealForm from "../../components/formController/MealForm.vue";
import Rate from "../../components/formElements/Rate.vue";
import TablePaginator from "../../components/table/TablePaginator.vue";
import { PageState } from "primevue/paginator";
import { eRoles } from "@/assets/enums/eRoles";
import { eFilterOperator } from "@/assets/enums/eFilterOperator";
import { calculateFiltersForMeal } from "@/utils/functions";
import OrderSystemMealForm from "../orderMeals/OrderSystemMealForm.vue";
import IMeal from "@/interfaces/database/IMeal";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import MealsSkeleton from "./MealsSkeleton.vue";
import { useRouter } from "vue-router";
import ImageForm from "@/components/formController/ImageForm.vue";
import { mealSchema, modalOrderSchema } from "@/utils/validationSchemas";
import { useAbility } from "@casl/vue";
import { useStore } from "vuex";
import { RootState } from "@/store/vuexStore/types";
import { eMutationTypes } from "@/assets/enums/eMutationTypes";

export default defineComponent({
  name: "MealsView",
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
    DetailModal,
    MealForm,
    ImageForm,
    Button,
    TablePaginator,
    InlineMessage,
    Message,
    OrderSystemMealForm,
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

    const invalidateState = () => {
      formDrawerMode.value = null;
      meal.value = undefined;
      formData.value = undefined;
    };

    const fetchMeals = async () => {
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
      getSeverity,
      invalidateState,
      handleAddData,
      fetchMeals,
      handleSearchValue,
      onEditClick,
      onUploadClick,
      openModalFunction,
      handleCheckout,
    };
  },
});
</script>

<style scoped lang="scss">
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

.leaderboard {
  max-width: 490px;
  width: 100%;
  border-radius: 12px;

  header {
    --start: 15%;

    height: 130px;
    background-image: repeating-radial-gradient(
        circle at var(--start),
        transparent 0%,
        transparent 10%,
        rgba(54, 89, 219, 0.33) 10%,
        rgba(54, 89, 219, 0.33) 17%
      ),
      linear-gradient(to right, #5b7cfa, #3659db);
    color: #fff;
    position: relative;
    border-radius: 12px 12px 0 0;
    overflow: hidden;

    .leaderboard__title {
      position: absolute;
      z-index: 2;
      top: 50%;
      right: calc(var(--start) * 0.75);
      transform: translateY(-50%);
      text-transform: uppercase;
      margin: 0;

      span {
        display: block;
      }

      &--top {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 6.5px;
      }

      &--bottom {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 3.55px;
        opacity: 0.65;
        transform: translateY(-2px);
      }
    }

    .leaderboard__icon {
      fill: #fff;
      opacity: 0.35;
      width: 50px;
      position: absolute;
      top: 50%;
      left: var(--start);
      transform: translate(-50%, -50%);
    }
  }

  &__profiles {
    background-color: black;
    border-radius: 0 0 12px 12px;
    display: grid;
    row-gap: 8px;
  }

  &__profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px 10px 10px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
      box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
    background-color: #fff;

    &:hover {
      transform: scale(0.8);
    }
  }

  &__picture {
    max-width: 100%;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
  }

  &__name {
    color: #979cb0;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.64px;
    margin-left: 12px;
  }

  &__value {
    color: var(--red-300);
    font-weight: 700;
    font-size: 24px;
    text-align: right;

    & > span {
      opacity: 0.8;
      font-weight: 600;
      font-size: 12px;
      margin-left: 3px;
    }
  }
}

.leaderboard {
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
}
</style>
