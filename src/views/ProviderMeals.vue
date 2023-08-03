<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as yup from "yup";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions"; // optional
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import Drawer from "../components/Drawer.vue";
import InputText from "../components/formElements/InputText.vue";
import Button from "primevue/button";
import { useForm, FieldArray, useField } from "vee-validate";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

let meals = ref<any>([]);
const fetchMeals = async () => {
  const res: any = await axios.get("/meal/get-all");
  console.log(res, "res ");
  if (res.data) meals.value = res.data.meals;
};

onMounted(async () => {
  await fetchMeals();
});

const toast = useToast();

const products = ref<any>([
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
]);

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

const { field: name } = useField("name");
const { field: cousine } = useField("cousine");
const { field: carbonFootprint } = useField("carbonFootprint");
const { field: dietCategory } = useField("dietCategory");
const { field: calories } = useField("calories");
const { field: intolerance } = useField("intolerance");

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
  name: "",
};

const { handleSubmit, defineInputBinds, resetForm } = useForm({
  initialValues: initialData,
  validationSchema: schema,
});

async function onSubmit(values: any) {
  const res: any = await axios.post("/meal/post", values);
  if (res.data.message) {
    toast.add({
      life: 3000,
      detail: "INFO",
      severity: "success",
      summary: res.data.message,
    });
    handleCloseDrawer();
    resetForm();
    fetchMeals();
  }
}

const layout = ref<"grid" | "list" | undefined>("grid"); // Define the type for 'layout'
const openDrawer = ref<boolean>(false);
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
    props: { label: "Cancel", icon: "pi pi-check", severity: "info" },
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
  const mealObject = JSON.parse(JSON.stringify(meal));
  openDrawerFunction();
  resetForm({ values: mealObject });
};

const openDrawerFunction = () => {
  openDrawer.value = true;
};

const handleCloseDrawer = () => {
  openDrawer.value = false;
};
</script>
<template>
  <div class="card">
    <DataView :value="meals" :layout="layout" dataKey="id">
      <template #header>
        <div class="flex justify-content-between">
          <Button @click="openDrawerFunction"> Add Meal </Button>
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div
            class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
          >
            <img
              class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
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
                >
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
              <div class="flex align-items-center gap-2">
                <i class="pi pi-code"></i>
                <span class="font-semibold">{{
                  slotProps.data.dietCategory
                }}</span>
              </div>
              <Tag
                :value="slotProps.data.inventoryStatus"
                :severity="getSeverity(slotProps.data)"
              ></Tag>
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img
                class="w-9 shadow-2 border-round"
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.name"
              />
              <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
              <Rating
                :modelValue="slotProps.data.rating"
                readonly
                :cancel="false"
              ></Rating>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold"
                >{{ slotProps.data.calories }} Kj</span
              >
              <Button
                @click="fetchMeal(slotProps.data)"
                severity="warning"
                icon="pi pi-file-edit"
                rounded
              >
              </Button>
            </div>

            <div :style="{ marginTop: '1rem' }">
              <span :style="{ fontWeight: 'bold' }"> Carbon Footprint: </span>
              {{ slotProps.data.carbonFootprint }} %
            </div>

            <div :style="{ marginTop: '1rem' }">
              <span :style="{ fontWeight: 'bold' }"> Intolerance: </span>
              {{ slotProps.data.intolerance }}
            </div>
            <div :style="{ marginTop: '1rem' }">
              <Accordion :activeIndex="0">
                <AccordionTab :key="'Ingredients'" :header="'Ingredients '">
                  <div
                    v-for="ingredient in slotProps.data.ingredients"
                    v-bind:key="ingredient.id"
                  >
                    <ul>
                      <li>ingredient: {{ ingredient.name }}</li>
                      <li>amount: {{ ingredient.portion }}</li>
                    </ul>
                  </div>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>

  <div>
    <Drawer
      v-model:openDrawer="openDrawer"
      @handleClose="handleCloseDrawer"
      :title="'Add ingredients'"
      :actions="drawerActions"
    >
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
          @click="push({ email: '', portion: null })"
        >
          Add ingredient
        </Button>
      </FieldArray>
    </Drawer>
  </div>
  <Toast />
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
</style>
