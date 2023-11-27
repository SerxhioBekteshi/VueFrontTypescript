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
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    nestedObject: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const isObject = computed(() => {
      return (
        typeof props.nestedObject === "object" && props.nestedObject !== null
      );
    });

    return { isObject };
  },
});
</script>
