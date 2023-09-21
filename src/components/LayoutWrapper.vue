<template>
  <div>
    <div v-if="!loaded">
      <Preloader />
    </div>
    <div v-else>
      <AppLayout />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Preloader from "./PreLoader.vue";
// import SidebarC from './SidebarC.vue';
import AppLayout from "../layout/AppLayout.vue";

export default defineComponent({
  name: "LayoutWrapper",
  components: {
    Preloader,
    AppLayout,
    // SidebarC,
  },
  setup() {
    const loaded = ref(false);
    onMounted(() => {
      const timer = setTimeout(() => {
        loaded.value = true;
      }, 500);
      return () => clearTimeout(timer);
    });

    return {
      loaded,
    };
  },
});
</script>
