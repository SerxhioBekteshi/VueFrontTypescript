<template>
  <div class="flex flex-wrap justify-content-center gap-3">
    <Button severity="danger" label="Cancel" />
    <Button severity="warning" label="Suspend" />
    <Button severity="info" label="Activate" />
    <Button severity="secondary" label="Upgrade" />
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import { defineComponent, ref } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Paypal",
  components: { Button },
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
