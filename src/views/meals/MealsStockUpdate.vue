<template>
  <form @submit="(e) => e.preventDefault()">
    <div>
      <InputNumber
        :label="'Stock'"
        :name="'stock'"
        :id="'stock'"
        :placeholder="'Stock'"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
// import FloatLabel from "primevue/floatlabel";
import InputNumber from "@/components/formElements/InputNumber.vue";

interface IMealStock {
  id: number;
  stock: number;
}
export default defineComponent({
  name: "MealsStockUpdate",
  components: { InputNumber },
  props: {
    mealStock: { type: Object as PropType<IMealStock>, required: true },
  },
  setup() {
    return {};
  },
});
</script>
<style></style>
