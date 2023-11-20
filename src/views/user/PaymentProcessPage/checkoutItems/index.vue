<template>
  <div class="paymentClass">
    <Card
      v-if="checkoutItems.length !== 0"
      style="height: fit-content; width: 100%"
    >
      <template #title> Payment Checkout</template>
      <template #subtitle> Total to pay ${{ totalPrice }}</template>

      <template #content>
        <div
          v-for="(item, index) in checkoutItems"
          :key="item.mealId"
          style="display: flex; flex-direction: column"
        >
          <div style="display: flex; justify-content: space-between">
            Quantity
            <span style="font-weight: bold">{{ item.quantity }}</span>
          </div>
          <div style="display: flex; justify-content: space-between">
            Price Unit: <span> $ {{ item.priceUnit }} </span>
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
          <CheckoutPayment v-if="totalPrice" :totalPrice="totalPrice" />
        </div>
      </template>
    </Card>
  </div>
  <Toast />
</template>

<script lang="ts">
import { useReduxSelector } from "@/store/redux/helpers";
import Card from "primevue/card";
import Divider from "primevue/divider";
import Toast from "primevue/toast";
import { defineComponent, onMounted, ref } from "vue";
import CheckoutPayment from "../checkoutPayment/index.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckoutItems",
  components: { Toast, Card, Divider, CheckoutPayment },
  setup() {
    const totalPrice = ref<number>(0);
    const checkoutItems = ref<any>([]);

    onMounted(() => {
      const paymentStore = useReduxSelector((state: any) => state.payment);
      if (paymentStore.value.length !== 0) {
        let totalsPerItem = paymentStore.value.map((item: any) => {
          let total = item.quantity * item.priceUnit;
          return { ...item, total: total };
        });

        checkoutItems.value = totalsPerItem;

        totalPrice.value = totalsPerItem.reduce(
          (sum: any, item: any) => sum + item.total,
          0
        );
      }
    });

    return { checkoutItems, totalPrice };
  },
});
</script>
<style scoped>
.paymentClass {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
