<template>
  <!-- <div style="display: flex; flex-direction: column">
    <IconField iconPosition="left">
      <InputIcon
        :class="`pi pi ${
          inputType === 'password' ? 'pi-eye' : 'pi-eye-slash'
        } hoverOnIcon`"
        @click="toggleShowPassword"
      >
      </InputIcon>
       <FloatLabel> 
      <InputText
        :value="value"
        :type="inputType"
        :style="{ borderColor: errorMessage ? 'red' : '', width: '100%' }"
        :placeholder="placeholder"
        :inputId="name"
        :id="id"
        :class="{
          dirty: meta.dirty,
          // valid: !errorMessage,
          // invalid: errorMessage,
        }"
        @change="handleChange"
        @keyup="handleOnKeyUp"
        @blur="handleOnBlur"
        @focus="handleOnFocus"
      />
      <label
        style="padding-left: 0.5rem; margin-bottom: 0.5rem"
        :for="name"
        :style="{ color: errorMessage ? 'red' : '' }"
      >
        {{ label }}
      </label>
       </FloatLabel> 
    </IconField>
    <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
  </div> -->

  <Password
    v-model="value"
    toggleMask
    :invalid="errorMessage ? true : false"
    :placeholder="placeholder"
    :inputId="name"
    :id="id"
    @keyup="handleOnKeyUp"
  >
    <template #footer>
      <Divider />
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
    </template>
  </Password>
  <ValidationError v-if="errorMessage">{{ errorMessage }}</ValidationError>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import ValidationError from "../ValidationError.vue";
import { defineComponent, ref } from "vue";
import Password from "primevue/password";
import { ICheckPassword } from "@/interfaces/other/ICheckPassword";
import Divider from "primevue/divider";

export default defineComponent({
  name: "InputPassword",
  components: { Password, Divider, ValidationError },
  props: {
    id: { type: String },
    name: { type: String, required: true },
    placeholder: { type: String },
    label: { type: String },
    style: { type: Object },
    iconPosition: { type: String },
  },
  setup(props) {
    const inputType = ref<string>("password");
    const toggleShowPassword = () => {
      inputType.value = inputType.value === "password" ? "text" : "password";
    };
    const newPasswordChecks = ref<ICheckPassword>({
      capsLetterCheck: false,
      lowsLetterCheck: false,
      numberCheck: false,
      pwdLengthCheck: false,
      specialCharCheck: false,
    });

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

    const { value, handleChange, errorMessage, meta } = useField(
      () => props.name,
      undefined
      // {
      //   // Conditionally enable or disable validation based on formSubmitted
      //   enabled: () => veeValidateForm.isSubmitting,
      // }
    );

    return {
      inputType,
      errorMessage,
      newPasswordChecks,
      value,
      meta,
      handleChange,
      toggleShowPassword,
      handleOnKeyUp,
    };
  },
});
</script>
<style>
.hoverOnIcon:hover {
  cursor: pointer;
}
</style>
