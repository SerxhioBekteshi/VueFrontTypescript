<template>
  <div class="grid">
    <div
      class="md:col-5 sm:col-12 card flex align-items-center justify-content-center"
    >
      <div class="flex flex-column gap-3">
        <div class="image-wrapper">
          <img
            class="image-content"
            :src="`http://localhost:1112/public/images/users/${profile.photo}`"
            :alt="profile.name"
          />
        </div>
        <div class="text-center">
          <FileUpload
            :multiple="false"
            mode="basic"
            @uploader="handleFileUpload($event)"
            :maxFileSize="1000000"
            accept="image/*"
            :customUpload="true"
          />
        </div>
      </div>
    </div>
    <div class="md:col-7 sm:col-12 card">
      <div>
        <h2>Profile Settings</h2>
      </div>
      <form @submit="handlePrevent"></form>
      <div class="grid">
        <div style="margin-top: 1rem" class="col-6">
          <InputText
            name="name"
            :label="'name'"
            id="name"
            placeholder="name"
            v-bind="name"
          />
        </div>

        <div style="margin-top: 1rem" class="col-6">
          <InputText
            name="lastName"
            :label="'LastName'"
            id="lastName"
            placeholder="lastName"
            v-bind="lastName"
          />
        </div>
        <div class="col-12">
          <InputText
            name="address"
            :label="'Address'"
            id="address"
            placeholder="address"
            v-bind="address"
          />
        </div>

        <div class="col-12">
          <InputText
            name="state"
            :label="'State'"
            id="state"
            placeholder="state"
            v-bind="state"
          />
        </div>

        <div class="col-12">
          <InputSelect
            :options="[
              { gender: 'male', value: 'male' },
              { gender: 'female', value: 'female' },
            ]"
            :optionLabel="'gender'"
            :optionValue="'value'"
            name="lastName"
            :label="'Gender'"
            id="state"
            placeholder="LastName"
            v-bind="lastName"
          />
        </div>

        <div class="col-12">
          <InputDate
            name="birthDate"
            :label="'BirthDate'"
            id="birthDate"
            placeholder="birthDate"
            v-bind="birthDate"
            :dateFormat="'yy-mm-dd'"
          />
        </div>
      </div>

      <div class="flex justify-content-start mt-3 gap-3">
        <div>
          <Button
            severity="primary"
            label="Edit"
            @click="handleSubmit(handleEditProfileData)()"
          />
        </div>
        <div><Button severity="info" label="Reset" @click="resetForm()" /></div>
      </div>
    </div>
    <!-- <div class="md:col-3 sm:col-12 card">SOME OTHER DATA</div> -->
    <Toast />
  </div>
</template>

<script lang="ts">
import { useReduxSelector } from "@/store/redux/helpers";
import { defineComponent } from "vue";
import InputText from "../components/formElements/InputText.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import InputSelect from "../components/formElements/InputText.vue";
import InputDate from "../components/formElements/InputDate.vue";
import Button from "primevue/button";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import FileUpload from "primevue/fileupload";

export default defineComponent({
  name: "TableCell",
  components: { InputText, InputSelect, InputDate, Button, FileUpload },
  props: {},
  setup() {
    const profile = useReduxSelector((state) => state.user);
    const toast = useToast();
    console.log(profile, "PROFILE");
    const schema = yup.object().shape({
      name: yup.string().required("Name is required").label("Name"),
      lastName: yup
        .string()
        .required("Last name is required")
        .label("Last Name"),
      gender: yup.string().required("Gender is required").label("Gender"),
      address: yup.string().required("Address is required").label("Address"),
      state: yup.string().required("State is required").label("State"),
      birthDate: yup
        .string()
        .required("Birthdate is required")
        .label("Birthdate"),
    });

    const { handleSubmit, defineInputBinds, resetForm } = useForm({
      initialValues: profile,
      validationSchema: schema,
    });

    const handlePrevent = (event: any) => {
      event.preventDefault();
    };

    const handleFileUpload = async (event: any) => {
      const file = event.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res: any = await axios.post(`/user/image`, formData);

        if (res && res !== null) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          //update user state after this from dispatch
        }
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    const handleEditProfileData = async (values: any) => {
      console.log(values, "DATA");
    };

    const { value: name } = useField("name");
    const { value: lastName } = useField("lastName");
    const { value: gender } = useField("gender");
    const { value: address } = useField("address");
    const { value: state } = useField("state");
    const { value: birthDate } = useField("birthDate");

    return {
      name,
      profile,
      lastName,
      gender,
      address,
      state,
      birthDate,
      handlePrevent,
      handleFileUpload,
      handleEditProfileData,
      handleSubmit,
      resetForm,
    };
  },
});
</script>
<style>
.image-wrapper {
  width: 150px; /* Set your desired width */
  height: 150px; /* Set your desired height */
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Preserve aspect ratio while filling the container */
}
</style>
