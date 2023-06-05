<template>
    <div>
        <div v-if="!loaded">
            <Preloader />
        </div>
        <div v-else>
            <SidebarC />
            <main class="content py-5 px-3">
                <slot></slot>
            </main>
        </div>

    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Preloader from './PreLoader.vue';
import SidebarC from './SidebarC.vue';

export default defineComponent({
    name: 'LayoutWrapper',
    components: {
        Preloader,
        SidebarC,
    },
    setup() {
        const loaded = ref(false);
        onMounted(() => {
            const timer = setTimeout(() => {
                loaded.value = true;
            }, 1000);
            return () => clearTimeout(timer);
        });

        return {
            loaded,
        };
    },
});
</script>
  