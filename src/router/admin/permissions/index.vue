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

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Permissions",
  components: { TableData, DetailDrawer, PermissionsForm },
  setup() {
    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const tableDataRef = ref<any>(null);

    const handleAddClick = () => {
      modeDrawer.value = eFormMode.Add;
    };

    const onEditClick = async (data: any, rowId: number) => {
      try {
        const res: any = await axios.get(`permissions/${data.id}`);
        console.log(res, "RES IN FRONT");
      } catch (err) {
        console.log(err, "ERR");
      }
      modeDrawer.value = eFormMode.Edit;
      formData.value = data;
    };

    const fetchDataAfterSubmit = () => {
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
