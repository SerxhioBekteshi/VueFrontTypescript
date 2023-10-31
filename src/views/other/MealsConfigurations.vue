<template>
  <div class="card">
    <TabView class="tabview-custom">
      <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <p class="m-0">{{ tab.content }}</p>
      </TabPanel>
    </TabView>
  </div>
</template>

<script lang="ts">
import Avatar from "primevue/avatar";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MealsConfigurations",
  components: { TabPanel, TabView },
  props: {},
  setup() {
    const tabs = ref([
      { title: "Tab 1", content: "Tab 1 Content" },
      { title: "Tab 2", content: "Tab 2 Content" },
      { title: "Tab 3", content: "Tab 3 Content" },
    ]);
    return { tabs };
  },
});
</script>
<style></style>
