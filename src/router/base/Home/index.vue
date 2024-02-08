<template>
  <!-- <div>
    <TableData
      :controller="'meals'"
      :actionButton="actionButton"
      @edit-clicked="onEditClick"
      ref="tableDataRef"
    />

    <div v-if="modeDrawer || formData">
      <DetailDrawer
        :onClose="invalidateState"
        :modeDrawer="modeDrawer"
        :formData="formData"
        :controller="'meals'"
        :validationSchema="validationSchema"
        :fetchDataAfterSubmit="fetchDataAfterSubmit"
      >
        <MealForm />
      </DetailDrawer>
    </div>
  </div> -->
  <div class="card">
    <Timeline :value="events">
      <template #opposite="slotProps">
        <small class="p-text-secondary">{{ slotProps.item.date }}</small>
      </template>
      <template #content="slotProps">
        {{ slotProps.item.status }}
      </template>
    </Timeline>
  </div>
</template>

<script lang="ts">
// import Button from "primevue/button"
import Button from "primevue/button";
import TableData from "@/components/table/TableData.vue";
import { computed, defineComponent, ref, shallowRef } from "vue";
import { PrimeIcons } from "primevue/api";
import { eFormMode } from "@/assets/enums/EFormMode";
import DetailDrawer from "@/components/DetailDrawer.vue";
import MealForm from "@/components/formController/MealForm.vue";
import * as yup from "yup";
import Timeline from "primevue/timeline";
import Card from "primevue/card";
import { useStore } from "vuex";
import { RootState } from "@/store/vuexStore/types";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { Timeline },
  setup() {
    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const tableDataRef = ref<any>(null);
    const store = useStore<RootState>();
    const userInfo = computed(() => store.getters.getUserInfo);

    const fetchDataAfterSubmit = () => {
      if (tableDataRef.value) {
        tableDataRef.value.fetchData();
      }
    };

    const handleAddData = () => {
      console.log("clicked");
      modeDrawer.value = eFormMode.Add;
    };

    const actionButton = shallowRef<any>({
      component: Button,
      props: {
        icon: PrimeIcons.PLUS,
        label: "Insert",
        severity: "primary",
        onClick: handleAddData,
      },
    });

    const validationSchema = yup.object().shape({
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
      achievement: yup
        .string()
        .required("Health goal is required")
        .label("Health goal"),
    });

    const onEditClick = (data: any, rowId: number) => {
      modeDrawer.value = eFormMode.Edit;
      formData.value = data;
    };

    const invalidateState = () => {
      modeDrawer.value = null;
      formData.value = null;
    };

    const events = ref([
      {
        status: "Ordered",
        date: "15/10/2020 10:30",
        icon: "pi pi-shopping-cart",
        color: "#9C27B0",
      },
      {
        status: "Processing",
        date: "15/10/2020 14:00",
        icon: "pi pi-cog",
        color: "#673AB7",
      },
      {
        status: "Shipped",
        date: "15/10/2020 16:15",
        icon: "pi pi-shopping-cart",
        color: "#FF9800",
      },
      {
        status: "Delivered",
        date: "16/10/2020 10:00",
        icon: "pi pi-check",
        color: "#607D8B",
      },
    ]);

    return {
      actionButton,
      modeDrawer,
      formData,
      validationSchema,
      tableDataRef,
      events,
      fetchDataAfterSubmit,
      handleAddData,
      onEditClick,
      invalidateState,
    };
  },
});
</script>
<style></style>
