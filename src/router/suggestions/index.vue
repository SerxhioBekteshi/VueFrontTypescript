<template>
  <div
    class="flex justify-content-center my-3"
    v-if="ability.can('custom', 'suggestions')"
  >
    <Button
      label="Refresh"
      icon="pi pi-refresh"
      iconPos="left"
      severity="contrast"
      @click="getAISuggestedMeals"
      :disabled="isLoading"
      text
    />
  </div>
  <div v-if="!isLoading">
    <div class="surface-ground">
      <div class="grid" v-if="mealsToShow.length !== 0">
        <div
          v-for="(suggestion, index) in mealsToShow"
          :key="index"
          class="col-12 md:col-6 lg:col-4"
        >
          <div
            class="card shadow-2 p-3 border-round"
            :class="{
              'border-primary-500': suggestion?.highlight,
            }"
            style="min-height: 600px"
          >
            <div
              class="card"
              style="margin: 0.25rem"
              :class="{
                'border-red-700': suggestion?.isDifferent,
              }"
            >
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">{{
                    suggestion.name
                  }}</span>
                  <div class="text-900 font-medium text-xl">
                    {{ suggestion.calories }} Calories
                  </div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <div class="image-wrapper">
                    <img
                      class="image-content"
                      :src="`http://localhost:1112/public/images/meals/default.jpeg`"
                      :alt="suggestion.name"
                    />
                    {{ suggestion.image }}
                  </div>
                </div>
              </div>
              <div class="flex justify-content-between">
                <div>
                  <span class="text-green-500 font-medium"
                    >{{ suggestion.dietCategory }}
                  </span>
                  <p>
                    <span class="text-500">{{ suggestion.intolerance }}</span>
                  </p>
                  <p>
                    <span class="text-red-500">{{
                      suggestion.achievement
                    }}</span>
                  </p>
                  <p>
                    <span class="text-purple-500">{{
                      suggestion.cousine
                    }}</span>
                  </p>
                  <strong> Carbon Footprint: </strong>
                  <span class="text-red-500">{{
                    suggestion.carbonFootprint
                  }}</span>
                </div>
                <div>
                  <div v-if="ability.can('custom', 'suggestions')">
                    <Button
                      v-tooltip="'Make suggestion to provider'"
                      icon="pi pi-star"
                      severity="danger"
                      rounded
                      outlined
                      @click="
                        () => makeSuggestionOfMealToAllProviders(suggestion)
                      "
                      aria-label="Star"
                    />
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      gap: 1rem;
                      align-items: center;
                    "
                  >
                    <div
                      v-if="
                        ability.can('add', 'suggestions') &&
                        suggestion?.isDifferent === false
                      "
                    >
                      <Button
                        v-tooltip="'Create suggested meal'"
                        icon="pi pi-plus"
                        severity="info"
                        rounded
                        outlined
                        @click="
                          () => {
                            storedSuggestion = suggestion;
                            openDrawer = true;
                          }
                        "
                        aria-label="Star"
                      />
                    </div>
                    <div
                      v-if="
                        ability.can('delete', 'suggestions') &&
                        suggestion?.isDifferent === true
                      "
                      class="flex align-items-center"
                    >
                      <Button
                        class="mt-3"
                        v-tooltip="'Delete suggestion'"
                        icon="pi pi-trash"
                        severity="danger"
                        rounded
                        outlined
                        @click="() => deleteSuggestion(suggestion)"
                        aria-label="Star"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid p-2 mt-2">
                <div
                  class="col-12 md:col-12 mt-2 p-3"
                  style="border-radius: 1rem"
                >
                  <h5>Nutrition Values</h5>
                  <div
                    v-for="(
                      nutritionValue, index
                    ) in suggestion.nutritionValues"
                    :key="index"
                  >
                    <div class="flex gap-2 my-1">
                      <span> {{ nutritionValue.name }}</span>
                      <span>
                        <strong> {{ nutritionValue.value }} g </strong></span
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 md:col-12 mt-2 p-3"
                  style="border-radius: 1rem"
                >
                  <h5>Ingredients</h5>
                  <div
                    v-for="(nutritionValue, index) in suggestion.ingredients"
                    :key="index"
                  >
                    <div class="flex gap-2 my-1">
                      <span> {{ nutritionValue.name }}</span>
                      <span>
                        <strong> {{ nutritionValue.portion }} g </strong></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Message severity="error">There are no suggestions</Message>
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex justify-content-center align-items-center"
    style="height: 70vh"
  >
    <ProgressSpinner />
  </div>

  <Drawer
    :title="'Fulfill more meal data'"
    v-model:openDrawer="openDrawer"
    @handleClose="() => (openDrawer = false)"
    :actions="drawerActions"
  >
    <FloatLabel class="my-5">
      <InputText type="number" id="price" v-model="additionMealData.price" />
      <label for="price">Price</label>
    </FloatLabel>

    <FloatLabel class="my-5 w-100">
      <InputText id="stock" v-model="additionMealData.stock" />
      <label for="stock">Stock</label>
    </FloatLabel>

    <!-- <FileUpload
      @select="handleFileSelection($event)"
      :multiple="false"
      :maxFileSize="1000000"
      accept="image/*"
      :custom-upload="true"
      :cancelLabel="'Remove'"
      :showUploadButton="false"
      :showCancelButton="false"
      @error="handleError"
    >
      <template #content>
        <div v-if="additionMealData.image" class="image-wrapper">
          <img
            class="image-content"
            :src="additionMealData.image"
            alt="imageUpload"
          />
          <Badge :value="'Pending'" size="large" severity="warning"></Badge>
        </div>
         <div v-else-if="imageData.image">
          <img
            class="image-content"
            :src="`http://localhost:1112/${imageData.image}`"
            alt="imageUpload"
          />
        </div>
      </template>
    </FileUpload> -->

    <div class="mt-3">
      <ValidationError
        v-if="additionMealData.priceError || additionMealData.image"
        >{{ additionMealData.priceError }}
        {{ additionMealData.image }}</ValidationError
      >
    </div>
  </Drawer>
