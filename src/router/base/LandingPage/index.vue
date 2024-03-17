<template>
  <Header />
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
    <!-- <HeroSection /> -->

    <!-- <FeatureSection />

    <DownloadSection />

    <FaqSection />

    <SubscribeSection /> -->
  </div>
  <Footer />
</template>

<script lang="ts">
import Button from "primevue/button";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import FaqSection from "../../../views/sections/FaqSection.vue";
import FeatureSection from "../../../views/sections/FeatureSection.vue";
import DownloadSection from "../../../views/sections/DownloadSection.vue";
import Footer from "./Footer.vue";
import Header from "./Header.vue";

export default defineComponent({
  name: "LandingPage",
  components: {
    // HeroSection,
    // Header,
    // Footer,
    // FaqSection,
    // FeatureSection,
    // DownloadSection,
    Button,
  },
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
});
</script>
<style></style>
