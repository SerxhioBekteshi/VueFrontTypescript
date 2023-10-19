<template>
  <div>
    <div class="card">
      <Stepper
        v-if="quizQuestion.length !== 0 || quizQuestion !== null"
        :activeStep="activeStep"
        :steps="steps"
        :actions="stepperActions"
        :title="'Fulfill the quiz to get some meals suggested'"
      >
        <div v-for="index in quizQuestion" :key="index">
          <div v-if="activeStep === index">
            <Step :data="quizQuestion[index]" />
          </div>

          <div
            v-if="activeStep === quizQuestion.length"
            class="centered-container"
          >
            <div class="flex flex-row align-items-center gap-2 mb-3">
              <i class="pi pi-times" style="color: green"></i>
              <p>Quiz fulfilled successfully</p>
            </div>
            <div class="flex-column align-center">
              <Button
                size="small"
                severity="info"
                label="Meals"
                @click="() => router.push('/payments')"
              />
            </div>
          </div>
        </div>
      </Stepper>
    </div>
  </div>
  <Toast />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  shallowRef,
  watch,
} from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import Stepper from "../../components/Stepper.vue";
import Button from "primevue/button";
import Step from "../other/Step.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Toast from "primevue/toast";

export interface StepArray {
  fieldName: string; // You can adjust the type as needed
}

export default defineComponent({
  name: "QuizLayout",
  components: { Stepper, Step, Button },
  props: {},
  setup() {
    const router = useRouter();
    const toast = useToast();
    const quizQuestion = ref<any[]>([]);
    const steps = ref<StepArray[]>([]);
    const activeStep = ref<number>(0);
    const label = computed(() => {
      return activeStep.value === quizQuestion.value.length - 1
        ? "Submit"
        : "Next";
    });
    const stepperActions = computed(() => {
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
            label: label.value, // Use the computed label here
            icon: "pi pi-check",
            severity: "info",
            // disabled: activeStep.value === quizQuestion.value.length,
            onclick: () => {
              if (activeStep.value !== quizQuestion.value.length)
                activeStep.value = activeStep.value + 1;
            },
          },
        },
      ];
    });

    const quizValidationSchema = yup.object().shape({
      cousine: yup.string().required("Cousine is required").label("Cousine"),
      dietCategory: yup
        .string()
        .required("Diet Category is required")
        .label("Diet Category"),
      intolerance: yup
        .string()
        .required("Intolerance is required")
        .label("Intolerance"),
      achievement: yup
        .string()
        .required("Health goal is required")
        .label("Health goal"),
      calories: yup.string().label("calories"),
    });

    const { handleSubmit, resetForm, setFieldError, setErrors } = useForm({
      validationSchema: quizValidationSchema,
    });

    provide("veeQuizForm", {
      handleSubmit,
      resetForm,
      setFieldError,
      setErrors,
      useField,
    });

    const getQuiz = async () => {
      try {
        const res = await axios.get("/quiz/get-all");
        if (res && res.data) {
          res.data.sort((a: any, b: any) => a.order - b.order);
          console.log(res.data);
          quizQuestion.value = res.data;
          steps.value = res.data.map((question: any) => ({
            fieldName: question.fieldName,
          }));
        }
      } catch (err: any) {
        console.log(err, "ERR");
      }
    };

    watch(activeStep, (newVal, oldVal) => {
      // This function will be called when myVariable changes.
      console.log("myVariable has changed. New value: " + newVal);
      console.log("Old value: " + oldVal);
      // You can perform custom logic here.
    });

    onMounted(() => {
      getQuiz();
    });

    return { activeStep, stepperActions, quizQuestion, router, steps };
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
