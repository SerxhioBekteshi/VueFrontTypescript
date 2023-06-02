<template>
    <Sidebar :visible="true">
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.</p>
        <template #header>
            HERE MAYBE IT WILL BE SOME ICON
        </template>

        HERE IT WILL BE THE MENU OPTIONS
    </Sidebar>
</template>
  
<script lang="ts">
import Sidebar from 'primevue/sidebar';
import { defineComponent } from 'vue';


export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Sidebar',
    props: {

    },
    components: {
        Sidebar,
    },
    methods:
    {

    },
    data() {
        return {
        }
    }
})



</script>
<style>
.actions {
    position: absolute;
    bottom: 0;
    margin-bottom: 1rem;
    width: 90%;
}

.actionsAlign {
    display: flex;
    gap: 1rem;
    justify-content: start;

}
</style>