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
        <div>
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
            <div v-if="resendEmailConfirmation.showEmailLink">
              <Button
                style="color: red"
                label="Resend email confirmation"
                @click="resendEmailConfirm"
                link
              />
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <Button
          :icon="!isLoading ? 'pi pi-check' : 'pi pi-spinner'"
          type="submit"
          label="Login"
          @click.prevent="handleLoginSubmit"
        />
        <!-- <Button
          icon="pi pi-check"
          type="submit"
          label="Login via google"
          @click.prevent="handleLoginSubmit"
        /> -->
        <Button
          icon="pi pi-user"
          label="Register"
          link
          @click.prevent="router.push({ name: 'RegisterView' })"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
    <Toast />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Button from "primevue/button";
import ValidationError from "@/components/ValidationError.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import AuthManager from "@/utils/authManager";
import { useRouter } from "vue-router";
import { useAbility } from "@casl/vue";
import { defineAbilityFor } from "@/initializers/ability";
import { useStore } from "vuex";
import { eRoles } from "@/assets/enums/eRoles";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

export default defineComponent({
  name: "LoginView",
  components: { InputText, Card, Button, ValidationError, Toast },
  setup() {
    const v$ = useVuelidate();
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const ability = useAbility();
    const store = useStore();
    const toast = useToast();
    const isLoading = ref<boolean>(false);

    const resendEmailConfirmation = ref<any>({
      showEmailLink: false,
      email: "",
    });

    const resendEmailConfirm = async () => {
      const res: any = await axios.post(
        `/authentication/resendEmailConfirmation`,
        {
          email: resendEmailConfirmation.value.email,
        }
      );
      if (res && res.data) {
        toast.add({
          life: 3000,
          detail: "An email has been sent to your account for verification",
          severity: "success",
          summary: "Account verification",
        });
      }
    };

    const definePermissionAbilities = async () => {
      const updatedAbility = await defineAbilityFor();
      ability.update(updatedAbility.rules);
    };

    const handleLoginSubmit = async () => {
      isLoading.value = true;
      // v$.validate();
      const loginUser = {
        email: email.value,
        password: password.value,
      };
      try {
        const userResponse: any = await AuthManager.login(loginUser);

        if (userResponse.user.role === eRoles.User) {
          if (!userResponse.user.accountSubmitted) {
            resendEmailConfirmation.value.showEmailLink = true;
            resendEmailConfirmation.value.email = userResponse.user.email;
            toast.add({
              life: 3000,
              summary: "Your email is not verified yet",
              severity: "error",
              detail: "Press the button below to resend email verification",
            });
          } else {
            AuthManager.handleAfterLoginAfterMath(userResponse, store, router);
            await definePermissionAbilities();
          }
        } else {
          AuthManager.handleAfterLoginAfterMath(userResponse, store, router);
          await definePermissionAbilities();
        }
        isLoading.value = false;
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    return {
      v$,
      email,
      password,
      resendEmailConfirmation,
      isLoading,
      resendEmailConfirm,
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
