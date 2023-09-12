<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import * as yup from "yup";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions"; // optional
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import Drawer from "../../components/Drawer.vue";
import InputText from "../../components/formElements/InputText.vue";
import Button from "primevue/button";
import { useForm, FieldArray, useField } from "vee-validate";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Toast from "primevue/toast";
import Modal from "../../components/Modal.vue";
import InputPV from "primevue/inputtext";
import Paginator from "primevue/paginator";
import Skeleton from "primevue/skeleton";
import InlineMessage from "primevue/inlinemessage";
import FileUpload from "primevue/fileupload";
import Message from "primevue/message";
import Tooltip from "primevue/tooltip";
import ProgressSpinner from "primevue/progressspinner";

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

onMounted(async () => {
  await fetchMeals(currentPage.value, pageSize.value, searchValue.value);
});

const toast = useToast();

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
  calories: yup.number().required("Calories are required").label("Calories"),
  intolerance: yup
    .string()
    .required("Intolerance is required")
    .label("Intolerance"),
});

const { value: name } = useField<any>("name");
const { value: cousine } = useField("cousine");
const { value: carbonFootprint } = useField("carbonFootprint");
const { value: dietCategory } = useField("dietCategory");
const { value: calories } = useField("calories");
const { value: intolerance } = useField("intolerance");

const openDrawerFunction = () => {
  formDrawerMode.value = "create";
  openDrawer.value = true;
};

const handleCloseDrawer = () => {
  openDrawer.value = false;
  uploadPhotoForm.value = false;
};

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

// async function fetchData() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         name: "John Doe",
//         email: "test@email.com",
//       });
//     }, 1500);
//   });
// }

const initialData = {
  ingredients: [
    {
      name: "",
      portion: null,
    },
  ],
};

const { handleSubmit, defineInputBinds, resetForm } = useForm({
  initialValues: initialData,
  validationSchema: schema,
});

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
    fetchMeals(currentPage.value, pageSize.value, "");
  }
}

const layout = ref<"grid" | "list" | undefined>("grid"); // Define the type for 'layout'
const openDrawer = ref<boolean>(false);
const openModal = ref<boolean>(false);
const mealIdToDelete = ref<number>(0);
const mealImage = ref<any>(null);

const drawerActions = ref<any[]>([
  {
    component: Button,
    props: {
      type: "Submit",
      icon: "pi pi-times",
      label: "Submit",
      severity: "primary",
      onclick: handleSubmit(onSubmit),
    },
  },
  {
    component: Button,
    props: {
      label: "Cancel",
      icon: "pi pi-check",
      severity: "info",
      onclick: handleCloseDrawer,
    },
  },
]);

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
      fetchMeals(currentPage.value, pageSize.value, searchValue.value);
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

const onAdvancedUpload = async (event: any) => {
  const file = event.files[0];
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res: any = await axios.put(
      `/meals/image/${mealIdToDelete.value}`,
      formData
    );

    if (res && res.data.message) {
      toast.add({
        life: 3000,
        detail: res.data.message,
        severity: "success",
        summary: "info",
      });
      handleCloseDrawer();
      fetchMeals(currentPage.value, pageSize.value, "");
    }
  } catch (err) {
    console.log(err, "ERR");
  }
};

const fetchMeal = (meal: any) => {
  const mealObjectToAdd = JSON.parse(JSON.stringify(meal));
  openDrawerFunction();
  formDrawerMode.value = "edit";
  resetForm({ values: mealObjectToAdd });
};

const handlePageChange = (event: any) => {
  // currentPage.value = event.page + 1;
  const newPage = event.page + 1;
  if (newPage !== currentPage.value) {
    currentPage.value = newPage;
    fetchMeals(newPage, pageSize.value, searchValue.value);
  }
  // fetchMeals(event.page + 1, pageSize.value, searchValue.value);
};

const handleRowDropdownChange = (rowsPerPage: any) => {
  pageSize.value = rowsPerPage;
  fetchMeals(currentPage.value, rowsPerPage, searchValue.value);
};

const uploadPhoto = (mealId: number, imageMeal: any) => {
  uploadPhotoForm.value = true;
  mealImage.value = imageMeal;
  console.log(mealImage.value);
  mealIdToDelete.value = mealId;
  openDrawerFunction();
};

const handleFileSelection = (event: any) => {
  blobImage.value = event.files[event.files.length - 1].objectURL;
};

const handleSearchValue = (event: any) => {
  searchValue.value = event.target.value;
  fetchMeals(currentPage.value, pageSize.value, event.target.value);
};

