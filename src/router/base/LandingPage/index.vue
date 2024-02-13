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
      ref="wizardRef"
      :wizardData="wizardData"
      :viewFirstBackButton="true"
      :processing="isProccessing"
      @stepChanged="stepChanged"
    >
      <div v-for="(question, index) in quizQuestion" :key="index">
        <template
          v-if="getKeyByValue(eQuizSlot, index + 1)"
          v-slot:[`${getKeyByValue(eQuizSlot,index+1)}`]
        >
          <Step :data="question" />
        </template>
      </div>

      <!-- <template v-slot:first>
        <Step :data="quizQuestion[index]" />

        <div>FIRST THING HERE</div>
      </template>

      <template v-slot:second>
        <div>SECOND STEP HERE</div>
      </template>

      <template v-slot:third>
        <div>THIRD STEP HERE</div>
      </template> -->
    </Wizard>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Wizard from "@/components/Wizard/index.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import eQuizSlot from "@/assets/enums/eQuizSlot";
import axios from "axios";
import Step from "@/router/quiz/Step.vue";
import { getKeyByValue } from "@/utils/functions";

export default defineComponent({
  name: "LandingPage",
  components: { Button, Wizard, Step },
  enums: { eQuizSlot },
  setup() {
    const isProccessing = ref<boolean>(false);
    const wizardRef = ref<any>();
    const currentStep = ref<string>("first");
    const quizQuestion = ref<any[]>([]);

    const router = useRouter();

    const stepProcessing = () => {
      isProccessing.value = true;
    };

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
          break;
      }

      if (step) {
        wizardRef.value.goToStep(step);
        window.scrollTo(0, 0);
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
      wizardRef.value.goToStep(step);
      window.scrollTo(0, 0);
    };

    const moveToStepHandler = (step: number, newStep: number) => {
      // step is the current step(origin) and newStep is the destination
      if (newStep === 0) {
        if (wizardRef.value) {
          wizardRef.value.goToStep(newStep);
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
    const wizardData = ref<any>([
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

    const getQuiz = async () => {
      try {
        const res = await axios.get("/quiz/get-all");
        if (res && res.data) {
          res.data.sort((a: any, b: any) => a.order - b.order);
          quizQuestion.value = res.data;
          // steps.value = res.data.map((question: any) => ({
          //   fieldName: question.fieldName,
          // }));
          // res.data.forEach((obj: any) => {
          //   const fieldName = obj.fieldName;
          //   initialValuesKey.value[fieldName] = "";
          // });
        }
      } catch (err: any) {
        console.log(err, "ERR");
      }
    };

    onMounted(() => {
      getQuiz();
    });

    return {
      wizardRef,
      router,
      wizardData,
      isProccessing,
      stepChanged,
      eQuizSlot,
      quizQuestion,
      getKeyByValue,
    };
  },
});
</script>
<style></style>
