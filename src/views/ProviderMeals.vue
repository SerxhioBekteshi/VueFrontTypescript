<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import * as yup from "yup";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions"; // optional
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import Drawer from "../components/Drawer.vue";
// import InputText from "primevue/inputtext";
import InputText from "../components/formElements/InputText.vue";
import Button from "primevue/button";
import {
  useForm,
  Field,
  Form,
  ErrorMessage,
  FieldArray,
  useFormValues,
  useField,
  useFieldArray,
} from "vee-validate";
import ValidationError from "../components/ValidationError.vue";

// onMounted(() => {
//   // ProductService.getProducts().then((data) => (products.value = data.slice(0, 12)));
// });

onMounted(async () => {
  // const data = await fetchData();
  // resetForm({ values: data });
});

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
        name: yup.string().required().label("Name"),
        portion: yup.number().required().label("Portion"),
      })
    )
    .strict(),
});

// const formSchema = yup.object({
// email: yup.string().required().email(),
// name: yup.string().required("Name is required"),
// cousine: yup.string().required("Cousine is required"),
// carbonFootprint: yup.number().required("Carbon footprint is required"),
// dietCategory: yup.string().required("Diet category is required"),
// // calories: yup.number().required("Calories are required"),
// intolerance: yup.string().required("Intolereance is required"),
// ingredients: yup.string().required("Ingredients are required"),
// });

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

const { errors, handleSubmit, defineInputBinds } = useForm({
  initialData,
  validationSchema: schema,
});
const { values } = useFormValues();
const { field, errorMessage } = useField("ingredients");
const { fields, push, remove } = useFieldArray("ingredients");

const onSubmit = handleSubmit((values) => {
  console.log(values, "vALUUESS VALUES");
  // alert(JSON.stringify(values, null, 2));
});

// function onSubmit(values: any) {
// console.log(values);
// }

// const name = defineInputBinds("name");
// const cousine = defineInputBinds("cousine");
// const carbonFootprint = defineInputBinds("carbonFootprint");
// const dietCategory = defineInputBinds("dietCategory");
// const calories = defineInputBinds("calories");
// const intolerance = defineInputBinds("intolerance");
// const ingredients = defineInputBinds("ingredients");

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
      onclick: onSubmit,
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

// const handleRemovee = (id: number, fields: any) =>
// {
//   if (fields.length === 1)
//   return else
//     remove(id)
// }

const openDrawerFunction = () => {
  openDrawer.value = true;
};

const handleCloseDrawer = () => {
  openDrawer.value = false;
};
</script>
<template>
  <div class="card">
    <DataView :value="products" :layout="layout" dataKey="id">
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
                    <i class="pi pi-tag"></i>
                    <span class="font-semibold">{{
                      slotProps.data.category
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
                  >${{ slotProps.data.price }}</span
                >
                <Button
                  icon="pi pi-shopping-cart"
                  rounded
                  :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
                ></Button>
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
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ slotProps.data.category }}</span>
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
                >${{ slotProps.data.price }}</span
              >
              <Button
                icon="pi pi-shopping-cart"
                rounded
                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
              ></Button>
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
      <Form :initial-values="initialData" :validation-schema="schema">
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
                    :style="{ width: '100%' }"
                  />
                  <!-- <ErrorMessage :name="`ingredients[${idx}].name`" /> -->
                </div>

                <div :style="{ display: 'flex', flexDirection: 'column' }">
                  <label :for="`portion_${idx}`">Portion</label>
                  <InputText
                    :type="'number'"
                    :id="`portion_${idx}`"
                    :name="`ingredients[${idx}].portion`"
                    :style="{ width: '100%' }"
                  />
                  <!-- <ErrorMessage :name="`ingredients[${idx}].portion`" /> -->
                </div>
              </div>

              <div class="col-3" style="display: flex; align-items: center">
                <Button
                  class="p-button-rounded"
                  severity="danger"
                  @click="remove(idx)"
                  :disabled="fields.length <= 1"
                >
                  <i class="pi pi-times"></i>
                </Button>
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

        <!-- <button type="submit">Submit</button> -->
      </Form>

      <!-- <form @submit="onSubmit"> -->
      <!-- <div class="flex flex-wrap mb-1 gap-1">
          <label for="name" class="p-sr-only">name</label>

          <InputText name="name" type="name" />onSubmit
        </div> -->

      <!-- <div class="flex flex-wrap mb-1 gap-1">
          <label for="cousine" class="p-sr-only">cousine</label>

          <InputText
            name="cousine"
            @input="cousine.onChange"
            class="fullWidth"
            placeholder="Cousine"
            :style="{ width: '100%', borderColor: errors.cousine ? 'red' : '' }"
            v-bind="cousine"
          />
          <ValidationError v-if="errors.cousine">{{
            errors.cousine
          }}</ValidationError>
        </div>

        <div class="flex flex-wrap mb-1 gap-1">
          <label for="carbonFootprint" class="p-sr-only"
            >Carbon footprint</label
          >
          <InputNumber
            name="carbonFootprint"
            id="carbonFootprint"
            @input="carbonFootprint.onChange"
            class="fullWidth"
            placeholder="Carbon footprint"
            :style="{
              width: '100%',
              borderColor: errors.carbonFootprint ? 'red' : '',
            }"
            v-bind="carbonFootprint"
          />
          <ValidationError v-if="errors.carbonFootprint">{{
            errors.carbonFootprint
          }}</ValidationError>
        </div>

        <div class="flex flex-wrap mb-1 gap-1">
          <label for="dietCategory" class="p-sr-only">Diet Category</label>

          <InputText
            name="dietCategory"
            @input="dietCategory.onChange"
            class="fullWidth"
            placeholder="Diet Category"
            :style="{
              width: '100%',
              borderColor: errors.dietCategory ? 'red' : '',
            }"
            v-bind="dietCategory"
          />
          <ValidationError v-if="errors.dietCategory">{{
            errors.dietCategory
          }}</ValidationError>
        </div>

        <div class="flex flex-wrap mb-1 gap-1">
          <label for="calories" class="p-sr-only">calories</label>

          <InputNumber
            name="calories"
            @input="calories.onChange"
            class="fullWidth"
            placeholder="Calories"
            :style="{
              width: '100%',
              borderColor: errors.calories ? 'red' : '',
            }"
            v-bind="calories"
          />
          <ValidationError v-if="errors.calories">{{
            errors.calories
          }}</ValidationError>
        </div>

        <div class="flex flex-wrap mb-1 gap-1">
          <label for="intolerance" class="p-sr-only">Intolerance</label>

          <InputText
            name="intolerance"
            @input="intolerance.onChange"
            class="fullWidth"
            placeholder="Intolerance"
            :style="{
              width: '100%',
              borderColor: errors.intolerance ? 'red' : '',
            }"
            v-bind="intolerance"
          />
          <ValidationError v-if="errors.intolerance">{{
            errors.intolerance
          }}</ValidationError>
        </div> -->
      <!-- </form> -->
    </Drawer>
  </div>
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
