<template>
  <div class="paymentClass">
    <Card style="height: 20vh; width: 25em">
      <!-- <template #header> </template> -->
      <template #title> {{ packageSelect.title }}</template>
      <template #subtitle> Card subtitle </template>
      <template #content>
        <span>Total Amount (USD) </span>
        <span>${{ packageSelect.amount }}</span>
      </template>
      <template #footer>
        <div id="paypal-button-container"></div>
        <Button icon="pi pi-check" label="Save" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          severity="secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
  <Toast />
</template>

<script lang="ts">
import { useReduxSelector } from "@/store/redux/helpers";
import Card from "primevue/card";
import Toast from "primevue/toast";
import { defineComponent, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PaymentProcessPage",
  components: { Toast, Card },
  setup() {
    const packageSelect = ref<any>({});
    const paymentStore = useReduxSelector((state) => state.payment);
    console.log(paymentStore.value);
    const item = ref<any>({});
    const toast = useToast();

    const mountpaypalbutton = () => {
      // eslint-disable-next-line no-undef
      //   paypal
      //     .Buttons({
      //       style: {
      //         shape: "rect",
      //         color: "blue",
      //         layout: "vertical",
      //         label: "paypal",
      //         size: "medium",
      //       },
      //       createSubscription: async function (data: any, actions: any) {
      //         // 1. get the selected package
      //         const package_response: any = await localStorage.getItem(
      //           "@selectedpackage"
      //         );
      //         const package_results = JSON.parse(package_response);
      //         let plan_ID = package_results.plan_id; // user plan id
      //         // 2. Create a subscription
      //         return actions.subscription.create({
      //           plan_id: plan_ID,
      //         });
      //       },
      //       // eslint-disable-next-line no-unused-vars
      //       onApprove: async function (data: any, actions: any) {
      //         /**
      //          * NOTE
      //          * - Save the subscription id in your Database
      //          * - This is important to ensure you can always
      //          * - Check on the status when user logs in or wants
      //          * - to make payment
      //          */
      //         // 2. Save payment subscription id
      //         //let subscrption_id = data.subscriptionID;
      //         // 4. Remove the selected package from the local storage
      //         localStorage.removeItem("@selectedpackage");
      //         // toast.add({
      //         //   life: 3000,
      //         //   detail: "Your payment has successfully been proccessed!",
      //         //   severity: "success",
      //         //   summary: "Congratulations",
      //         // });
      //         // redirect user to dashboard or login
      //         // 5. Lets use swal to give us an alert once transcation is completed
      //         // Swal.fire({
      //         //   icon: "success",
      //         //   title: "Congratulations",
      //         //   text: "Your payment has successfully been proccessed!",
      //         //   confirmButtonText: "Complete",
      //         //   showLoaderOnConfirm: true,
      //         //   preConfirm: () => {
      //         //     // redirect user to dashboard or login
      //         //     location.assign("http://localhost:8080/profile");
      //         //   },
      //         //   allowOutsideClick: false,
      //         // });
      //       },
      //     })
      //     .render("#paypal-button-container");
    };

    onMounted(async () => {
      const package_response: any = localStorage.getItem("@selectedpackage");
      const package_results = JSON.parse(package_response);
      if (package_results) {
        packageSelect.value = package_results;
        await mountpaypalbutton();
      }
    });
    return { packageSelect };
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
