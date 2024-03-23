<template>
  <div
    class="flex align-items-center justify-content-center px-3"
    style="height: 50vh"
  >
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="grid h-100 justify-content-center align-items-center">
        <div class="col" v-if="!passwordUpdated">
          <form @submit="(e: any) => e.preventDefault()">
            <div class="grid">
              <div class="col-12">
                <InputPassword
                  :name="'password'"
                  :label="'New password'"
                  :id="'password'"
                  :placeholder="'New Password'"
                  :iconPosition="'right'"
                  :handleOnBlur="handleOnBlur"
                  :handleOnKeyUp="handleOnKeyUp"
                />
              </div>
              <div class="col-12 mb-3">
                <InputPassword
                  :name="'passwordConfirm'"
                  :label="'Confirm new password'"
                  :id="'passwordConfirm'"
                  :placeholder="'Confirm new password'"
                  :iconPosition="'right'"
                />
              </div>
            </div>
            <div class="grid">
              <div class="col-12 flex justify-content-start gap-3">
                <div>
                  <Button
                    style="background-color: #10b981; border: 1px solid #10b981"
                    label="Change password"
                    type="submit"
                    @click="handleSubmit(onSubmit)()"
                  />
                </div>
                <div>
                  <Button
                    severity="info"
                    label="Reset"
                    @click="
                      resetForm({
                        password: '',
                        passwordConfirm: '',
                      })
                    "
                  />
                </div>
              </div>
            </div>
          </form>
          <div>
            <OverlayPanel ref="op" appendTo="body">
              <div>
                <p style="margin: 0.1rem">
                  <span
                    v-if="newPasswordChecks.capsLetterCheck"
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
                    v-if="newPasswordChecks.lowsLetterCheck"
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
                    v-if="newPasswordChecks.numberCheck"
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
                    v-if="newPasswordChecks.pwdLengthCheck"
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
                    v-if="newPasswordChecks.specialCharCheck"
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
        </div>
        <div v-else class="col">
          <h1 class="text-primary text-bold m-2 fw-bold py-3 text-center">
            Password updated successfully
          </h1>
          <h3 class="text-muted fw-bold text-center">
            Redirecting to login...
          </h3>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useAbility } from "@casl/vue";
import { RootState } from "@/store/vuexStore/types";
import eHttpResponse from "@/assets/enums/eHttpResponse";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useForm } from "vee-validate";
import { resetPasswordValidationSchema } from "@/utils/validationSchemas";
import InputPassword from "@/components/formElements/InputPassword.vue";
import { ICheckPassword } from "@/interfaces/other/ICheckPassword";
import OverlayPanel from "primevue/overlaypanel";

export default defineComponent({
  name: "ResetPasswordView",
  components: { Button, Toast, InputPassword, OverlayPanel },
  props: {},
  enums: {
    eHttpResponse,
  },
  setup() {
    const store = useStore<RootState>();
    const user = computed(() => store.getters.getUserInfo);

    const newPasswordChecks = ref<ICheckPassword>({
      capsLetterCheck: false,
      lowsLetterCheck: false,
      numberCheck: false,
      pwdLengthCheck: false,
      specialCharCheck: false,
    });

    const route = useRoute();
    const token = route.query.token;
    const router = useRouter();
    const toast = useToast();
    const { handleSubmit, resetForm } = useForm({
      initialValues: null,
      validationSchema: resetPasswordValidationSchema,
    });

    const passwordUpdated = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const op = ref();

    const handleOnFocus = (event: any) => {
      op.value.show(event);
    };

    const handleOnBlur = () => {
      if (op.value) op.value.hide();

      // const nextInput: any = document.querySelector(".cnp");
      // if (nextInput) {
      //   nextInput.focus();
      // }
    };

    const handleOnKeyUp = (e: any) => {
      const { value } = e.target;
      const capsLetterCheck = /[A-Z]/.test(value);
      const lowsLetterCheck = /[a-z]/.test(value);
      const numberCheck = /[0-9]/.test(value);
      const pwdLengthCheck = value.length >= 8;
      const specialCharCheck = /[!@#$%^&*]/.test(value);

      newPasswordChecks.value = {
        capsLetterCheck,
        lowsLetterCheck,
        numberCheck,
        pwdLengthCheck,
        specialCharCheck,
      };
    };

    // const token = new URLSearchParams(location.search).get('token');

    const onSubmit = async (formData: any) => {
      isLoading.value = true;
      if (!formData) return;
      try {
        const res = await axios.post(
          `user/resetpassword?token=${token}`,
          formData
        );
        if (res && res.status === eHttpResponse.Ok) {
          passwordUpdated.value = true;
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (err: any) {
        toast.add({
          life: 3000,
          detail: err.message,
          severity: "error",
          summary: "info",
        });
      }

      isLoading.value = false;
    };

    return {
      eHttpResponse,
      token,
      passwordUpdated,
      newPasswordChecks,
      handleOnFocus,
      handleOnKeyUp,
      handleOnBlur,
      resetForm,
      handleSubmit,
      onSubmit,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
