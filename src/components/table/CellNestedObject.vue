<template>
  <div class="box">
    <template v-if="isObject">
      <div>
        <div v-for="(value, key) in nestedObject" :key="key">
          {{ key }}
          <CellNestedObject :nestedObject="value" />
        </div>
      </div>
    </template>
    <template v-else>
      <span style="font-weight: bold">{{ nestedObject }} </span>
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
<style scoped>
/* .box ul {
  position: relative;
  background: #fff;
} 
.box ul:hover li {
  opacity: 0.2;
}
.box ul li {
  list-style: none;
  padding: 10px;
  width: 100%;
  background: #fff;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s;
}
.box ul li:hover {
  transform: scale(1.1);
  z-index: 5;
  background: #25bcff;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  color: #fff;
  opacity: 1;
}
.box ul li span {
  text-align: center;
  padding: 0.5rem;
  line-height: 20px;
  background: #25bcff;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  transform: translateY(-2px);
}
.box ul li:hover span {
  background: #fff;
  color: #25bcff;
} */
</style>
