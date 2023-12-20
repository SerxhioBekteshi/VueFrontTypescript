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
        <div class="flex justify-content-space-between">
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
  <div>
    <OverlayPanel ref="op" appendTo="body">
      <div>
        <p style="margin: 0.1rem">
          <span
            v-if="passwordChecks.capsLetterCheck"
            class="pi pi-check"
            :style="{
              color: 'green',
              marginRight: '0.5rem',
            }"
          >
          </span>
          <span
            v-else
            class="pi pi-times"
            :style="{
              color: 'red',
              marginRight: '0.5rem',
            }"
          ></span>
          At least 1 uppercase
        </p>

        <p style="margin: 0.1rem">
          <span
            v-if="passwordChecks.lowsLetterCheck"
            class="pi pi-check"
            :style="{
              color: 'green',
              marginRight: '0.5rem',
            }"
          >
          </span>
          <span
            v-else
            class="pi pi-times"
            :style="{
              color: 'red',
              marginRight: '0.5rem',
            }"
          ></span>
          At least 1 lowercase
        </p>

        <p style="margin: 0.1rem">
          <span
            v-if="passwordChecks.numberCheck"
            class="pi pi-check"
            :style="{
              color: 'green',
              marginRight: '0.5rem',
            }"
          >
          </span>
          <span
            v-else
            class="pi pi-times"
            :style="{
              color: 'red',
              marginRight: '0.5rem',
            }"
          ></span>
          At least 1 number
        </p>

        <p style="margin: 0.1rem">
          <span
            v-if="passwordChecks.pwdLengthCheck"
            class="pi pi-check"
            :style="{
              color: 'green',
              marginRight: '0.5rem',
            }"
          >
          </span>
          <span
            v-else
            class="pi pi-times"
            :style="{
              color: 'red',
              marginRight: '0.5rem',
            }"
          ></span>
          Minimum 8 characters
        </p>

        <p style="margin: 0.1rem">
          <span
            v-if="passwordChecks.specialCharCheck"
            class="pi pi-check"
            :style="{
              color: 'green',
              marginRight: '0.5rem',
            }"
          >
          </span>
          <span
            v-else
            class="pi pi-times"
            :style="{
              color: 'red',
              marginRight: '0.5rem',
            }"
          ></span>
          At least 1 special character
        </p>
      </div>
    </OverlayPanel>
  </div>

  <Toast />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { registrationSchema } from "@/utils/validationSchemas";
import Card from "primevue/card";
import Button from "primevue/button";
import Toast from "primevue/toast";
import OverlayPanel from "primevue/overlaypanel";
import { useToast } from "primevue/usetoast";

import InputText from "@/components/formElements/InputText.vue";
import InputPassword from "@/components/formElements/InputPassword.vue";
import InputSelect from "@/components/formElements/InputSelect.vue";

import { ICheckPassword } from "@/interfaces/other/ICheckPassword";
import ePaymentMethod from "@/assets/enums/ePaymentMethod";
import AuthManager from "@/utils/authManager";

export default defineComponent({
  name: "RegisterView",
  components: {
    Toast,
    Button,
    InputText,
    OverlayPanel,
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
    const route = useRoute();

    const passwordChecks = ref<ICheckPassword>({
      capsLetterCheck: false,
      lowsLetterCheck: false,
      numberCheck: false,
      pwdLengthCheck: false,
      specialCharCheck: false,
    });

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

    // const { value: name } = useField<string>("name");
    // const { value: lastName } = useField<string>("lastName");
    // const { value: email } = useField<string>("email");
    // const { value: password } = useField<string>("password");
    // const { value: passwordConfirm } = useField<string>("passwordConfirm");
    // const { value: paymentMethod } = useField<string>("paymentMethod");

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

    const handleOnKeyUp = (e: any) => {
      const { value } = e.target;
      const capsLetterCheck = /[A-Z]/.test(value);
      const lowsLetterCheck = /[a-z]/.test(value);
      const numberCheck = /[0-9]/.test(value);
      const pwdLengthCheck = value.length >= 8;
      const specialCharCheck = /[!@#$%^&*]/.test(value);

      passwordChecks.value = {
        capsLetterCheck,
        lowsLetterCheck,
        numberCheck,
        pwdLengthCheck,
        specialCharCheck,
      };
    };

    const handlePrevention = (event: any) => {
      event.preventDefault();
    };

    return {
      handleRegister,
      handlePrevention,
      handleOnKeyUp,
      resetForm,
      passwordChecks,
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
