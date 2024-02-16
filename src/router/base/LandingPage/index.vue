<template>
  <div>
    <div
      :style="{
        width: '100%',
        backgroundColor: 'lightblue',
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'end',
        gap: '1rem',
        paddingBlock: '1rem',
        paddingRight: '1rem',
      }"
    >
      <Button
        @click="() => router.push('/login')"
        label="Login"
        severity="info"
      />
      <Button
        @click="() => router.push('/register')"
        label="Register"
        severity="help"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LandingPage",
  components: {},
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
});
</script>
<style></style>
