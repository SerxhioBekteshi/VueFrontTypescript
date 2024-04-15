<template>
  <div class="card flex align-items-center justify-content-center">
    <Card style="width: 25em">
      <template #header>
        <img
          alt="user header"
          style="height: 100%; width: 100%; object-fit: contain'"
          src="https://thumbs.dreamstime.com/b/smooth-water-1939005.jpg"
        />
      </template>
      <template #title> Register </template>
      <template #subtitle>
        <div class="mb-3">Provide the credentials to register into our app</div>
      </template>
      <template #content>
        <form @submit="handlePrevention">
          <div class="grid">
            <div class="col-12" style="padding: 0.75rem">
              <InputText
                :name="'name'"
                :label="'Name'"
                :id="'name'"
                :placeholder="'Name'"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputText
                name="lastName"
                :label="'Last Name'"
                :id="'lastName'"
                placeholder="Last Name"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputText
                name="email"
                :label="'Email'"
                :id="'email'"
                placeholder="Email"
              />
            </div>

            <div class="col-12" style="padding: 0.75rem">
              <InputSelect
                :name="'paymentMethod'"
                :label="'PaymentMethod'"
                :id="'paymentMethod'"
                placeholder="paymentMethod"
                :options="[
                  {
                    label: ePaymentMethod.Stripe,
                    value: ePaymentMethod.Stripe,
                  },
                  {
                    label: ePaymentMethod.Paypal,
                    value: ePaymentMethod.Paypal,
                  },
                ]"
              />
            </div>

            <div class="col-12" style="padding: 0.75rem">
              <InputText
                :name="'address'"
                :label="'Address'"
                :id="'address'"
                :placeholder="'Address'"
              />
            </div>

            <div class="col-12" style="padding: 0.75rem">
              <InputPassword
                :name="'password'"
                :id="'password'"
                :placeholder="'Password'"
                :iconPosition="'right'"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputPassword
                :name="'passwordConfirm'"
                :id="'passwordConfirm'"
                :placeholder="'Confirm new password'"
                :iconPosition="'right'"
              />
            </div>
          </div>
        </form>
      </template>
      <template #footer>
        <div class="flex flex-wrap gap-2 justify-content-between">
          <Button
            @click="handleSubmit(handleRegister)()"
            type="submit"
            icon="pi pi-check"
            label="Register"
            size="small"
          />
          <Button
            @click.prevent="$router.push({ name: 'LoginView' })"
            link
            icon="pi pi-check"
            label="Go login"
            size="small"
          />
          <Button
            size="small"
            severity="info"
            label="Reset"
            @click="resetForm()"
          />
        </div>
      </template>
    </Card>
  </div>

  <Toast />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useForm } from "vee-validate";
import { registrationSchema } from "@/utils/validationSchemas";
import Card from "primevue/card";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import InputText from "@/components/formElements/InputText.vue";
import InputPassword from "@/components/formElements/InputPassword.vue";
import InputSelect from "@/components/formElements/InputSelect.vue";

import ePaymentMethod from "@/assets/enums/ePaymentMethod";
import AuthManager from "@/utils/authManager";

export default defineComponent({
  name: "RegisterView",
  components: {
    Toast,
    Button,
    InputText,
    Card,
    InputPassword,
    InputSelect,
  },
  props: {},
  enums: {
    ePaymentMethod,
  },
  setup() {
    const toast = useToast();

    const { handleSubmit, resetForm } = useForm({
      validationSchema: registrationSchema,
      initialValues: {
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        paymentMethod: "",
        address: "",
      },
    });

    const handleRegister = async (values: any) => {
      try {
        const res = await AuthManager.register(values);

        if (res && res.data !== null) {
          toast.add({
            life: 10000,
            detail: `An email has been sent your email for verification`,
            severity: "success",
            summary: "Email verification ",
          });
        }
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    const handlePrevention = (event: any) => {
      event.preventDefault();
    };

    return {
      handleRegister,
      handlePrevention,
      resetForm,
      handleSubmit,
      registrationSchema,
      ePaymentMethod,
    };
  },
});
</script>
<style scoped>
.show:hover {
  cursor: pointer;
}
</style>
