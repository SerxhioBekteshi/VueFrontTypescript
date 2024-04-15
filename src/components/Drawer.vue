<template>
  <!-- <div class="card flex justify-content-center"> -->
  <OnClickOutside
    :options="{
      ignore: [
        // '.p-dialog p-component',
        '.p-sidebar-header',
        '.p-sidebar-content',
        '.p-sidebar-footer',
      ],
    }"
    @trigger="
      () => {
        if (openDrawer === true) {
          handleDrawerClose();
        }
      }
    "
  >
    <Sidebar
      style="position: relative"
      :visible="openDrawer"
      position="right"
      class="w-full md:w-30rem"
    >
      <template #header>
        <div class="flex">
          <h2>{{ title }}</h2>
        </div>
      </template>
      <template #closeicon>
        <i
          @click="handleDrawerClose"
          class="pi pi-times"
          style="font-size: 1rem"
        ></i>
      </template>
      <div class="body">
        <!-- <ScrollPanel style="width: 100%; height: 100%"> -->
        <slot></slot>
        <!-- </ScrollPanel> -->
      </div>
      <div class="actions">
        <div class="actionsAlign">
          <div v-for="(action, index) in actions" :key="index">
            <component :is="action.component" v-bind="action.props"></component>
          </div>
        </div>
      </div>
    </Sidebar>
  </OnClickOutside>

  <!-- </div> -->
</template>

<script lang="ts">
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import { defineComponent } from "vue";
import ScrollPanel from "primevue/scrollpanel";
import { OnClickOutside } from "@vueuse/components";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Drawer",
  props: {
    openDrawer: { type: Boolean, required: true },
    title: { type: String, required: true },
    actions: { type: Array as () => Action[], required: true },
  },
  components: {
    Sidebar,
    Button,
    ScrollPanel,
    OnClickOutside,
  },
  methods: {
    handleDrawerClose(): void {
      this.$emit("handleClose");
    },
  },
  mounted() {
    return {};
  },
  data() {
    return {};
  },
});
// eslint-disable-next-line vue/comment-directive

interface Action {
  component: any;
  props: Record<string, unknown>;
}
</script>
<style>
.actions {
  position: absolute;
  bottom: 0;
  background-color: white;
  width: 100%;
}

.actionsAlign {
  display: flex;
  gap: 1rem;
  justify-content: start;
}

.p-sidebar-header-content {
  width: 100%;
}

.body {
  max-height: calc(100% - 3rem);
  overflow-y: auto;
}
</style>
