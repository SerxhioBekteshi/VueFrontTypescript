<template>
  <TabView>
    <TabPanel header="Paypal">
      <PaypalView />
    </TabPanel>
    <TabPanel header="Stripe"> <StripeView /> </TabPanel>
  </TabView>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PaypalView from "./pay-pal/index.vue";
import StripeView from "./stripe/index.vue";
import { useRoute } from "vue-router";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

export default defineComponent({
  name: "PaymentView",
  components: { PaypalView, StripeView, TabView, TabPanel },
  setup() {
    const route = useRoute();

    const paymentType = ref<string>("");

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
