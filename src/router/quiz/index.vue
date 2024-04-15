<template>
  <div class="card">Home</div>

  <div class="card">
    <!-- <div v-if="isProccessing"> -->
    <Stepper
      v-if="quizQuestion && quizQuestion.length !== 0"
      :activeStep="currentStep"
    >
      <StepperPanel
        v-for="(question, index) in quizQuestion"
        :key="index"
        :header="question.question"
      >
        <template #content="{}">
          <Step :data="quizQuestion[index]" />
          <div class="flex pt-4 justify-content-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              :disabled="currentStep === 0"
              @click="previousStep"
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              :disabled="currentStep === quizQuestion.length"
              @click="nextStep"
            />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
    <Toast />
  </div>
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
// import Wizard from "@/components/Wizard/index.vue";
import { getKeyByValue } from "@/utils/functions";
import { useAbility } from "@casl/vue";
import { defineAbilityFor } from "@/initializers/ability";
import AuthManager from "@/utils/authManager";
import { eMutationTypes } from "@/assets/enums/eMutationTypes";
import { IQuizQuestion } from "@/interfaces/other/IQuizQuestion";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";
export interface StepArray {
  fieldName: string;
}

export default defineComponent({
  name: "QuizLayout",
  components: { StepperPanel, Stepper, Step, Toast },
  enums: { eQuizSlot },
  props: {},
  setup() {
    const isProccessing = ref<boolean>(false);
    const currentStep = ref<number>(0);
    const quizQuestion = ref<IQuizQuestion[]>([]);

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
    };

    const nextStep = async () => {
      if (currentStep.value === 4) {
        await handleSubmit(handleFormSubmit)();
      }
      if (currentStep.value < quizQuestion.value.length - 1) {
        currentStep.value++;
      }
    };
    const previousStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
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
          router.push({
            path: "/meals",
          });
        }
      } catch (err) {
        console.log(err, "Error in quiz results post");
        isProccessing.value = false;
      }
    };

    const getQuiz = async () => {
      try {
        isProccessing.value = true;
        const res = await axios.get("/quiz/get-all");
        if (res && res.data) {
          res.data.sort((a: any, b: any) => a.order - b.order);
          quizQuestion.value = res.data;
          isProccessing.value = false;
          console.log(res.data);
          console.log(isProccessing.value, "WHAT?");
        }
      } catch (err: any) {
        console.log(err, "ERR");
        isProccessing.value = false;
      }
    };

    onMounted(() => {
      getQuiz();
    });

    return {
      router,
      isProccessing,
      eQuizSlot,
      quizQuestion,
      getKeyByValue,
      currentStep,
      nextStep,
      previousStep,
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