const removeBlobPhoto = () => {
  blobImage.value = "";
};
</script>
<template>
  <div class="card">
    <!-- <Button @click="openDrawerFunction"> Add Meal </Button> -->
    <div>
      <DataView :value="meals" :layout="layout" dataKey="id">
        <template #header>
          <div class="flex md:justify-content-between">
            <Button style="width: fit-content" @click="openDrawerFunction">
              Add Meal
            </Button>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputPV
                v-model="searchValue"
                @change="handleSearchValue"
                placeholder="Search"
              />
            </span>

            <DataViewLayoutOptions v-model="layout" />
          </div>
          <div style="margin-top: 1rem">
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
                  <div>
                    <Button
                      v-tooltip="'Upload image'"
                      @click="
                        uploadPhoto(slotProps.data.id, slotProps.data.image)
                      "
                      severity="help"
                      text
                      rounded
                      icon="pi pi-file-import"
                      style="width: 2.5rem"
                    >
                    </Button>
                    <Button
                      v-tooltip="'Delete meal'"
                      @click="handleDeleteMethod(slotProps.data.id)"
                      severity="danger"
                      text
                      rounded
                      icon="pi pi-delete-left"
                      style="width: 2.5rem"
                    >
                    </Button>
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
                  <Button
                    v-tooltip="'Edit image'"
                    @click="fetchMeal(slotProps.data)"
                    severity="warning"
                    icon="pi pi-file-edit"
                    rounded
                    outlined
                  >
                  </Button>
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

  <div>
    <Drawer
      v-model:openDrawer="openDrawer"
      @handleClose="handleCloseDrawer"
      :title="'Add ingredients'"
      :actions="drawerActions"
    >
      <div v-if="uploadPhotoForm">
        <FileUpload
          @select="handleFileSelection($event)"
          :multiple="false"
          accept="image/*"
          :maxFileSize="1000000"
          :custom-upload="true"
          @uploader="onAdvancedUpload($event)"
        >
          <template v-if="!mealImage" #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
          <template #content>
            <div
              v-if="mealImage"
              class="relative"
              style="display: flex; justify-content: center"
            >
              <Button
                icon="pi pi-times"
                rounded
                text
                :disabled="mealImage.includes('default.jpeg') ? true : false"
                severity="danger"
                class="absolute top-0 right-0"
                v-tooltip="
                  mealImage.includes('default.jpeg')
                    ? 'You have to choose a photo'
                    : ''
                "
                @click="removeBlobPhoto"
              />
              <div class="image-wrapper">
                <img
                  class="image-content"
                  :src="
                    blobImage && blobImage.includes('blob')
                      ? blobImage
                      : `http://localhost:1112/${mealImage}`
                  "
                  :alt="`Meal image`"
                />
              </div>
            </div>
          </template>
        </FileUpload>
      </div>
      <div v-else>
        <div style="margin-top: 1rem">
          <InputText
            name="name"
            :label="'Meal Name'"
            id="name"
            placeholder="Meal Name"
            v-bind="name"
          />
        </div>

        <div style="margin-top: 1rem">
          <InputText
            name="cousine"
            :label="'Cousine'"
            id="cousine"
            placeholder="Cousine"
            v-bind="cousine"
          />
        </div>

        <div style="margin-top: 1rem">
          <InputText
            :label="'Diet Category'"
            name="dietCategory"
            id="dietCategory"
            placeholder="Diet category"
            v-bind="dietCategory"
          />
        </div>

        <div style="margin-top: 1rem">
          <InputText
            :label="'Intolerance'"
            name="intolerance"
            id="intolerance"
            placeholder="Intolerance"
            v-bind="intolerance"
          />
        </div>

        <div style="margin-top: 1rem">
          <InputText
            :label="'Calories'"
            name="calories"
            type="number"
            id="calories"
            placeholder="Calories"
            v-bind="calories"
          />
        </div>

        <div style="margin-top: 1rem">
          <InputText
            :label="'Carbon footprint'"
            name="carbonFootprint"
            type="number"
            id="carbonFootprint"
            placeholder="Carbon footprint"
            v-bind="carbonFootprint"
          />
        </div>
        <FieldArray
          class="ingredients"
          name="ingredients"
          v-slot="{ fields, push, remove }"
        >
          <fieldset v-for="(field, idx) in fields" :key="field.key">
            <legend>Ingredient #{{ idx }}</legend>

            <div class="grid">
              <div
                class="col-9"
                :style="{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }"
              >
                <div :style="{ display: 'flex', flexDirection: 'column' }">
                  <label :for="`name_${idx}`">Name</label>
                  <InputText
                    :type="'text'"
                    :id="`name_${idx}`"
                    :name="`ingredients[${idx}].name`"
                  />
                  <!-- <ErrorMessage :name="`ingredients[${idx}].name`" /> -->
                </div>

                <div :style="{ display: 'flex', flexDirection: 'column' }">
                  <label :for="`portion_${idx}`">Portion</label>
                  <InputText
                    :type="'number'"
                    :id="`portion_${idx}`"
                    :name="`ingredients[${idx}].portion`"
                  />
                  <!-- <ErrorMessage :name="`ingredients[${idx}].portion`" /> -->
                </div>
              </div>

              <div class="col-3" style="display: flex; align-items: center">
                <Button
                  icon="pi pi-times"
                  rounded
                  severity="danger"
                  @click="remove(idx)"
                  :disabled="fields.length <= 1"
                />
              </div>
            </div>
          </fieldset>

          <Button
            severity="success"
            style="margin-top: 1rem"
            @click="push({ name: '', portion: null })"
          >
            Add ingredient
          </Button>
        </FieldArray>
      </div>
    </Drawer>
  </div>
  <Toast />

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
  /* Your custom styles for the dropdown go here */
  background-color: lightgray;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 4px;
}
.image-wrapper {
  width: 150px; /* Set your desired width */
  height: 150px; /* Set your desired height */
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Preserve aspect ratio while filling the container */
}
/* ::v-deep .p-fileupload-file-thumbnail {
  width: 100%;
  height: 300px;
} */
</style>
