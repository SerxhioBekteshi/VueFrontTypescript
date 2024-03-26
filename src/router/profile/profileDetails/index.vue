<template>
  <div class="grid">
    <div class="md:col-6 sm:col-12 card flex justify-content-center">
      <div class="flex flex-column gap-3">
        <div class="flex justify-content-center w-full">
          <ImageForm
            :controller="'user'"
            :imageData="profile || {}"
            :includeId="false"
          />
        </div>
      </div>
    </div>
    <div class="md:col-6 sm:col-12 card">
      <div>
        <h2>Profile Settings</h2>
      </div>
      <form @submit="(event) => event.preventDefault()">
        <div class="grid">
          <div style="margin-top: 1rem" class="col-6">
            <InputText
              :name="'name'"
              :label="'Name'"
              :id="'name'"
              :placeholder="'Name'"
            />
          </div>

          <div style="margin-top: 1rem" class="col-6">
            <InputText
              :name="'lastName'"
              :label="'Last Name'"
              :id="'lastName'"
              :placeholder="'Last Name'"
            />
          </div>
          <div class="col-12">
            <InputText
              :name="'address'"
              :label="'Address'"
              :id="'address'"
              :placeholder="'Address'"
            />
          </div>

          <div class="col-12">
            <InputText
              :name="'state'"
              :label="'State'"
              :id="'state'"
              :placeholder="'State'"
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
              :name="'gender'"
              :label="'Gender'"
              :id="'gender'"
              :placeholder="'Gender'"
            />
          </div>

          <div class="col-12">
            <InputDate
              :name="'birthDate'"
              :label="'BirthDate'"
              :id="'birthDate'"
              :placeholder="'birthDate'"
              :dateFormat="'yy-mm-dd'"
            />
          </div>
        </div>
      </form>

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

    <Toast />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import { useForm } from "vee-validate";
import InputSelect from "@/components/formElements/InputSelect.vue";
import InputDate from "@/components/formElements/InputDate.vue";
import Button from "primevue/button";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import ImageForm from "@/components/formController/ImageForm.vue";
import { profileDetailsSchema } from "@/utils/validationSchemas";
// import { setUser } from "@/store/stores/user.store";
import { useStore } from "vuex";
import { RootState } from "@/store/vuexStore/types";

export default defineComponent({
  name: "ProfileDetails",
  components: {
    InputText,
    InputSelect,
    InputDate,
    Button,
    Toast,
    ImageForm,
  },
  props: {},
  setup() {
    // const profile: any = {};
    // const store = useStore();
    // const profile = computed(() => store.state.user.user);
    const store = useStore<RootState>();
    const profile = computed(() => store.getters.getUserInfo);

    const toast = useToast();

    const { handleSubmit, resetForm, setFieldValue } = useForm({
      initialValues: profile,
      validationSchema: profileDetailsSchema,
    });
    provide("dateAssignValue", { setFieldValue });

    const handleEditProfileData = async (values: any) => {
      try {
        const res: any = await axios.put(`/user/update`, values);
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          // dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    return {
      profile,
      handleSubmit,
      handleEditProfileData,
      resetForm,
    };
  },
});
</script>
<style scoped>
.image-wrapper {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
