<template>
  <div class="my-3">{{ actionName }}</div>
  <div
    class="flex gap-2 align-items-center flex-wrap mt-2"
    v-if="
      actionName &&
      actionPermissionsObject &&
      actionPermissionsObject[`${actionName}`].length !== 0
    "
  >
    <div
      v-for="(actionObj, index) in actionPermissionsObject[`${actionName}`]"
      :key="index"
      class=""
    >
      <Chip :label="actionObj" />
    </div>
  </div>
  <div v-else>
    <InlineMessage severity="warn">No add permissions</InlineMessage>
  </div>
</template>

<script lang="ts">
import Chip from "primevue/chip";
import InlineMessage from "primevue/inlinemessage";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "SystemUserPermissions",
  components: { InlineMessage, Chip },
  props: {
    actionName: { type: String, required: true },
  },
  setup(props) {
    const actionPermissionsObject = inject("actionPermissionsObject");

    return { actionPermissionsObject };
  },
});
</script>
<style scoped lang="scss"></style>
