<template>
  <div class="wrapper">
    <div class="rpHeaderContainer">
      <div
        v-for="(step, i) in steps"
        :key="i"
        :class="{ filled: i < activeStep }"
      >
        <div class="flex align-items-center gap-1">
          <div
            class="circle"
            :style="{
              'background-color': i < activeStep ? '#3498db' : '',
            }"
          >
            {{ i + 1 }}
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <slot></slot>
    </div>
    <div class="panel_add_footer">
      <div v-for="(action, index) in actions" :key="index">
        <component :is="action.component" v-bind="action.props"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import { ref, onMounted, defineComponent } from "vue";

export interface Action {
  component: any;
  props: Record<string, unknown>;
}

export default defineComponent({
  name: "StepperComponent",
  components: { Button },
  props: {
    steps: { type: Number, required: true, default: 3 },
    activeStep: { type: Number, required: true },
    selectedVal: { type: Object, required: false },
    onSubmitData: { type: Function, required: false },
    actions: { type: Array as () => Action[], required: true },
  },
  setup() {
    const allCities = ref(null);

    const activeIndex = ref(0);

    const setActiveIndex = (index: number) => {
      activeIndex.value = index;
    };

    const onSubmit = (event: any) => {
      event.preventDefault();
    };

    return {
      allCities,
      activeIndex,
      setActiveIndex,
      onSubmit,
    };
  },
});
</script>
<style scoped>
.circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  color: black;
  font-size: 14px;
}

.container {
  margin-block: 1rem;
  padding: 3rem;
}

.panel_add_footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
}

.rpHeaderContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 2rem;
  margin-top: 1rem;
  padding-block: 2rem;
}

.line {
  flex: 1; /* Stretch the line horizontally */
  height: 2px; /* Adjust the height of the line as needed */
  background-color: #3498db;
}

.filled {
  position: relative;
}

.filled::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: calc(100% - 35px);
  height: 2px;
  background-color: #3498db;
  transition: background-color 0.5s;
  transform: translateY(-50%);
}
</style>
