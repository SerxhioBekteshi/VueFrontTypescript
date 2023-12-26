<template>
  <div>
    <form @onSubmit="(e: any) => e.preventDefault()">
      <div class="gapper">
        <InputText
          :name="'name'"
          :label="'Permission Name'"
          :id="'name'"
          :placeholder="'Permission Name'"
        />
      </div>

      <div class="gapper">
        <InputText
          :name="'description'"
          :label="'Permission Description'"
          :id="'description'"
          :placeholder="'Description Name'"
        />
      </div>

      <div class="gapper">
        <InputBoolean
          :name="'isActive'"
          :label="'Active permission'"
          :id="'activePermission'"
          :placeholder="'Active Permission'"
        />
      </div>

      <div class="gapper">
        <InputSelect
          :options="[
            { label: eActionMode.Read, value: eActionMode.Read },
            { label: eActionMode.Edit, value: eActionMode.Edit },
            { label: eActionMode.Delete, value: eActionMode.Delete },
          ]"
          :includeEmptyOption="true"
          :name="'action'"
          :label="'Permission Action'"
          :id="'action'"
          :placeholder="'Action Name'"
        />
      </div>

      <div class="gapper">
        <InputSelect
          :name="'subject'"
          :label="'Subject'"
          :id="'subject'"
          :placeholder="'Subject'"
          :controller="'menu/get-all'"
        />
      </div>

      <div class="gapper">
        <InputMultiSelect
          :name="'roles'"
          :label="'roles'"
          :id="'roles'"
          :placeholder="'Roles'"
          :options="
            Object.entries(eRoles).map(([key, value]) => ({
              value,
              label: key,
            }))
          "
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import { inject } from "vue";
import InputSelect from "@/components/formElements/InputSelect.vue";
import InputMultiSelect from "@/components/formElements/InputMultiSelect.vue";
import { eActionMode } from "@/assets/enums/eActionMode";
import InputBoolean from "@/components/formElements/InputBoolean.vue";
import { eRoles } from "@/assets/enums/eRoles";

export default defineComponent({
  name: "MealForm",
  components: { InputText, InputSelect, InputBoolean, InputMultiSelect },
  enums: {
    eActionMode,
    eRoles,
  },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const { value: name } = veeValidateForm.useField("name");
    const { value: action } = veeValidateForm.useField("action");
    const { value: role } = veeValidateForm.useField("role");

    return {
      eActionMode,
      eRoles,
      name,
      action,
    };
  },
});
</script>
<style scoped>
.gapper {
  margin-top: 1.5rem;
}
</style>
