<template>
  <Card style="width: 100%">
    <!-- <template #header>
      <img alt="user header" src="/images/usercard.png" />
    </template> -->
    <template #title> Send email</template>
    <template #subtitle>
      Fill the provider email in the above field so he can register into the
      platform
    </template>
    <template #content>
      <InputText v-model="email" type="text" size="large" placeholder="Email" />
    </template>
    <template #footer>
      <Button icon="pi pi-check" label="Send" @click="handleEmailSend" />
    </template>
  </Card>
  <Toast />
</template>

<script lang="ts">
import axios from "axios";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { defineComponent, ref } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ProviderEmails",
  components: { Card, Button, InputText, Toast },
  setup() {
    const email = ref<string>("");
    const toast = useToast();

    const handleEmailSend = async () => {
      try {
        const res: any = await axios.post(
          "/authentication/sendEmailTemplateToRegister",
          {
            email: email.value,
          }
        );

        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
        }
      } catch (err) {
        console.log(err, "ERR IN EMAIL REGISTRATION");
      }
    };
    return { email, handleEmailSend };
  },
});
</script>
<style></style>
