<template>
  <div>
    <template v-if="isObject">
      <ul>
        <li v-for="(value, key) in nestedObject" :key="key">
          {{ key }}
          <CellNestedObject :nestedObject="value" />
        </li>
      </ul>
    </template>
    <template v-else>
      <span>{{ nestedObject }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    nestedObject: {
      type: [Object, String],
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
