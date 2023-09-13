<template>
  <div class="card">
    <div>
      <h2 class="mb-5">Profile password</h2>
      <form @submit="handlePrevention">
        <div class="grid">
          <div class="xs:col-12 sm:col-12 md:col-4 flex mb-3">
            <InputPassword
              name="currentPassword"
              :label="'Current password'"
              id="currentPassword"
              :placeholder="'Current Password'"
              v-bind="currentPassword"
              @iconAction="handleClickShowCurrentPassword"
              :icon="'pi pi-eye'"
              :iconPosition="'right'"
              :type="passwordValues.showCurrentPassword ? 'text' : 'password'"
            />
          </div>
          <div class="xs:col-12 sm:col-12 md:col-4 flex mb-3">
            <InputPassword
              name="newPassword"
              :label="'New password'"
              id="newPassword"
              :placeholder="'New Password'"
              v-bind="newPassword"
              @iconAction="handleClickShowNewPassword"
              :icon="'pi pi-eye'"
              :iconPosition="'right'"
              :type="passwordValues.showNewPassword ? 'text' : 'password'"
              :handleOnFocus="handleOnFocus"
              :handleOnBlur="handleOnBlur"
              :handleOnKeyUp="handleOnKeyUp"
            />
          </div>
          <!-- <div class="xs:col-12 sm:col-12 md:col-4 flex mb-3">
            <span class="p-input-icon-right w-full">
              <i
                class="pi pi-eye hoverOnIcon"
                @click="handleClickShowNewPassword"
              />
              <InputText
                class="w-full"
                v-model="newPassword"
                :type="passwordValues.showNewPassword ? 'text' : 'password'"
                :feedback="false"
                @keyup="handleOnKeyUp"
                @blur="handleOnBlur"
                @focus="handleOnFocus"
                ref="currentPasswordInput"
              />
            </span>
          </div> -->
          <div class="xs:col-12 sm:col-12 md:col-4 flex mb-3">
            <InputPassword
              name="confirmNewPassword"
              :label="'Confirm new password'"
              id="confirmNewPassword"
              placeholder="Confirm new password"
              v-bind="confirmNewPassword"
              @iconAction="handleClickShowConfirmNewPassword"
              :icon="'pi pi-eye'"
              :iconPosition="'right'"
              :type="
                passwordValues.showConfirmNewPassword ? 'text' : 'password'
              "
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
          <Button severity="info" label="Reset" />
        </div>
      </div>
    </div>
  </div>

  <!--   @click="
              resetForm({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
              })
            "-->
  <Toast />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import Button from "primevue/button";
import { IShowChangePasswordInput } from "@/interfaces/IShowChangePasswordInput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
// import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";
import { ICheckPassword } from "@/interfaces/ICheckPassword";
import InputPassword from "../components/formElements/InputPassword.vue";

export default defineComponent({
  name: "ProfilePassword",
  components: { Toast, Button, OverlayPanel, InputPassword },
  props: {},
  setup() {
    const passwordValues = ref<IShowChangePasswordInput>({
      showNewPassword: false,
      showCurrentPassword: false,
      showConfirmNewPassword: false,
    });

    const newPasswordChecks = ref<ICheckPassword>({
      capsLetterCheck: false,
      lowsLetterCheck: false,
      numberCheck: false,
      pwdLengthCheck: false,
      specialCharCheck: false,
    });

    const handleClickShowCurrentPassword = () => {
      passwordValues.value = {
        showConfirmNewPassword: passwordValues.value.showConfirmNewPassword,
        showCurrentPassword: !passwordValues.value.showCurrentPassword,
        showNewPassword: passwordValues.value.showNewPassword,
      };
    };

    const handleClickShowNewPassword = () => {
      passwordValues.value = {
        showConfirmNewPassword: passwordValues.value.showConfirmNewPassword,
        showCurrentPassword: passwordValues.value.showCurrentPassword,
        showNewPassword: !passwordValues.value.showNewPassword,
      };
    };

    const handleClickShowConfirmNewPassword = () => {
      passwordValues.value = {
        showConfirmNewPassword: !passwordValues.value.showConfirmNewPassword,
        showCurrentPassword: passwordValues.value.showCurrentPassword,
        showNewPassword: passwordValues.value.showNewPassword,
      };
    };

    const schemaToValidate = yup.object().shape({
      currentPassword: yup
        .string()
        .required("Current Password is required")
        .min(8, "Current Password must be at least 8 characters long"),
      newPassword: yup
        .string()
        .required("New Password is required")
        .min(8, "New Password must be at least 8 characters long")
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
      confirmNewPassword: yup
        .string()
        .required("Confirm New Password is required")
        .test("passwords-match", "Passwords must match", function (value) {
          return value === this.parent.newPassword;
        }),
    });

    const { handleSubmit, resetForm } = useForm({
      validationSchema: schemaToValidate,
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    });

    const { value: currentPassword } = useField("currentPassword");
    const { value: newPassword } = useField("newPassword");
    const { value: confirmNewPassword } = useField("confirmNewPassword");

    const op = ref();
    const handleOnBlur = (event: any) => {
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

    const handlePasswordChange = (values: any) => {
      console.log(values, "a");
    };

    return {
      passwordValues,
      currentPassword,
      newPassword,
      confirmNewPassword,
      newPasswordChecks,
      op,
      handleClickShowCurrentPassword,
      handleClickShowNewPassword,
      handleClickShowConfirmNewPassword,
      resetForm,
      handleSubmit,
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
