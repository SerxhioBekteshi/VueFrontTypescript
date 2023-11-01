<template>
  <div>
    <form @submit="(e) => e.preventDefault()">
      <div>
        <InputNumber
          :label="'Quantity'"
          :name="'quantity'"
          :id="'quantity'"
          :placeholder="'Quantity'"
          v-model="quantity"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputNumber from "@/components/formElements/InputNumber.vue";

export default defineComponent({
  name: "OrderSystemMealForm",
  components: { InputNumber },
  props: {
    price: { type: Number, required: true },
  },
  setup(props) {
    const quantity = ref<number>(0);
    return { quantity };
  },
});
</script>
<style></style>
