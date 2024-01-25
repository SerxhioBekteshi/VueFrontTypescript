<script lang="ts">
import { onMounted, ref } from "vue";
import { defineComponent } from "vue";
import AppMenuItem from "./AppMenuItem.vue";
import axios from "axios";

export default defineComponent({
  name: "AppMenu",
  components: {
    AppMenuItem,
  },
  setup() {
    const model = ref([
      {
        label: "Home",
        items: [],
      },
    ]);

    async function getMeals() {
      try {
        const res = await axios.get("/menu/get-all2");
        if (res.data) model.value[0].items = res.data;
      } catch (err) {
        console.log(err, "ERR MENU");
      }
      // Access the items property on the first object
    }

    onMounted(() => {
      getMeals();
    });

    return {
      model, // Expose the ref in the setup
    };
  },
});
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem :item="item" :index="i"></AppMenuItem>
      <li class="menu-separator"></li>
    </template>
    <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
  </ul>
</template>

<style lang="scss" scoped></style>
