<template>
  <div class="card">
    <div>
      <h2 class="mb-5">Profile password</h2>
      <form @submit="handlePrevention">
        <div class="grid">
          <div class="col-12">
            <InputPassword
              :name="'oldPassword'"
              :label="'Current password'"
              :id="'oldPassword'"
              :placeholder="'Current Password'"
            />
          </div>
          <div class="col-12">
            <InputPassword
              :name="'password'"
              :label="'New password'"
              :id="'password'"
              :placeholder="'New Password'"
            />
          </div>
          <div class="col-12">
            <InputPassword
              :name="'passwordConfirm'"
              :label="'Confirm new password'"
              :id="'passwordConfirm'"
              :placeholder="'Confirm new password'"
              :iconPosition="'right'"
            />
          </div>
        </div>
      </form>
    </div>

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
    <div class="grid">
      <div class="col-12 flex justify-content-start gap-3">
        <div>
          <Button
            severity="primary"
            label="Edit"
            type="submit"
            @click="handleSubmit(handlePasswordChange)()"
          />
        </div>
        <div>
          <Button
            severity="info"
            label="Reset"
            @click="
              resetForm({
                oldPassword: '',
                password: '',
                passwordConfirm: '',
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import Button from "primevue/button";
// import { IShowChangePasswordInput } from "@/interfaces/other/IShowChangePasswordInput";
import { useField, useForm } from "vee-validate";
import OverlayPanel from "primevue/overlaypanel";
import { ICheckPassword } from "@/interfaces/other/ICheckPassword";
import InputPassword from "@/components/formElements/InputPassword.vue";
import axios from "axios";
import { provide } from "vue";
import { passwordValidationSchema } from "@/utils/validationSchemas";

export default defineComponent({
  name: "ProfilePassword",
  components: { Toast, Button, OverlayPanel, InputPassword },
  props: {},
  setup() {
    const toast = useToast();

    const newPasswordChecks = ref<ICheckPassword>({
      capsLetterCheck: false,
      lowsLetterCheck: false,
      numberCheck: false,
      pwdLengthCheck: false,
      specialCharCheck: false,
    });

    const { handleSubmit, resetForm, isSubmitting } = useForm({
      validationSchema: passwordValidationSchema,
      initialValues: {
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      },
    });
    provide("veeValidateForm", { isSubmitting });

    const { value: oldPassword } = useField<string>("oldPassword");
    const { value: password } = useField<string>("password");
    const { value: passwordConfirm } = useField<string>("passwordConfirm");

    const op = ref();
    const handleOnBlur = () => {
      if (op.value) op.value.hide();

      // const nextInput: any = document.querySelector(".cnp");
      // if (nextInput) {
      //   nextInput.focus();
      // }
    };
    const handleOnFocus = (event: any) => {
      op.value.show(event);
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

    const handlePrevention = (event: any) => {
      event.preventDefault();
    };

    const handlePasswordChange = async (values: any) => {
      try {
        const res: any = await axios.put("/user/updatePassword", values);

        if (res != null && res.data) {
          toast.add({
            life: 3000,
            detail: "Password updated successfully",
            severity: "success",
            summary: "info",
          });
        }
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    return {
      oldPassword,
      password,
      passwordConfirm,
      newPasswordChecks,
      op,
      handleSubmit,
      resetForm,
      handlePasswordChange,
      handleOnKeyUp,
      handleOnBlur,
      handleOnFocus,
      handlePrevention,
    };
  },
});
</script>
<style>
.hoverOnIcon:hover {
  cursor: pointer;
}
</style>
