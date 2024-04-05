<template>
  <div>
    <TableData
      :controller="'permissions'"
      ref="tableDataRef"
      @insert-clicked="handleAddClick"
      @edit-clicked="onEditClick"
      :showExport="false"
      :showAddBt="true"
      :selectableRows="false"
    />
    <div v-if="modeDrawer || formData">
      <DetailDrawer
        :onClose="invalidateState"
        :modeDrawer="modeDrawer"
        :formData="formData"
        :controller="'permissions'"
        :validationSchema="permissionSchema"
        :fetchDataAfterSubmit="fetchDataAfterSubmit"
        :shouldRefreshPageIfFieldNull="'subjectId'"
      >
        <PermissionsForm :modeDrawer="modeDrawer" />
      </DetailDrawer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TableData from "@/components/table/TableData.vue";
import { eFormMode } from "@/assets/enums/EFormMode";
import { permissionSchema } from "@/utils/validationSchemas";
import DetailDrawer from "@/components/DetailDrawer.vue";
import PermissionsForm from "@/components/formController/PermissionsForm.vue";
import axios from "axios";
import AuthManager from "@/utils/authManager";
import { useStore } from "vuex";
import { RootState } from "@/store/vuexStore/types";
import { eMutationTypes } from "@/assets/enums/eMutationTypes";
import { defineAbilityFor } from "@/initializers/ability";
import { useAbility } from "@casl/vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Permissions",
  components: { TableData, DetailDrawer, PermissionsForm },
  setup() {
    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const tableDataRef = ref<any>(null);
    const store = useStore<RootState>();
    const handleAddClick = () => {
      modeDrawer.value = eFormMode.Add;
    };
    const ability = useAbility();

    const onEditClick = async (data: any, rowId: number) => {
      try {
        const res: any = await axios.get(`permissions/${data.id}`);
        if (res && res.data) formData.value = res.data;
      } catch (err) {
        console.log(err, "ERR");
      }
      modeDrawer.value = eFormMode.Edit;
      // formData.value = data;
    };

    const fetchDataAfterSubmit = async () => {
      const currentUser: any = await AuthManager.getUserData();
      store.commit(eMutationTypes.SET_USER, currentUser);
      const updatedAbility = await defineAbilityFor();
      ability.update(updatedAbility.rules);
      if (tableDataRef.value) {
        tableDataRef.value.fetchData();
      }
    };

    const invalidateState = () => {
      modeDrawer.value = null;
      formData.value = null;
    };

    return {
      modeDrawer,
      formData,
      permissionSchema,
      tableDataRef,
      fetchDataAfterSubmit,
      handleAddClick,
      onEditClick,
      invalidateState,
    };
  },
});
</script>
<style></style>