</template>

<script lang="ts">
import { eRoles } from "@/assets/enums/eRoles";
import { RootState } from "@/store/vuexStore/types";
import { useAbility } from "@casl/vue";
import axios from "axios";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { useToast } from "primevue/usetoast";
import { computed, defineComponent, onMounted, shallowRef, watch } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import IMeal from "@/interfaces/database/IMeal";
import Drawer from "@/components/Drawer.vue";
// import FileUpload from "primevue/fileupload";
import ValidationError from "@/components/ValidationError.vue";
import Message from "primevue/message";
import _ from "lodash";
import ProgressSpinner from "primevue/progressspinner";
import { useRoute } from "vue-router";
import { hasFieldWithoutValue } from "@/utils/functions";
// import Badge from "primevue/badge";

export default defineComponent({
  name: "SuggestionsPage",
  components: {
    Button,
    InputText,
    FloatLabel,
    Drawer,
    // FileUpload,
    ValidationError,
    Message,
    ProgressSpinner,
    // Badge,
  },
  enums: {},
  props: {},
  setup() {
    const store = useStore<RootState>();
    const user = computed(() => store.getters.getUserInfo);
    const ability = useAbility();
    const isLoading = ref<boolean>(true);
    const additionMealData = ref<any>({
      price: 0,
      priceError: "",
      stock: 0,
      image: null,
      imageError: "",
    });
    const openDrawer = ref<boolean>(false);
    const storedSuggestion = ref<IMeal>();
    const allPropertiesFromMeal = ref<any>([]);
    const mealsWithMissingFields = ref<any>([]);

    const handleFileSelection = (event: any) => {
      additionMealData.value.image =
        event.files[event.files.length - 1].objectURL;
    };

    const handleError = () => {
      toast.add({
        life: 3000,
        detail: "awd",
        severity: "error",
        summary: "error image custom",
      });
    };

    watch(
      () => additionMealData.value.price,
      (newValue, oldValue) => {
        if (newValue !== 0) {
          additionMealData.value.priceError = "";
        }
      }
    );

    const createSuggestedMeal = async () => {
      const whichSuggestion = allPropertiesFromMeal.value.find((item: any) => {
        const first = JSON.parse(JSON.parse(JSON.stringify(item.meal)));
        const second = JSON.parse(JSON.stringify(storedSuggestion.value));
        delete first?.highlight;
        delete second?.highlight;
        delete first?.isDifferent;
        delete second?.isDifferent;
        console.log(_.isEqual(first, second));
        return _.isEqual(first, second);
      });

      if (additionMealData.value.price != 0 && storedSuggestion.value) {
        storedSuggestion.value.price = Number(additionMealData.value.price);
      } else {
        additionMealData.value.priceError = "Price can not be 0";
      }
      // if (additionMealData.value.image && storedSuggestion.value) {
      //   storedSuggestion.value.image = additionMealData.value.image;
      // } else {
      //   additionMealData.value.imageError = "Image can not be null";
      // }
      if (additionMealData.value.stock && storedSuggestion.value) {
        storedSuggestion.value.stock = Number(additionMealData.value.stock);
      }
      console.log(storedSuggestion);

      try {
        const res = await axios.post(
          `/meals/${whichSuggestion.id}`,
          storedSuggestion.value
        );

        if (res && res.data) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: res.data.message,
            life: 3000,
          });
          openDrawer.value = false;
          await getSuggestedMealsAsProvider();
          // const res2 = await axios.put(`/meals/${res.data.id}`, );
        }
      } catch (Error: any) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: Error,
          life: 3000,
        });
      }
    };

    const drawerActions = shallowRef<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Submit",
          severity: "primary",
          onClick: createSuggestedMeal,
        },
      },
      {
        component: Button,
        props: {
          label: "Cancel",
          icon: "pi pi-check",
          severity: "info",
          onClick: () => (openDrawer.value = false),
        },
      },
    ]);
    const suggestedMeals = ref<any>([
      {
        name: "Spaghetti Carbonara",
        ingredients: [
          { portion: "200g", name: "Spaghetti" },
          { portion: "100g", name: "Pancetta" },
          { portion: "2", name: "Eggs" },
          { portion: "50g", name: "Parmesan Cheese" },
        ],
        cousine: "Italian",
        carbonFootprint: 2.1,
        dietCategory: "Non-Vegetarian",
        nutritionValues: [
          { name: "Protein", value: "25g" },
          { name: "Carbohydrates", value: "75g" },
          { name: "Fat", value: "20g" },
        ],
        calories: 600,
        achievement: "Muscle Gain",
        intolerance: "Dairy",
      },
      {
        name: "Vegan Buddha Bowl",
        ingredients: [
          { portion: "150g", name: "Quinoa" },
          { portion: "100g", name: "Chickpeas" },
          { portion: "50g", name: "Avocado" },
          { portion: "50g", name: "Spinach" },
          { portion: "30g", name: "Carrots" },
        ],
        cousine: "Fusion",
        carbonFootprint: 1.0,
        dietCategory: "Vegan",
        nutritionValues: [
          { name: "Protein", value: "15g" },
          { name: "Carbohydrates", value: "60g" },
          { name: "Fat", value: "15g" },
        ],
        calories: 450,
        achievement: "Weight Loss",
        intolerance: "None",
      },
      {
        name: "Chicken Tikka Masala",
        ingredients: [
          { portion: "200g", name: "Chicken" },
          { portion: "100g", name: "Yogurt" },
          { portion: "50g", name: "Tomato Sauce" },
          { portion: "30g", name: "Onion" },
          { portion: "10g", name: "Spices" },
        ],
        cousine: "Indian",
        carbonFootprint: 2.5,
        dietCategory: "Non-Vegetarian",
        nutritionValues: [
          { name: "Protein", value: "30g" },
          { name: "Carbohydrates", value: "20g" },
          { name: "Fat", value: "25g" },
        ],
        calories: 550,
        achievement: "Muscle Gain",
        intolerance: "Dairy",
      },
      {
        name: "Caesar Salad",
        ingredients: [
          { portion: "150g", name: "Romaine Lettuce" },
          { portion: "50g", name: "Parmesan Cheese" },
          { portion: "50g", name: "Croutons" },
          { portion: "30g", name: "Caesar Dressing" },
        ],
        cousine: "American",
        carbonFootprint: 1.2,
        dietCategory: "Vegetarian",
        nutritionValues: [
          { name: "Protein", value: "10g" },
          { name: "Carbohydrates", value: "30g" },
          { name: "Fat", value: "20g" },
        ],
        calories: 350,
        achievement: "Weight Loss",
        intolerance: "Dairy",
      },
      {
        name: "Beef Stroganoff",
        ingredients: [
          { portion: "200g", name: "Beef" },
          { portion: "100g", name: "Mushrooms" },
          { portion: "50g", name: "Onion" },
          { portion: "30g", name: "Sour Cream" },
          { portion: "100g", name: "Pasta" },
        ],
        cousine: "Russian",
        carbonFootprint: 3.0,
        dietCategory: "Non-Vegetarian",
        nutritionValues: [
          { name: "Protein", value: "30g" },
          { name: "Carbohydrates", value: "40g" },
          { name: "Fat", value: "25g" },
        ],
        calories: 650,
        achievement: "Muscle Gain",
        intolerance: "Dairy",
      },
      {
        name: "Vegetable Stir Fry",
        ingredients: [
          { portion: "200g", name: "Mixed Vegetables" },
          { portion: "100g", name: "Tofu" },
          { portion: "50g", name: "Soy Sauce" },
          { portion: "30g", name: "Ginger" },
          { portion: "100g", name: "Rice" },
        ],
        cousine: "Chinese",
        carbonFootprint: 1.5,
        dietCategory: "Vegan",
        nutritionValues: [
          { name: "Protein", value: "15g" },
          { name: "Carbohydrates", value: "60g" },
          { name: "Fat", value: "10g" },
        ],
        calories: 400,
        achievement: "Improved Digestion",
        intolerance: "Soy",
      },
      {
        name: "Fish Tacos",
        ingredients: [
          { portion: "200g", name: "Fish" },
          { portion: "100g", name: "Tortillas" },
          { portion: "50g", name: "Cabbage" },
          { portion: "30g", name: "Salsa" },
          { portion: "20g", name: "Avocado" },
        ],
        cousine: "Mexican",
        carbonFootprint: 2.0,
        dietCategory: "Pescatarian",
        nutritionValues: [
          { name: "Protein", value: "25g" },
          { name: "Carbohydrates", value: "40g" },
          { name: "Fat", value: "15g" },
        ],
        calories: 450,
        achievement: "Muscle Gain",
        intolerance: "Fish",
      },
      {
        name: "Falafel Wrap",
        ingredients: [
          { portion: "150g", name: "Falafel" },
          { portion: "100g", name: "Wrap" },
          { portion: "50g", name: "Lettuce" },
          { portion: "30g", name: "Tomato" },
          { portion: "20g", name: "Hummus" },
        ],
        cousine: "Middle Eastern",
        carbonFootprint: 1.2,
        dietCategory: "Vegetarian",
        nutritionValues: [
          { name: "Protein", value: "20g" },
          { name: "Carbohydrates", value: "50g" },
          { name: "Fat", value: "15g" },
        ],
        calories: 400,
        achievement: "Improved Digestion",
        intolerance: "Gluten",
      },
      {
        name: "Margherita Pizza",
        ingredients: [
          { portion: "200g", name: "Pizza Dough" },
          { portion: "100g", name: "Tomato Sauce" },
          { portion: "100g", name: "Mozzarella Cheese" },
          { portion: "50g", name: "Basil" },
        ],
        cousine: "Italian",
        carbonFootprint: 1.8,
        dietCategory: "Vegetarian",
        nutritionValues: [
          { name: "Protein", value: "20g" },
          { name: "Carbohydrates", value: "70g" },
          { name: "Fat", value: "20g" },
        ],
        calories: 500,
        achievement: "Comfort Food",
        intolerance: "Dairy",
      },
      {
        name: "Pad Thai",
        ingredients: [
          { portion: "200g", name: "Rice Noodles" },
          { portion: "100g", name: "Shrimp" },
          { portion: "50g", name: "Peanuts" },
          { portion: "50g", name: "Bean Sprouts" },
          { portion: "30g", name: "Tofu" },
        ],
        cousine: "Thai",
        carbonFootprint: 2.2,
        dietCategory: "Pescatarian",
        nutritionValues: [
          { name: "Protein", value: "25g" },
          { name: "Carbohydrates", value: "70g" },
          { name: "Fat", value: "15g" },
        ],
        calories: 600,
        achievement: "Energy Boost",
        intolerance: "Peanuts",
      },
    ]);
    const mealsToShow = ref<any>([]);

    const toast = useToast();
    const makeSuggestionOfMealToAllProviders = async (suggestion: any) => {
      try {
        const res = await axios.post("/meals/suggestion-providers", {
          meal: JSON.stringify(suggestion),
        });

        if (res && res.data) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: res.data.message,
            life: 3000,
          });
          mealsToShow.value = mealsToShow.value.filter(
            (meal) => meal !== suggestion
          );
        }
      } catch (Error: any) {
        isLoading.value = false;

        console.log(Error, "ERROR ");
      }
    };

    const getSuggestedMealsAsProvider = async () => {
      try {
        const res = await axios.get("/meals/suggested-get-all");
        console.log(res, "RES");
        if (res && res.data) {
          allPropertiesFromMeal.value = res.data;
          mealsToShow.value = res.data.map((item) => JSON.parse(item.meal));
          checkForFullProperties(mealsToShow.value);

          isLoading.value = false;
        }
      } catch (Error: any) {
        isLoading.value = false;
        toast.add({
          severity: "error",
          summary: "Error",
          detail: Error,
          life: 5000,
        });
        console.log(Error, "ERROR ");
      }
    };

    const getAISuggestedMeals = async () => {
      try {
        isLoading.value = true;
        const res: any = await axios.post("meals/get-all-ai-meals", {
          userInput: "test",
        });
        if (res && res.data) {
          isLoading.value = false;
          mealsToShow.value = res.data.response;
        }
      } catch (Error: any) {
        isLoading.value = false;

        console.log(Error, "hi error");
      }
    };

    onMounted(() => {
      if (user.value.role === eRoles.Provider) getSuggestedMealsAsProvider();
      else getAISuggestedMeals();
    });

    const checkForFullProperties = (meals: any) => {
      const fieldsToCheck = [
        "achievement",
        "intolerance",
        "dietCategory",
        "cousine",
        "calories",
        "carbonFootprint",
        "name",
        "ingredients",
        "nutritionValues",
      ];

      let missingFields: any = [];

      meals.forEach((meal) => {
        let hasMissingField = false;

        fieldsToCheck.forEach((field) => {
          if (hasFieldWithoutValue(meal, field)) {
            /// do in need to push the missing field?
            hasMissingField = true;
            // missingFields.push(meal);
          }
        });
        if (hasMissingField) {
          meal.isDifferent = true;
          missingFields.push(meal);
        } else {
          meal.isDifferent = false;
          missingFields.push(meal);
        }
      });
      mealsToShow.value = meals;
    };
    const hasState = ref(false);

    const checkState = async () => {
      const state = window.history.state;
      if (state && state?.suggestion) {
        try {
          const res: any = await axios.get(
            `meals/suggested/${Number(state?.suggestion)}`
          );
          if (res && res.data && res.data.length !== 0) {
            const index = mealsToShow.value.findIndex((suggestedMeal: any) => {
              delete suggestedMeal.isDifferent;

              return _.isEqual(suggestedMeal, JSON.parse(res.data.meal));
            });
            if (index !== -1) {
              mealsToShow.value[index].highlight = true;
            }
            checkForFullProperties(mealsToShow.value);
          } else {
            toast.add({
              severity: "info",
              summary: "Info",
              detail:
                "This suggestion is already added, you can not view it here. Navigate to meals page",
              life: 5000,
            });
          }
        } catch (Error: any) {
          isLoading.value = false;

          console.log(Error, "in state location AI MEAL ");
        }
      } else {
        hasState.value = false;
      }
    };

    onMounted(() => {
      checkState();
    });

    const deleteSuggestion = async (suggestion: any) => {
      try {
        const whichSuggestion = allPropertiesFromMeal.value.find(
          (item: any) => {
            const first = JSON.parse(JSON.parse(JSON.stringify(item.meal)));
            const second = JSON.parse(JSON.stringify(suggestion));
            delete first?.highlight;
            delete second?.highlight;
            delete first?.isDifferent;
            delete second?.isDifferent;
            return _.isEqual(first, second);
          }
        );
        const res: any = await axios.delete(
          `meals/suggested/${whichSuggestion?.id}`
        );
        if (res && res.data) {
          toast.add({
            severity: "info",
            summary: "Info",
            detail: res.data.message,
            life: 5000,
          });
          getSuggestedMealsAsProvider();
        }
      } catch (Error: any) {
        isLoading.value = false;
        toast.add({
          severity: "info",
          summary: "Info",
          detail: Error,
          life: 5000,
        });
      }
    };

    return {
      mealsToShow,
      ability,
      openDrawer,
      drawerActions,
      additionMealData,
      storedSuggestion,
      isLoading,
      handleFileSelection,
      handleError,
      makeSuggestionOfMealToAllProviders,
      getAISuggestedMeals,
      deleteSuggestion,
    };
  },
});
</script>
<style scoped>
.image-wrapper {
  width: 60px;
  height: 40px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
