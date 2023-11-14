<template>
  <div class="profile">
    <Header />
    <div class="container">
      <v-navigation-drawer app v-model="drawer">
        <v-card-text class="text-center">
          <v-avatar color="indigo" size="100" class="mb-3"> </v-avatar>
          <Button class="mb-2" severity="error" />
          <Button class="mb-2" severity="warning" />
          <Button class="mb-2" severity="info" />
          <Button
            severity="secondary"
            @click="upgradesubscription"
            class="pl-5 pr-5"
          >
            <span style="text-transform: capitalize">Upgrade</span>
          </Button>
        </v-card-text>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Stripe",
  components: {},
  setup() {
    const drawer = ref<boolean>(true);
    const saving = ref<boolean>(false);
    const router = useRouter();

    const upgradesubscription = () => {
      // 1. Let's save an upgrade request and subscription id
      // let subscription_id = "" // user subscription id
      // localStorage.setItem("@upgradesubscrption", true);
      // localStorage.setItem("@subscriptionid", JSON.stringify(subscription_id))
      // // 2. Send back to select a new package
      // router.push("/");
    };

    return {
      drawer,
      saving,
      upgradesubscription,
    };
  },
  // upgrade subscrption
});
</script>
