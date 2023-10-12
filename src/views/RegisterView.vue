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
                name="name"
                :label="'First Name'"
                :id="name"
                placeholder="First Name"
                v-bind="name"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputText
                name="lastName"
                :label="'Last Name'"
                :id="lastName"
                placeholder="Last Name"
                v-bind="lastName"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputText
                name="email"
                :label="'Email'"
                :id="email"
                placeholder="Email"
                v-bind="email"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputPassword
                :name="'password'"
                :label="'Password'"
                :id="'password'"
                :placeholder="'Password'"
                :iconPosition="'right'"
              />
            </div>
            <div class="col-12" style="padding: 0.75rem">
              <InputPassword
                :name="'passwordConfirm'"
                :label="'Confirm new password'"
                :id="'passwordConfirm'"
                :placeholder="'Confirm new password'"
                :iconPosition="'right'"
              />
            </div>

            <div
              class="col-12"
              style="padding: 0.75rem"
              v-if="currentRoutePath === '/registerProvider'"
            >
              <InputText
                name="nipt"
                :label="'Nipt'"
                :id="nipt"
                placeholder="Nipt"
                v-bind="nipt"
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
import axios from "axios";
import Card from "primevue/card";
import Button from "primevue/button";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import InputText from "../components/formElements/InputText.vue";
import { computed, defineComponent, ref } from "vue";
import { ICheckPassword } from "@/interfaces/ICheckPassword";
import { useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";
import router from "@/router";
import OverlayPanel from "primevue/overlaypanel";
import InputPassword from "../components/formElements/InputPassword.vue";

export default defineComponent({
  name: "RegisterView",
  components: { Toast, Button, InputText, OverlayPanel, Card, InputPassword },
  props: {},
  setup(props) {
    const toast = useToast();
    const route = useRoute();
    const currentRoutePath = computed(() => route.path);
    const isNiptRequired = ref(currentRoutePath.value === "/registerProvider");

    const passwordChecks = ref<ICheckPassword>({
      capsLetterCheck: false,
      lowsLetterCheck: false,
      numberCheck: false,
      pwdLengthCheck: false,
      specialCharCheck: false,
    });

    const schemaToValidate = yup.object().shape({
      email: yup.string().email().required("Email is required"),
      name: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      nipt: yup
        .string()
        .when(["currentRoutePath"], (currentRoutePath, schema) => {
          return isNiptRequired.value
            ? schema.required("NIPT is required")
            : schema;
        }),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /[a-z]/,
          "Password must contain at least one lowercase letter."
        )
        .matches(
          /[A-Z]/,
          "Password must contain at least one uppercase letter."
        )
        .matches(
          /[!@#$%^&*()_+{}|:<>?~]/,
          "Password must contain at least one special character."
        )
        .matches(/[0-9]/, "Password must contain at least one number"),
      passwordConfirm: yup
        .string()
        .required("Confirm New Password is required")
        .min(8, "Confirm New Password must be at least 8 characters long")
        .test(
          "passwords-match",
          "Confirm new password must match with new password",
          function (value) {
            return value === this.parent.password;
          }
        ),
    });

    const { handleSubmit, resetForm, setValues } = useForm({
      validationSchema: schemaToValidate,
      initialValues: {
        name: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        nipt: "",
      },
    });

    const { value: name } = useField<string>("name");
    const { value: lastName } = useField<string>("lastName");
    const { value: email } = useField<string>("email");
    const { value: nipt } = useField<string>("nipt");
    const { value: password } = useField<string>("password");
    const { value: passwordConfirm } = useField<string>("passwordConfirm");

    const handleRegister = async (values: any) => {
      try {
        const res = await axios.post(
          `http://localhost:1112/api/user/${
            currentRoutePath.value !== "/registerProvider"
              ? "register"
              : "registerProvider"
          }`,
          values
        );
        if (res != null && res.data) {
          toast.add({
            life: 10000,
            detail: `Contact: ${res.data.contact},
            Email: ${res.data.email}`,
            severity: "success",
            summary: res.data.message,
          });

          // if (currentRoutePath.value === "register")
          //   router.push({ name: "LoginView" });
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
      passwordChecks,
      handleSubmit,
      currentRoutePath,
      name,
      lastName,
      email,
      password,
      passwordConfirm,
      nipt,
      resetForm,
    };
  },
});
</script>
<style scoped>
.show:hover {
  cursor: pointer;
}
</style>
