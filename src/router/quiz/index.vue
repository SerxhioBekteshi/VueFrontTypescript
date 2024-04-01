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

  <Toast />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Step from "@/components/Step.vue";
import { useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useStore } from "vuex";
import eQuizSlot from "@/assets/enums/eQuizSlot";
import Wizard from "@/components/Wizard/index.vue";
import { getKeyByValue } from "@/utils/functions";
import { useAbility } from "@casl/vue";
import { defineAbilityFor } from "@/initializers/ability";
import AuthManager from "@/utils/authManager";
import { eMutationTypes } from "@/assets/enums/eMutationTypes";

export interface StepArray {
  fieldName: string;
}

export default defineComponent({
  name: "QuizLayout",
  components: { Wizard, Step, Toast },
  enums: { eQuizSlot },
  props: {},
  setup() {
    const isProccessing = ref<boolean>(false);
    const wizardRef = ref<any>();
    const currentStep = ref<string>("firstQuestion");
    const quizQuestion = ref<any[]>([]);
    const toast = useToast();
    const router = useRouter();
    const { handleSubmit } = useForm();
    const ability = useAbility();
    const store = useStore();

    const handleAfterQuizSubmissionAftermath = async () => {
      const currentUser: any = await AuthManager.getUserData();
      store.commit(eMutationTypes.SET_USER, currentUser);
      const updatedAbility = await defineAbilityFor();
      ability.update(updatedAbility.rules);
      console.log(updatedAbility.rules, "UPDATED ");
    };

    const handleFormSubmit = async (data: any) => {
      isProccessing.value = true;
      try {
        const res: any = await axios.post("/quizResult", {
          quizResult: data,
        });
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          isProccessing.value = false;
          await handleAfterQuizSubmissionAftermath();
          // const updatedAbility = await defineAbilityFor();
          // console.log(
          //   updatedAbility.rules,
          //   "DO MARR VETEM READ LAYOUT QUIZ SHIFE"
          // );
          // ability.update(updatedAbility.rules);
          router.push({
            path: "/meals",
          });
        }
      } catch (err) {
        console.log(err, "Error in quiz results post");
        isProccessing.value = false;
      }
    };

    const stepChanged = (step: any) => {
      currentStep.value = step;
    };

    const goNext = async () => {
      let step;
      // let goOn = false;

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
          handleSubmit(handleFormSubmit)();
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
      }

      if (newStep === 1) {
        // this.$refs.stepSecond.init()
        // this.$refs.createWizard.goToStep(newStep)
        if (wizardRef.value) {
          wizardRef.value.goToStep(newStep);
        }
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
        label: "third",
        hideStep: false,
        moveToStepHandler: (step: any) => moveToStepHandler(2, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
      {
        key: "fourthQuestion",
        label: "fourth",
        hideStep: false,
        moveToStepHandler: (step: any) => moveToStepHandler(3, step),
        backHandler: () => goBack(),
        nextHandler: () => goNext(),
      },
      {
        key: "fifthQuestion",
        label: "fifth",
        hideStep: false,
        nextLabel: "Submit results",
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
        }
      } catch (err: any) {
        console.log(err, "ERR");
      }
    };

    onMounted(() => {
      getQuiz();
    });

    //this will be since i might be coming from the login with token page confirmation
    //get the user permissions
    // onMounted(() => {

    // })

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
<style scoped>
::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}

.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
