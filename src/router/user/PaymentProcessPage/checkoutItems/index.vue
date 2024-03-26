<template>
  <div class="paymentClass">
    <div v-if="!isLoading">
      <div v-if="checkoutItems && checkoutItems.length !== 0">
        <Card style="height: fit-content; width: 100%">
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

              <Divider
                v-if="checkoutItems && index !== checkoutItems.length - 1"
              />
            </div>
          </template>
          <template #footer>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
              "
            >
              <CheckoutPayment
                v-if="totalPrice && checkoutItems && checkoutItems.length !== 0"
                :totalPrice="totalPrice"
                :items="checkoutItems"
              />
            </div>
          </template>
        </Card>
      </div>
      <div v-else>
        <Message :closable="false" severity="warn"
          >No items checked out for order</Message
        >
      </div>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import CheckoutPayment from "../checkoutPayment/index.vue";
import ProgressSpinner from "primevue/progressspinner";
import { useStore } from "vuex";
import { RootState } from "@/store/vuexStore/types";
import Message from "primevue/message";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckoutItems",
  components: { Card, Divider, CheckoutPayment, ProgressSpinner, Message },
  setup() {
    const totalPrice = ref<number>(0);
    const checkoutItems = ref<any>([]);
    const isLoading = ref<boolean>(true);
    const store = useStore<RootState>();

    onMounted(() => {
      isLoading.value = true;
      const payment = computed(() => store.getters.getPaymentInfo);
      if (payment.value && payment.value.length !== 0) {
        let totalsPerItem = payment.value.map((item: any) => {
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
