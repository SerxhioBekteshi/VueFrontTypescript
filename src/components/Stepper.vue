<template>
  <div class="wrapper">
    <div>
      <ol class="stepper">
        <div v-for="(step, i) in steps" :key="i">
          <li :class="{ active: i - 1 < activeStep }">STEP</li>
        </div>
      </ol>
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
// import Button from "primevue/button";
import { ref, onMounted, defineComponent } from "vue";

export interface Action {
  component: any;
  props: Record<string, unknown>;
}

export default defineComponent({
  name: "StepperComponent",
  components: {},
  props: {
    steps: { type: Number, required: true, default: 3 },
    activeStep: { type: Number, required: true },
    actions: { type: Array as () => Action[], required: true },
    title: { type: String, required: true },
  },
  setup() {
    const onSubmit = (event: any) => {
      event.preventDefault();
    };

    return {
      onSubmit,
    };
  },
});
</script>
<style scoped>
ol.stepper {
  --default-b: lightgrey;
  --default-c: black;
  --active-b: purple;
  --active-c: white;
  --circle: 3.5rem;
  --b: 2px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(var(--default-b) 0 0) no-repeat 50%
    calc((var(--circle) - var(--b)) / 2) / 100% var(--b);
  /* counter-reset: step; */
  margin: 20px;
  padding: 0;
  font-size: 15px;
  counter-reset: step;
  overflow: hidden;
}

ol.stepper li {
  display: grid;
  place-items: center;
  gap: 5px;
  font-family: sans-serif;
  position: relative;
}
ol.stepper li::before {
  content: counter(step) " ";
  counter-increment: step;
  display: grid;
  place-content: center;
  aspect-ratio: 1;
  height: var(--circle);
  border: 5px solid #fff;
  box-sizing: border-box;
  background: var(--default-b);
  color: var(--default-c);
  border-radius: 50%;
  z-index: 1;
}

ol.stepper li.active::before {
  background: var(--active-b);
  color: var(--active-c);
}

ol.stepper li.active .stepNumber::before {
  background: var(--default-b);
  color: var(--default-c);
}
ol.stepper li.active::after {
  content: "";
  position: absolute;
  height: var(--b);
  right: 100%;
  top: calc((var(--circle) - var(--b)) / 2);
  width: 100vw;
  background: var(--active-b);
}

@media (max-width: 400px) {
  ol.stepper {
    display: grid;
    gap: 20px;
    background: linear-gradient(var(--default-b) 0 0) no-repeat
      calc((var(--circle) - var(--b)) / 2) 50% / var(--b) 100%;
  }
  ol.stepper li {
    display: flex;
  }

  ol.stepper li.active::after {
    content: "";
    position: absolute;
    width: var(--b);
    bottom: 100%;
    left: calc((var(--circle) - var(--b)) / 2);
    top: auto;
    right: auto;
    height: 100vw;
    background: var(--active-b);
  }
}
.wrapper {
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a box shadow */
  border: 1px solid #ccc;
  border-radius: 1rem;
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
</style>
