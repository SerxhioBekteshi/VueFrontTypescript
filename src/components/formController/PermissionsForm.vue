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
          :name="'subjectId'"
          :label="'Subject'"
          :id="'subjectId'"
          :placeholder="'Subject'"
          :controller="'menu/get-all'"
        />
      </div>

      <div class="gapper" style="display: flex; gap: 1rem">
        <div v-for="(role, index) in enumRoles" :key="index">
          <ToggleButton
            v-model="toggleStates[index]"
            :onLabel="role.label"
            :offLabel="role.label"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="w-9rem"
          />
        </div>
        <!-- <InputMultiSelect
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
        /> -->
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "@/components/formElements/InputText.vue";
import { inject } from "vue";
import InputSelect from "@/components/formElements/InputSelect.vue";
import InputMultiSelect from "@/components/formElements/InputMultiSelect.vue";
import { eActionMode } from "@/assets/enums/eActionMode";
import InputBoolean from "@/components/formElements/InputBoolean.vue";
import { eRoles } from "@/assets/enums/eRoles";
import ToggleButton from "primevue/togglebutton";

export default defineComponent({
  name: "MealForm",
  components: {
    InputText,
    InputSelect,
    InputBoolean,
    ToggleButton,
  },
  enums: {
    eActionMode,
    eRoles,
  },
  setup() {
    const veeValidateForm: any = inject("veeValidateForm");

    const enumRoles = ref<any[]>(
      Object.entries(eRoles)
        .map(([key, value]) => ({
          value,
          label: key,
        }))
        .filter((role: any) => role.value !== eRoles.Admin)
    );

    const toggleStates = ref(Array(enumRoles.value.length).fill(false));

    // const { value: name } = veeValidateForm.useField("name");
    // const { value: action } = veeValidateForm.useField("action");
    const { value: roles } = veeValidateForm.useField("roles");

    return {
      eActionMode,
      eRoles,
      enumRoles,
      // name,
      // action,
      toggleStates,
    };
  },
});
</script>
<style scoped>
.gapper {
  margin-top: 1.5rem;
}
</style>
