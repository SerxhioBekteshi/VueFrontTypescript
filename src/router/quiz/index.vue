<template>
  <div>
    <div class="card">
      <Stepper
        v-if="quizQuestion.length !== 0"
        :activeStep="activeStep"
        :steps="steps"
        :actions="stepperActions"
        :title="'Fulfill the quiz to get some meals suggested'"
      >
        <div v-for="(question, index) in quizQuestion" :key="index">
          <div
            v-if="activeStep === index && activeStep !== quizQuestion.length"
          >
            <Step :data="quizQuestion[index]" />
          </div>
        </div>
        <div
          v-if="activeStep === quizQuestion.length"
          class="centered-container"
        >
          <div class="flex flex-row align-items-center gap-2 mb-3">
            <i
              class="pi pi-check"
              style="color: green; font-size: 3rem; margin-right: 2rem"
            ></i>
            <p style="font-size: 2rem">Quiz fulfilled successfully</p>
          </div>
          <div class="flex-column align-center">
            <Button
              size="small"
              severity="info"
              label="Navigate to see your suggested meals"
              @click="() => handleAfterQuizSubmission()"
            />
          </div>
        </div>
      </Stepper>
    </div>
  </div>
  <Toast />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Stepper from "../../components/Stepper.vue";
import Button from "primevue/button";
import Step from "./Step.vue";
import { useField, useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useStore } from "vuex";

export interface StepArray {
  fieldName: string;
}

export default defineComponent({
  name: "QuizLayout",
  components: { Stepper, Step, Button, Toast },
  props: {},
  setup() {
    const router = useRouter();
    const toast = useToast();
    const quizQuestion = ref<any[]>([]);
    const steps = ref<StepArray[]>([]);
    const activeStep = ref<number>(0);
    const initialValuesKey = ref<any>({});

    const store = useStore();
    const user = computed(() => store.getters.getUserInfo);

    const label = computed(() => {
      return activeStep.value === quizQuestion.value.length - 1
        ? "Submit"
        : "Next";
    });

    const handleAfterQuizSubmission = () => {
      location.reload();
      router.push("/meals");
    };

    const stepperActions = computed(() => {
      if (activeStep.value === quizQuestion.value.length) return [];
      else {
        return [
          {
            component: Button,
            props: {
              icon: "pi pi-times",
              label: "Back",
              severity: "primary",
              onclick: () => {
                if (activeStep.value !== 0)
                  activeStep.value = activeStep.value - 1;
                else {
                  toast.add({
                    life: 3000,
                    detail: "Cant go more back than this",
                    severity: "warn",
                    summary: "info",
                    group: "bl",
                  });
                }
              },
            },
          },
          {
            component: Button,
            props: {
              label: label.value,
              icon: "pi pi-check",
              severity: "info",
              type: label.value === "Submit" ? "Submit" : "Button",
              // disabled: activeStep.value === quizQuestion.value.length,
              onclick: () => {
                if (activeStep.value !== quizQuestion.value.length)
                  activeStep.value = activeStep.value + 1;
                if (activeStep.value === quizQuestion.value.length) {
                  handleSubmit(handleFormSubmit)();
                }
              },
            },
          },
        ];
      }
    });

    // const quizValidationSchema = yup.object().shape({
    //   cousine: yup.string().required("Cousine is required").label("Cousine"),
    //   dietCategory: yup
    //     .string()
    //     .required("Diet Category is required")
    //     .label("Diet Category"),
    //   intolerance: yup
    //     .string()
    //     .required("Intolerance is required")
    //     .label("Intolerance"),
    //   achievement: yup
    //     .string()
    //     .required("Health goal is required")
    //     .label("Health goal"),
    //   calories: yup.string().label("calories"),
    // });

    const { handleSubmit, resetForm, setFieldError, setErrors, setFieldValue } =
      useForm({
        // validationSchema: quizValidationSchema,
        initialValues: initialValuesKey,
      });

    const handleFormSubmit = async (data: any) => {
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
        }
      } catch (err) {
        console.log(err, "ERROR");
      }
    };
    provide("veeQuizForm", {
      handleSubmit,
      resetForm,
      setFieldError,
      setErrors,
      useField,
      setFieldValue,
    });

    const getQuiz = async () => {
      try {
        const res = await axios.get("/quiz/get-all");
        if (res && res.data) {
          res.data.sort((a: any, b: any) => a.order - b.order);
          quizQuestion.value = res.data;
          steps.value = res.data.map((question: any) => ({
            fieldName: question.fieldName,
          }));
          res.data.forEach((obj: any) => {
            const fieldName = obj.fieldName;
            initialValuesKey.value[fieldName] = "";
          });
        }
      } catch (err: any) {
        console.log(err, "ERR");
      }
    };

    onMounted(() => {
      getQuiz();
    });

    // router.beforeRouteLeave((to, from, next) => {
    //   if (to.path !== "/meals" && activeStep.value === quizQuestion.value.length) {
    //     next(false); // Prevent route change
    //   } else {
    //     next(); // Allow route change
    //   }
    // });

    return {
      activeStep,
      stepperActions,
      quizQuestion,
      router,
      steps,
      user,
      handleAfterQuizSubmission,
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
