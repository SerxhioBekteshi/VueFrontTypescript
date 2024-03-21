<script lang="ts">
import { defineComponent } from "vue";
import { downloads } from "../../utils/layoutData";
import Button from "primevue/button";

export default defineComponent({
  name: "DownloadSection",
  components: { Button },
  setup() {
    return {
      downloads,
    };
  },
});
</script>

<template>
  <div class="surface-section text-700 text-center py-4">
    <div class="text-blue-600 font-bold mb-3">
      <i class="pi pi-discord" />&#160;POWERED BY DISCORD
    </div>
    <div class="text-900 font-bold text-5xl mb-3">
      Join Our Design Community
    </div>
    <div class="text-700 text-2xl mb-5">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
      eligendi quos.
    </div>
    <Button
      label="Join Now"
      icon="pi pi-discord ml-4"
      class="font-bold px-4 py-2 ui-button-raised rounded-button white-space-nowrap"
    />
  </div>
</template>
