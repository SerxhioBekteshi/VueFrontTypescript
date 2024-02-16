<template>
  <div>
    <Wizard
      v-if="quizQuestion && quizQuestion.length !== 0"
      ref="wizardRef"
      :wizardData="wizardData"
      :viewFirstBackButton="true"
      :processing="isProccessing"
      @stepChanged="stepChanged"
    >
      <!-- <template
        v-for="(question, index) in quizQuestion"
        :key="index"
        v-slot:item[question]="{ item }"
      >
        {{ item[question] }}
        WHAT???
      </template> -->

      <template v-slot:firstQuestion>
        <Step :data="quizQuestion[0]" />
      </template>

      <template v-slot:secondQuestion>
        <Step :data="quizQuestion[1]" />
      </template>

      <template v-slot:thirdQuestion>
        <Step :data="quizQuestion[2]" />
      </template>

      <template v-slot:fourthQuestion>
        <Step :data="quizQuestion[3]" />
      </template>

      <template v-slot:fifthQuestion>
        <Step :data="quizQuestion[4]" />
      </template>
    </Wizard>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import eQuizSlot from "@/assets/enums/eQuizSlot";
import { useRouter } from "vue-router";
import axios from "axios";
import { getKeyByValue } from "@/utils/functions";
import Wizard from "@/components/Wizard/index.vue";
import Step from "@/router/quiz/Step.vue";

export default defineComponent({
  name: "Home",
  components: { Wizard, Step },
  enums: { eQuizSlot },
  setup() {
    const isProccessing = ref<boolean>(false);
    const wizardRef = ref<any>();
    const currentStep = ref<string>("firstQuestion");
    const quizQuestion = ref<any[]>([]);

    const router = useRouter();

    const stepProcessing = () => {
      isProccessing.value = true;
    };

    const stepChanged = (step: any) => {
      currentStep.value = step;
    };

    const goNext = async () => {
      let step;
      let goOn = false;

      switch (currentStep.value) {
        case "firstQuestion":
          step = 1;
          break;

        case "secondQuestion":
          step = 2;
          break;

        case "thirdQuestion":
          step = 3;
          break;

        case "fourthQuestion":
          step = 4;
          break;

        case "fifthQuestion":
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
        case "secondQuestion":
          step = 0;
          break;

        case "thirdQuestion":
          step = 1;
          break;

        case "fourthQuestion":
          step = 2;
          break;

        case "fifthQuestion":
          step = 3;
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
        key: "firstQuestion",
        label: "first",
        hideBackButton: true,
        hideStep: false,
        nextHandler: () => goNext(),
      },
      {
        key: "secondQuestion",
        label: "second",
        hideStep: false,
        moveToStepHandler: (step: any) => moveToStepHandler(1, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
      {
        key: "thirdQuestion",
        label: "second",
        hideStep: false,
        moveToStepHandler: (step: any) => moveToStepHandler(2, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
      {
        key: "fourthQuestion",
        label: "second",
        hideStep: false,
        moveToStepHandler: (step: any) => moveToStepHandler(3, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
      {
        key: "fifthQuestion",
        label: "third",
        hideStep: false,
        nextLabel: "what??",
        moveToStepHandler: (step: any) => moveToStepHandler(4, step),
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
