<template>
  <div class="paymentClass">
    <Card v-if="paymentStore.length !== 0" style="height: 20vh; width: 100%">
      <template #title> Payment Checkout</template>

      <template #content>
        <div
          v-for="item in paymentStore.value"
          :key="item.mealId"
          style="display: flex; flex-direction: column"
        >
          <div style="display: flex; justify-content: space-between">
            Total Amount<span style="font-weight: bold"
              >${{ item.totalPrice }}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between">
            Quantity
            <span style="font-weight: bold">{{ item.quantity }}</span>
          </div>
          <div style="display: flex; justify-content: space-between">
            Price Unit: <span>{{ item.priceUnit }} </span>
          </div>
        </div>
      </template>
      <!-- <template #footer>
        <div id="paypal-button-container"></div>
      </template> -->
    </Card>
  </div>
  <Toast />
</template>

<script lang="ts">
import { useReduxSelector } from "@/store/redux/helpers";
import Card from "primevue/card";
import Toast from "primevue/toast";
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckoutItems",
  components: { Toast, Card },
  setup() {
    const paymentStore = useReduxSelector((state: any) => state.payment);
    console.log(paymentStore.value);
    const totalPrice = ref<number>(0);

    onMounted(() => {
      if (paymentStore.value.length !== 0) {
        let totalsPerItem = paymentStore.value.map((item: any) => {
          let total = item.quantity * item.priceUnit;
          return total;
        });

        let totalSum = totalsPerItem.reduce(
          (sum: any, total: any) => sum + total,
          0
        );
        console.log("Total sum:", totalSum);
      }
    });

    return { paymentStore, totalPrice };
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
