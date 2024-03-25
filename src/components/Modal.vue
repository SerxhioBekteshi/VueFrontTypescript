<template>
  <Dialog
    closeIcon="true"
    ref="target"
    v-bind:visible="openModal"
    position="top"
    :header="title"
    :draggable="true"
    :closable="true"
    :style="{ width: '50rem', marginTop: '5rem' }"
    :modal="true"
    :dismissableMask="true"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #closeicon>
      <i
        @click="handleModalClose"
        class="pi pi-times"
        style="font-size: 1rem"
      ></i>
    </template>
    <slot></slot>
    <template #footer>
      <div class="actionsAlign">
        <div v-for="(action, index) in actions" :key="index">
          <component :is="action.component" v-bind="action.props"></component>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Modal",
  props: {
    openModal: { type: Boolean, required: true },
    title: { type: String, required: true },
    actions: { type: Array as () => ModalAction[], required: true },
  },
  components: {
    Dialog,
    Button,
  },
  methods: {
    handleModalClose(): void {
      this.$emit("handleClose");
    },
  },
  data() {
    return {};
  },
});

interface ModalAction {
  component: string;
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
</style>
