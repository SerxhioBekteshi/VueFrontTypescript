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

    <Wizard
      ref="createWizard"
      :wizardData="wizardData"
      :viewFirstBackButton="true"
      :processing="isProccessing"
      @stepChanged="stepChanged"
    >
      <template v-slot:first>
        <div>FIRST THING HERE</div>
      </template>

      <template v-slot:second>
        <div>SECOND STEP HERE</div>
      </template>

      <template v-slot:third>
        <div>THIRD STEP HERE</div>
      </template>
    </Wizard>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Wizard from "@/components/Wizard/index.vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LandingPage",
  components: { Button, Wizard },
  setup() {
    const isProccessing = ref<boolean>(false);
    const wizardRef = ref<any>(null);
    const currentStep = ref<string>("first");

    const router = useRouter();

    const stepChanged = (step: any) => {
      console.log("DO STH ");
      currentStep.value = step;
    };

    const goNext = async () => {
      let step;
      let goOn = false;

      switch (currentStep.value) {
        case "first":
          step = 1;

          break;
        case "second":
          step = 2;

          break;
        case "third":
          step = 3;
          break;
      }

      if (step) {
        console.log("JUST MAKE IT WORK FOR THE MOMENT");
        // this.$refs.createWizard.goToStep(step);
        // window.scrollTo(0, 0);
        // this.getGoogleAnalyticsForStep(step);
      }
    };

    const goBack = async () => {
      let step;
      switch (currentStep.value) {
        case "second":
          step = 0;

          break;
        case "third":
          step = 1;

          break;
      }
      //   this.$refs.createWizard.goToStep(step);
      //   window.scrollTo(0, 0)
      //   this.getGoogleAnalyticsForStep(step)
    };

    const moveToStepHandler = (step: number, newStep: number) => {
      // step is the current step(origin) and newStep is the destination
      if (newStep === 0) {
        if (wizardRef.value) {
          wizardRef.value.goToStep(step);
        }
        // this.$refs.stepFirst.init()
        // this.$refs.createWizard.goToStep(newStep)
        // if (this.$refs.subStepper) this.$refs.subStepper.goToStep(0) // subStepper should always get back to first step
      }

      if (newStep === 1) {
        // this.$refs.stepSecond.init()
        // this.$refs.createWizard.goToStep(newStep)
        if (wizardRef.value) {
          wizardRef.value.goToStep(newStep);
        }
        // if (this.$refs.subStepper) this.$refs.subStepper.goToStep(0)
      }

      window.scrollTo(0, 0);
    };
    const wizardData = reactive<any>([
      {
        key: "first",
        label: "first",
        hideBackButton: true,
        hideStep: false,
        nextHandler: () => goNext(),
      },
      {
        key: "second",
        label: "second",
        hideStep: false,
        moveToStepHandler: (step: any) => moveToStepHandler(1, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
      {
        key: "third",
        label: "third",
        hideStep: false,
        nextLabel: "what??",
        moveToStepHandler: (step) => moveToStepHandler(2, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
    ]);
    return {
      ...toRefs(wizardRef),
      router,
      wizardData,
      isProccessing,
      stepChanged,
    };
  },
});
</script>
<style></style>
