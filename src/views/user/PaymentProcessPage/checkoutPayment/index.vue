<template>
  <div v-if="!paid" id="paypal-button-container"></div>
  <div v-else id="confirmation">Order complete!</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { loadScript } from "@paypal/paypal-js";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckoutPayment",
  components: {},
  props: {
    totalPrice: { type: Number },
  },
  setup(props) {
    const paid = ref<boolean>(false);
    // const CLIENT_ID: any = process.env.VUE_APP_PAYPAL_CLIENT_ID

    const loadScriptFunction = () => {
      loadScript({
        clientId:
          "AaNHPbVpjDzdVSwAkCeQ4-nZgFt98dodMZbUzWhWrCxEZ5N6gU8rDOObSRbcjb9oIYfsV02LPsll4OGx",
      }).then((paypal: any) => {
        paypal
          .Buttons({
            createOrder: createOrder,
            onApprove: onApprove,
          })
          .render("#paypal-button-container");
      });
    };

    onBeforeMount(function () {
      loadScriptFunction();
    });

    const createOrder = (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: `${props.totalPrice}`,
              currency_code: "USD",
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: `${props.totalPrice}`,
                },
              },
            },
          },
        ],
      });
    };

    const onApprove = (data: any, actions: any) => {
      return actions.order
        .capture()
        .then((details: any) => {
          console.log(details, "DETAILS??");
          paid.value = true;
          console.log("Order complete!");
        })
        .catch((error: any) => {
          console.error("Error during capture:", error);
        });
    };

    return { paid };
  },
});
</script>
<style scoped>
#paypal-button-container {
  width: 100%;
  margin: 30px 0;
}

#confirmation {
  color: green;
  margin-top: 1em;
  font-size: 2em;
}
</style>
