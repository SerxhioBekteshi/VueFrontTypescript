<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div
      class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center"
    >
      <section>
        <span class="block text-6xl font-bold mb-1">Create the screens </span>
        <div class="text-6xl text-primary font-bold mb-3">
          your visitors deserve to see
        </div>
        <p class="mt-0 mb-4 text-700 line-height-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <Button label="Learn More" class="mr-3 ui-button-raised" />
        <Button label="Live Demo" class="ui-button-outlined" />
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img
        preview
        src="../../assets/images/login.png"
        alt="Image"
        width="100%"
        class="md:ml-auto block md:h-full"
        style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
// import Image from "primevue/image";

import { defineComponent } from "vue";

export default defineComponent({
  name: "HeroSection",
  components: { Button },
  setup() {
    return {};
  },
});
</script>
