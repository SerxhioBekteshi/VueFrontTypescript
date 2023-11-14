<template>
  <div>HERE IT WILL BE THE CONFITMATION MODAL FOR EITHER STRIPE OR PAYPA</div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Sidebar from "primevue/sidebar";
import { defineComponent, ref } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Paypal",
  components: {},
  setup() {
    const drawer = ref<boolean>(true);
    const saving = ref<boolean>(false);

    const upgradesubscription = () => {
      // 1. Let's save an upgrade request and subscription id
      // let subscription_id = "" // user subscription id
      // localStorage.setItem("@upgradesubscrption", true);
      // localStorage.setItem("@subscriptionid", JSON.stringify(subscription_id))
      // // 2. Send back to select a new package
      // router.push("/");
    };

    const activatesubscription = async () => {
      // this.saving = true;
      let subscription_id = ""; //  user subscription id
      // activateusersubscription(subscription_id);
      setTimeout(() => {
        // this.saving = false;
      }, 1000);
      // end
    };

    const suspendsubscription = async () => {
      // this.saving = true;
      let subscription_id = ""; //  user subscription id
      // await suspendusersubscription(subscription_id);
      setTimeout(() => {
        // this.saving = false;
      }, 1000);
      // end
    };

    const cancelsubscription = async () => {
      // this.saving = true;
      let subscription_id = ""; //  user subscription id
      // await cancelusersubscription(subscription_id);
      setTimeout(() => {
        // this.saving = false;
      }, 1000);
      // end
    };

    return {
      drawer,
      saving,
      upgradesubscription,
      activatesubscription,
      suspendsubscription,
      cancelsubscription,
    };
  },
  // upgrade subscrption
});
</script>
