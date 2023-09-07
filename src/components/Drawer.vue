<template>
  <!-- <div class="card flex justify-content-center"> -->
  <Sidebar
    style="position: relative"
    :visible="openDrawer"
    position="right"
    class="w-full md:w-20rem lg:w-30rem"
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
    <slot></slot>
    <div class="actions">
      <div class="actionsAlign">
        <div v-for="(action, index) in actions" :key="index">
          <component :is="action.component" v-bind="action.props"></component>
        </div>
      </div>
    </div>
  </Sidebar>
  <!-- </div> -->
</template>

<script lang="ts">
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import { defineComponent, ref } from "vue";

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
  margin-bottom: 1rem;
  width: 90%;
}

.actionsAlign {
  display: flex;
  gap: 1rem;
  justify-content: start;
}

.p-sidebar-header-content {
  width: 100%;
}
</style>
