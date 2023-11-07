<template>
  <div v-if="layout === 'grid'">
    <div
      class="flex flex-wrap align-items-center justify-content-between gap-2"
    >
      <Skeleton class="w-6rem border-round h-2rem" />
      <Skeleton class="w-3rem border-round h-1rem" />
    </div>
    <div class="flex flex-column align-items-center gap-3 py-5">
      <Skeleton class="w-9 shadow-2 border-round h-10rem" />
      <Skeleton class="w-8rem border-round h-2rem" />
      <Skeleton class="w-6rem border-round h-1rem" />
    </div>
    <div class="flex align-items-center justify-content-between">
      <Skeleton class="w-4rem border-round h-2rem" />
      <Skeleton shape="circle" class="w-3rem h-3rem" />
    </div>
    <div class="flex flex-column gap-3 mb-3">
      <Skeleton class="w-9 shadow-2 border-round h-2rem" />
      <Skeleton class="w-9 shadow-2 border-round h-2rem" />
    </div>
    <div>
      <Skeleton class="shadow-2 border-round h-10rem" />
    </div>
  </div>
  <div v-else>
    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
      >
        <div
          class="flex flex-column align-items-center sm:align-items-start gap-3"
        >
          <Skeleton class="w-6rem border-round h-2rem" />
          <Skeleton class="w-6rem border-round h-2rem" />
          <Skeleton class="w-9rem border-round h-1rem" />
          <Skeleton class="w-6rem border-round h-1rem" />
          <Skeleton class="w-9rem border-round h-1rem" />
          <Skeleton class="w-9rem border-round h-1rem" />
        </div>

        <div class="flex flex-column align-items-center gap-2">
          <Skeleton class="w-6rem border-round h-2rem" />
          <Skeleton class="w-9rem border-round h-6rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Skeleton from "primevue/skeleton";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MEalsSkeleton",
  components: { Skeleton },
  props: {
    layout: { type: String, required: true },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped></style>
