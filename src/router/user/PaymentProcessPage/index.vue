<template>
  <div>
    <CheckoutItems />
    <!-- <CheckoutPayment /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckoutItems from "./checkoutItems/index.vue";
import CheckoutPayment from "./checkoutPayment/index.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PaymentProcessPage",
  components: { CheckoutItems },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
