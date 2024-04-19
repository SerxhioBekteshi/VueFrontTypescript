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
import { useForm } from "vee-validate";
import InputPassword from "@/components/formElements/InputPassword.vue";
import axios from "axios";
import { provide } from "vue";
import { passwordValidationSchema } from "@/utils/validationSchemas";

export default defineComponent({
  name: "ProfilePassword",
  components: { Toast, Button, InputPassword },
  props: {},
  setup() {
    const toast = useToast();
    const op = ref();

    const { handleSubmit, resetForm, isSubmitting } = useForm({
      validationSchema: passwordValidationSchema,
      initialValues: {
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      },
    });
    // provide("veeValidateForm", { isSubmitting });
    const handlePrevention = (event: Event) => {
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
      op,
      handleSubmit,
      resetForm,
      handlePasswordChange,
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
