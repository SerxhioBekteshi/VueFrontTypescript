<template>
  <div>
    <CheckoutItems />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckoutItems from "./checkoutItems/index.vue";

export default defineComponent({
  name: "PaymentProcessPage",
  components: { CheckoutItems },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
