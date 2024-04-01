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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TableData from "@/components/table/TableData.vue";
import { permissionSchema } from "@/utils/validationSchemas";
import { useAbility } from "@casl/vue";

export default defineComponent({
  name: "Users",
  components: { TableData },
  setup() {
    const modeDrawer = ref<any>(null);
    const formData = ref<any>(null);
    const tableDataRef = ref<any>(null);
    const ability = useAbility();

    return {
      modeDrawer,
      formData,
      permissionSchema,
      tableDataRef,
      ability,
    };
  },
});
</script>
<style></style>
