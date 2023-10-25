<template>
  <div class="card">
    <!-- <Button @click="openDrawerFunction"> Add Meal </Button> -->
    <div>
      <DataView :value="meals" :layout="layout" dataKey="id">
        <template #header>
          <GenericToolbar
            :show-export="true"
            :showSearch="true"
            :controller="'meals'"
            :value="searchValue"
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
</template>

<script lang="ts">
import { ref, onMounted, computed, nextTick, defineComponent } from "vue";
import * as yup from "yup";
import DataView from "primevue/dataview";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import InputText from "../../components/formElements/InputText.vue";
import Button from "primevue/button";
import { useForm, FieldArray, useField } from "vee-validate";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Toast from "primevue/toast";
import Skeleton from "primevue/skeleton";
import InlineMessage from "primevue/inlinemessage";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import GenericToolbar from "../../components/GenericToolbar.vue";
export default defineComponent({
  name: "UserMainPage",
  components: {
    DataView,
    Accordion,
    AccordionTab,
    Skeleton,
    ProgressSpinner,
    GenericToolbar,
    Tag,
    Rating,
  },
  props: {},
  setup() {
    let meals = ref<any>([]);
    let formDrawerMode = ref<string>("");

    const currentPage = ref<number>(1);
    const pageSize = ref<any>(3);
    const totalItems = ref<number>(0);
    const isLoading = ref<boolean>(false);
    const uploadPhotoForm = ref<boolean>(false);
    const blobImage = ref<string>("");
    const searchValue = ref<string>("");

    const fetchMeals = async (
      currentPage: number,
      pageSize: number,
      ssV: string
    ) => {
      isLoading.value = true;
      const res: any = await axios.post("/table/meals", {
        page: currentPage,
        pageSize: pageSize,
        search: ssV,
      });
      if (res && res.data) {
        console.log(res.data.rows, "aaaaaaaaaaaaaaaa");
        meals.value = res.data.rows;
        totalItems.value = res.data.totalCount;
      }
      isLoading.value = false;
    };

    const handleSearchValue = (event: any) => {
      setTimeout(() => {
        searchValue.value = event.target.value;
        currentPage.value = 1;
      }, 100);
    };

    onMounted(async () => {
      await fetchMeals(currentPage.value, pageSize.value, searchValue.value);
    });

    const layout = ref<"grid" | "list" | undefined>("grid");
    const mealImage = ref<any>(null);

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

    return {
      meals,
      isLoading,
      getSeverity,
      layout,
      searchValue,
      handleSearchValue,
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

::v-deep .p-paginator {
  background-color: transparent !important;
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
