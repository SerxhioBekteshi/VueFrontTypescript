<template>
  <div class="card flex align-items-center justify-content-center">
    <Card style="width: 25em">
      <template #header>
        <img
          alt="user header"
          src="https://primefaces.org/cdn/primevue/images/usercard.png"
        />
      </template>
      <template #title> Login</template>
      <template #subtitle> Provide the credentials in order to login </template>
      <template #content>
        <form>
          <div class="flex flex-wrap mb-1 gap-1">
            <label for="email" class="p-sr-only">email</label>
            <InputText
              class="fullWidth"
              id="email"
              :style="{
                width: '100%',
                borderColor: v$.email.$error ? 'red' : '',
              }"
              placeholder="Email"
              v-model="email"
            />
            <ValidationError
              v-if="v$.email.$error"
              style="width: 100%; background: none"
              severity="error"
              >{{ v$.email.$errors[0].$message }}
            </ValidationError>
          </div>
          <div class="flex flex-wrap mb-1 gap-1">
            <label for="password" class="p-sr-only">Password</label>
            <InputText
              class="fullWidth"
              type="password"
              :style="{
                width: '100%',
                borderColor: v$.password.$error ? 'red' : '',
              }"
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <ValidationError
              v-if="v$.password.$error"
              style="width: 100%; background: none"
              severity="error"
              >{{ v$.password.$errors[0].$message }}
            </ValidationError>
          </div>
        </form>
      </template>
      <template #footer>
        <Button
          icon="pi pi-check"
          type="submit"
          label="Login"
          @click.prevent="handleLoginSubmit"
        />
        <Button
          icon="pi pi-user"
          label="Register"
          link
          @click.prevent="router.push({ name: 'RegisterView' })"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Button from "primevue/button";
import ValidationError from "../components/ValidationError.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import AuthManager from "../utils/authManager";
import { useRouter } from "vue-router";
import { useDispatch } from "@/store/redux/helpers";
import store from "@/store/redux/configurations";

export default defineComponent({
  name: "LoginView",
  components: { InputText, Card, Button, ValidationError },
  setup() {
    const v$ = useVuelidate();
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    // const dispatch = useDispatch();
    // console.log(dispatch, "DISPATCH");
    // const dd = store.dispatch;
    // console.log(dd);
    const handleLoginSubmit = async () => {
      // v$.validate();
      const loginUser = {
        email: email.value,
        password: password.value,
      };
      try {
        await AuthManager.login(loginUser, router);
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    return {
      v$,
      email,
      password,
      handleLoginSubmit,
      router,
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("Field is required", required),
        email,
      },
      password: {
        required: helpers.withMessage("Field is required", required),
      },
    };
  },
});
</script>

<style></style>
