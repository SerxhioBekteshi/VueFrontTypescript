<template>
  <div class="card">
    <div>
      <DataView :value="meals" :layout="layout" dataKey="id">
        <template #header>
          <GenericToolbar
            :show-export="true"
            :showSearch="true"
            :controller="'meals'"
            :showAddBt="true"
            :value="searchValue"
            :actionButton="actionButton"
            @change="handleSearchValue"
          />
        </template>
        <template #list="slotProps">
          <div v-if="meals && meals.length != 0" class="col-12">
            <div
              class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
            >
              <img
                class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                :src="`http://localhost:1112/${slotProps.data.image}`"
                :alt="slotProps.data.name"
              />
              <div
                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
              >
                <div
                  class="flex flex-column align-items-center sm:align-items-start gap-3"
                >
                  <div class="text-2xl font-bold text-900">
                    {{ slotProps.data.name }}
                  </div>
                  <Rating
                    :modelValue="slotProps.data.rating"
                    readonly
                    :cancel="false"
                  ></Rating>
                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <i class="pi pi-code"></i>
                      <span class="font-semibold">{{
                        slotProps.data.dietCategory
                      }}</span>
                    </span>

                    <Tag
                      :value="slotProps.data.inventoryStatus"
                      :severity="getSeverity(slotProps.data)"
                    >
                    </Tag>
                  </div>
                </div>

                <div
                  class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                >
                  <span class="text-2xl font-semibold"
                    >${{ slotProps.data.calories }}</span
                  >
                  <Button
                    @click="fetchMeal(slotProps.data)"
                    severity="warning"
                    icon="pi pi-file-edit"
                    rounded
                    outlined
                  >
                  </Button>
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
              <div v-if="isLoading">
                <div
                  class="flex flex-wrap align-items-center justify-content-between gap-2"
                >
                  <Skeleton class="w-6rem border-round h-2rem" />
                  <Skeleton class="w-3rem border-round h-1rem" />
                </div>
                <div class="flex flex-column align-items-center gap-3 py-5">
                  <Skeleton class="w-9 shadow-2 border-round h-10rem" />
                  <Skeleton class="w-8rem border-round h-2rem" />
                  <Skeleton class="w-6rem border-round h-1rem" />
                </div>
                <div class="flex align-items-center justify-content-between">
                  <Skeleton class="w-4rem border-round h-2rem" />
                  <Skeleton shape="circle" class="w-3rem h-3rem" />
                </div>
                <div class="flex flex-column gap-3 mb-3">
                  <Skeleton class="w-9 shadow-2 border-round h-2rem" />
                  <Skeleton class="w-9 shadow-2 border-round h-2rem" />
                </div>
                <div>
                  <Skeleton class="shadow-2 border-round h-10rem" />
                </div>
              </div>
              <div v-else>
                <div
                  class="flex flex-wrap align-items-center justify-content-between gap-2"
                >
                  <div class="flex align-items-center gap-2">
                    <i class="pi pi-code"></i>
                    <span class="font-semibold">{{
                      slotProps.data.dietCategory
                    }}</span>
                  </div>
                </div>

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
                  <Rating
                    :modelValue="slotProps.data.rating"
                    readonly
                    :cancel="false"
                  ></Rating>
                  <Tag
                    :value="slotProps.data.inventoryStatus"
                    :severity="getSeverity(slotProps.data)"
                    >HERE MIGHT BE THE STOCK FOR THE FOOD</Tag
                  >
                </div>

                <div class="flex align-items-center justify-content-between">
                  <span class="text-2xl font-semibold"
                    >{{ slotProps.data.calories }} Kj</span
                  >
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
            <Message severity="warn">There are no meals</Message>
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
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, watch } from "vue";
import * as yup from "yup";
import DataView from "primevue/dataview";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import axios from "axios";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Toast from "primevue/toast";
import Skeleton from "primevue/skeleton";
import InlineMessage from "primevue/inlinemessage";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import GenericToolbar from "../../components/GenericToolbar.vue";
import { useField, useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { eFormMode } from "@/assets/enums/EFormMode";
import { PrimeIcons } from "primevue/api";
import DetailDrawer from "../../components/DetailDrawer.vue";
import MealForm from "../../components/formController/MealForm.vue";

export default defineComponent({
  name: "MealsPage",
  components: {
    DataView,
    Accordion,
    AccordionTab,
    Skeleton,
    ProgressSpinner,
    GenericToolbar,
    Tag,
    Rating,
    DetailDrawer,
    MealForm,
  },
  props: {
    shouldCrud: { type: Boolean, required: true },
    shouldRate: { type: Boolean, required: true },
  },
  setup() {
    const formDrawerMode = ref<string>("");
    const meals = ref<any>([]);
    const currentPage = ref<number>(1);
    const pageSize = ref<any>(3);
    const totalItems = ref<number>(0);
    const isLoading = ref<boolean>(false);
    const searchValue = ref<string>("");
    const formData = ref<any>(null);

    const handleAddData = () => {
      formDrawerMode.value = eFormMode.Add;
    };

    const onEditClick = (data: any, rowId: number) => {
      formDrawerMode.value = eFormMode.Edit;
      formData.value = data;
    };

    const invalidateState = () => {
      formDrawerMode.value = "";
      formData.value = null;
    };

    const fetchMeals = async () => {
      isLoading.value = true;
      try {
        const res: any = await axios.post("/table/meals", {
          page: currentPage.value,
          pageSize: pageSize.value,
          search: searchValue.value,
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
      fetchMeals();
    });

    const layout = ref<"grid" | "list" | undefined>("grid");
    const openDrawer = ref<boolean>(false);
    const openModal = ref<boolean>(false);
    const mealIdToDelete = ref<number>(0);
    const mealImage = ref<any>(null);
    const toast = useToast();

    const handleCloseDrawer = () => {
      openDrawer.value = false;
    };
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
      intolerance: yup
        .string()
        .required("Intolerance is required")
        .label("Intolerance"),
    });

    const { handleSubmit, defineInputBinds, resetForm } = useForm({
      validationSchema: schema,
    });

    const actionButton = ref<any>({
      component: Button,
      props: {
        icon: PrimeIcons.PLUS,
        label: "Insert",
        severity: "primary",
        onClick: handleAddData,
      },
    });

    const handleDeleteMethod = (mealId: number) => {
      mealIdToDelete.value = mealId;
      openModalFunction();
    };

    const openModalFunction = () => {
      openModal.value = true;
    };

    const handleModalClose = () => {
      openModal.value = false;
    };

    async function onSubmit(values: any) {
      let res: any = null;

      if (formDrawerMode.value === "create")
        res = await axios.post("/meals", values);
      else if (formDrawerMode.value === "edit")
        res = await axios.put(`/meals/${values.id}`, values);

      if (res && res.data.doc) {
        toast.add({
          life: 3000,
          detail: res.data.message,
          severity: "success",
          summary: "info",
        });
        handleCloseDrawer();
        resetForm();
        fetchMeals();
      }
    }

    const deleteMeal = async (mealId: number) => {
      try {
        const res: any = await axios.delete(`/meals/${mealIdToDelete.value}`);
        if (res && res.data.message) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "error",
            summary: "info",
          });
          handleModalClose();
          fetchMeals();
        }
      } catch (err) {
        console.log(err, "ERROR");
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
    ]);

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

    const fetchMeal = (meal: any) => {
      const mealObjectToAdd = JSON.parse(JSON.stringify(meal));
      formDrawerMode.value = "edit";
      resetForm({ values: mealObjectToAdd });
    };

    return {
      meals,
      isLoading,
      getSeverity,
      layout,
      searchValue,
      handleSearchValue,
      formDrawerMode,
      fetchMeals,
      schema,
      formData,
      invalidateState,
      handleAddData,
      actionButton,
      fetchMeal,
    };
  },
});
</script>

<style scoped>
.InputGroup {
  padding: 10px;
  border: 2px dotted black;
  margin-bottom: 30px;
  position: relative;
}

::v-deep .ingredients {
  all: unset !important;
}
::v-deep .custom-dropdown-style {
  background-color: lightgray;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 4px;
}
.image-wrapper {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
