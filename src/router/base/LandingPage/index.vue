<template>
    <div>
        <div :style="{
            width: '100%', backgroundColor: 'lightblue', height: 'fit-content', display: 'flex', justifyContent: 'end', gap: '1rem', paddingBlock: '1rem', paddingRight: '1rem'
        }">
            <Button @click="$router.push('/login')" label="Login" severity="info" />
            <Button @click="$router.push('/register')" label="Register" severity="help" />

        </div>
    </div>
</template>
  
<script lang="ts">
import Button from "primevue/button"

import { defineComponent } from "vue"

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "LandingPage",
    components: { Button },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    data() { },
    methods: {

    },
});
</script>
<style></style>
  