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

    async function getUserData() {
      const res = await axios.get("/applicationMenu/get-all");
      model.value[0].items = res.data.menuItems; // Access the items property on the first object
    }

    onMounted(() => {
      getUserData();
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
