<template>
    <div class="card relative z-2" style="width: 100%">
        <Menubar :model="items" style="display: flex; justify-content: end;" />
    </div>
</template>
  
<script>
// import Button from "primevue/button"
import Menubar from "primevue/menubar"
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: { Menubar },
    data() {
        return {
            items: [
                {
                    label: 'Login',
                    icon: 'pi pi-fw pi-user',
                    command: this.$router.push({ name: "LoginView" }),
                },
                {
                    label: 'Register',
                    icon: 'pi pi-user',
                    command: this.$router.push({ name: "RegisterView" }),
                },
                {
                    label: 'Quit',
                    icon: 'pi pi-fw pi-power-off'
                }]
        };
    },
    methods: {

    },
};
</script>
<style></style>
  