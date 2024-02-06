<template>
  <div class="paymentClass">
    <div v-if="!isLoading">
      <Card
        v-if="checkoutItems.length !== 0"
        style="height: fit-content; width: 100%"
      >
        <template #title> Payment Checkout</template>
        <template #subtitle> Total to pay ${{ totalPrice }}</template>

        <template #content>
          <div
            v-for="(item, index) in checkoutItems"
            :key="item.id"
            style="display: flex; flex-direction: column"
          >
            <div style="display: flex; justify-content: space-between">
              Quantity
              <span style="font-weight: bold">{{ item.quantity }}</span>
            </div>
            <div style="display: flex; justify-content: space-between">
              Price Unit: <span> $ {{ item.price }} </span>
            </div>
            <div style="display: flex; justify-content: space-between">
              Total Amount<span style="font-weight: bold"
                >$ {{ item.total }}
              </span>
            </div>

            <Divider v-if="index !== checkoutItems.length - 1" />
          </div>
        </template>
        <template #footer>
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <CheckoutPayment
              v-if="totalPrice"
              :totalPrice="totalPrice"
              :items="checkoutItems"
            />
          </div>
        </template>
      </Card>
    </div>
    <div
      v-else
      class="card flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <ProgressSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import Card from "primevue/card";
import Divider from "primevue/divider";
import { defineComponent, onMounted, ref } from "vue";
import CheckoutPayment from "../checkoutPayment/index.vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckoutItems",
  components: { Card, Divider, CheckoutPayment, ProgressSpinner },
  setup() {
    const totalPrice = ref<number>(0);
    const checkoutItems = ref<any>([]);
    const isLoading = ref<boolean>(true);

    onMounted(() => {
      const paymentStore: any = {};
      if (paymentStore.value.length !== 0) {
        let totalsPerItem = paymentStore.value.map((item: any) => {
          let total = item.quantity * item.price;
          return { ...item, total: total };
        });

        checkoutItems.value = totalsPerItem;

        totalPrice.value = totalsPerItem.reduce(
          (sum: any, item: any) => sum + item.total,
          0
        );
      }
      isLoading.value = false;
    });

    return { checkoutItems, totalPrice, isLoading };
  },
});
</script>
<style scoped>
.paymentClass {
  width: 100%;
}
</style>
