<template>
  <div>
    <ul v-if="isObject">
      <li v-for="(value, key) in nestedObject" :key="key">
        {{ key }}
        <CellNestedObject :nestedObject="value" />
      </li>
    </ul>
    <span v-else>{{ nestedObject }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    nestedObject: {},
  },
  computed: {
    isObject() {
      return (
        typeof this.nestedObject === "object" && this.nestedObject !== null
      );
    },
  },
};
</script>
