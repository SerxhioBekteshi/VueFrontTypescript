<template>
  <div class="grid">
    <div class="md:col-5 sm:col-12 card">
      <div class="flex align-items-center justify-content-center">
        <div class="image-wrapper">
          <img
            class="image-content"
            :src="`http://localhost:1112/${profile.photo}`"
            :alt="profile.name"
          />
          {{ profile.photo }}
        </div>
      </div>
    </div>
    <div class="md:col-7 sm:col-12 card">
      <div>
        <h2>Profile Settings</h2>
      </div>
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
            :label="'lastName'"
            id="lastName"
            placeholder="lastName"
            v-bind="lastName"
          />
        </div>
        <div class="col-12">
          <InputText
            name="address"
            :label="'address'"
            id="address"
            placeholder="address"
            v-bind="address"
          />
        </div>

        <div class="col-12">
          <InputText
            name="state"
            :label="'state'"
            id="state"
            placeholder="state"
            v-bind="state"
          />
        </div>

        <div class="col-12">
          <Dropdown
            v-model="gender"
            :options="[
              { gender: 'male', value: 'gender' },
              { gender: 'female', value: 'male' },
            ]"
            optionLabel="gender"
            placeholder="Select gender"
            class="w-full"
          />
        </div>

        <div class="col-12">
          <span class="p-float-label">
            <Calendar v-model="birthDate" inputId="birth_date" class="w-full" />
            <label for="birth_date">Birth Date</label>
          </span>
        </div>

        <!-- <div class="col-12">
          <InputText
            name="lastName"
            :label="'lastName'"
            id="lastName"
            placeholder="lastName"
            v-bind="lastName"
          />
        </div>

        <div class="col-12">
          <InputText
            name="lastName"
            :label="'lastName'"
            id="lastName"
            placeholder="lastName"
            v-bind="lastName"
          />
        </div>

        <div class="col-12">
          <InputText
            name="lastName"
            :label="'lastName'"
            id="lastName"
            placeholder="lastName"
            v-bind="lastName"
          />
        </div>

        <div class="col-12">
          <InputText
            name="lastName"
            :label="'lastName'"
            id="lastName"
            placeholder="lastName"
            v-bind="lastName"
          />
        </div> -->
      </div>

      <div class="flex justify-content-start mt-3 gap-3">
        <div>
          <Button severity="primary" label="Edit" />
        </div>
        <div>
          <Button severity="info" label="Reset" />
        </div>
      </div>
    </div>
    <!-- <div class="md:col-3 sm:col-12 card">SOME OTHER DATA</div> -->
  </div>
</template>

<script lang="ts">
import { useReduxSelector } from "@/store/redux/helpers";
import { defineComponent } from "vue";
import InputText from "../components/formElements/InputText.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";

export default defineComponent({
  name: "TableCell",
  components: { InputText, Dropdown, Calendar, Button },
  props: {},
  setup() {
    const profile = useReduxSelector((state) => state.user);

    const schema = yup.object().shape({
      name: yup.string().required("Name is required").label("Name"),
      lastName: yup
        .string()
        .required("Last name is required")
        .label("Last Name"),
      gender: yup.string().required("Gender is required").label("Gender"),
      address: yup.string().required("Address is required").label("Gender"),
      state: yup.string().required("State is required").label("Gender"),
    });

    const { handleSubmit, defineInputBinds, resetForm } = useForm({
      initialValues: profile,
      validationSchema: schema,
    });

    const { value: name } = useField("name");

    return { profile };
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
