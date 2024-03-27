<template>
  <div>
    <InlineMessage class="custom-inline-message" unstyled severity="error">
      <slot></slot>
    </InlineMessage>
  </div>
</template>

<script lang="ts">
import InlineMessage from "primevue/inlinemessage";

export default {
  name: "ValidationError",
  components: {
    InlineMessage,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
::v-deep .p-icon {
  font-size: 12px;
}

.custom-inline-message {
  width: fit-content !important;
  color: var(--red-500) !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.125rem;
  font-size: 12px;
}
</style>
