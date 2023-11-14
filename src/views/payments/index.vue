<template>
  <TabView>
    <TabPanel header="Paypal">
      <div class="flex flex-wrap justify-content-center gap-3">
        <Button severity="danger" label="Cancel" />
        <Button severity="warning" label="Suspend" />
        <Button severity="info" label="Activate" />
        <Button severity="secondary" label="Upgrade" />
      </div>
    </TabPanel>
    <TabPanel header="Stripe"> STRIPE STUFF </TabPanel>
  </TabView>

  <div v-if="paymentType === 'paypal'">
    awdawd
    <PaypalView />
  </div>
  <div v-else>
    <StripeView />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PaypalView from "./pay-pal/index.vue";
import StripeView from "./stripe/index.vue";
import { useRoute } from "vue-router";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Button from "primevue/button";

export default defineComponent({
  name: "PaymentView",
  components: { PaypalView, StripeView, TabView, TabPanel, Button },
  setup() {
    const route = useRoute();

    const paymentType = ref<string>("");

    // Extract the payment type from the route and update the paymentType ref
    onMounted(() => {
      const typeFromRoute = route.params.type;
      paymentType.value = Array.isArray(typeFromRoute)
        ? typeFromRoute[0]
        : typeFromRoute || "";
    });

    return {
      paymentType,
    };
  },
  // upgrade subscrption
});
</script>
