<template>
  <div>
    <TableData
      :controller="'user'"
      ref="tableDataRef"
      :showExport="true"
      :showAddBt="false"
      :showDelete="ability.can('delete', 'users')"
      :showEdit="ability.can('edit', 'users')"
      :selectableRows="false"
    />
    <!-- <div v-if="modeDrawer || formData">
      <DetailDrawer
        :onClose="invalidateState"
        :modeDrawer="modeDrawer"
        :formData="formData"
        :controller="'permissions'"
        :validationSchema="permissionSchema"
      >
        <PermissionsForm :modeDrawer="modeDrawer" />
      </DetailDrawer>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TableData from "@/components/table/TableData.vue";
import { eFormMode } from "@/assets/enums/EFormMode";
import { permissionSchema } from "@/utils/validationSchemas";
import DetailDrawer from "@/components/DetailDrawer.vue";
import axios from "axios";
import { useAbility } from "@casl/vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  components: { TableData },
  setup() {
    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const tableDataRef = ref<any>(null);
    const ability = useAbility();

    console.log(ability.rules);

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

    const invalidateState = () => {
      modeDrawer.value = null;
      formData.value = null;
    };

    return {
      modeDrawer,
      formData,
      permissionSchema,
      tableDataRef,
      ability,
      onEditClick,
      invalidateState,
    };
  },
});
</script>
<style></style>
