<template>
  <div>
    <div v-if="checkoutLink === ''" id="paypal-button-container"></div>
    <div v-else>
      <a
        :href="checkoutLink"
        target="_blank"
        rel="noopener noreferrer"
        class="p-button font-bold"
      >
        Checkout order (see it does not work)
      </a>
    </div>
    <Toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { loadScript } from "@paypal/paypal-js";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CheckoutPayment",
  components: { Toast },
  props: {
    totalPrice: { type: Number },
    items: { type: Array as () => any[] },
  },
  setup(props) {
    const toast = useToast();
    const router = useRouter();
    const checkoutLink = ref<string>("");

    const loadScriptFunction = () => {
      loadScript({
        clientId:
          "AbHVdW0U-btSlkwDZC-Iewri7K64mNsK8NQgbSDxXlASer798EGfaqp0LNdyIII1KDxdi-xg02g525eT",
      }).then((paypal: any) => {
        paypal
          .Buttons({
            createOrder: createOrder,
            onApprove: onApprove,
            onError: handleError,
          })
          .render("#paypal-button-container")
          .catch((error: any) => {
            console.error("failed to render the PayPal Buttons", error);
          })
          .catch((error: any) => {
            console.error("failed to load the PayPal JS SDK script", error);
          });
      });
    };

    onBeforeMount(function () {
      loadScriptFunction();
    });

    const handleError = (err: any) => {
      toast.add({
        life: 3000,
        detail: err,
        severity: "error",
        summary: "HANDLE ERROR METHOD ERROR",
      });
    };

    const createOrder = async (data: any, actions: any) => {
      try {
        const response = await axios.post("payment/create-order", {
          items: props.items,
        });

        console.log(response, "RESPONSE");
        if (response) {
          return response.data.id;
        }
      } catch (error: any) {
        toast.add({
          life: 3000,
          detail: error || error.err || error.message,
          severity: "error",
          summary: "On Create",
        });
        //here it mighit navigate some customized error page
      }
    };

    const onApprove = async (data: any, actions: any) => {
      try {
        const details = await actions.order.capture();
        if (details) {
          toast.add({
            life: 3000,
            detail: `Order submitted successfully to your PayPal account: ${details.id}`,
            severity: "success",
            summary: details.status,
          });

          //here i can store the details to a table
          await storeDetailsToDb(details);
          checkoutLink.value = details.links[0].href;
        }
      } catch (error: any) {
        toast.add({
          life: 3000,
          detail: error || error.err || error.message,
          severity: "error",
          summary: "On Approve Order",
        });
      }
    };

    const storeDetailsToDb = async (details: any) => {
      try {
        const res: any = await axios.post("/order", details);
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: `Order fully completed`,
            severity: "success",
            summary: "",
          });
        }
      } catch (err) {
        console.log("what");
      }
    };

    return { checkoutLink };
  },
});
</script>
<style scoped>
#paypal-button-container {
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
