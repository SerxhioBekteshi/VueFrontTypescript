<template>
  <div class="vue-wizard card" style="height: 400px; position: relative">
    <WizardSteps
      :wizardData="wizardData"
      :step="step"
      :processing="processing"
      position="top"
      @moveToStep="moveToStep"
    ></WizardSteps>

    <div class="wizard-body-container">
      <ProgressSpinner v-if="processing" />

      <div
        v-for="stepData in wizardData"
        :key="`body_step_${stepData.key}`"
        class="wizard-body-container__step"
        :class="{
          hidden: stepKey !== stepData.key,
          blurred: processing,
        }"
      >
        <slot :name="stepData.key"></slot>
      </div>
    </div>

    <div
      :style="{
        position: 'absolute',
        bottom: '0',
        padding: '1rem',
        marginTop: isMobile ? '2rem' : '',
      }"
    >
      <WizardButtons
        :wizardData="wizardData"
        :step="step"
        :stepIndex="stepIndex"
        :processing="processing"
        :viewFirstBackButton="viewFirstBackButton"
        @additionalClicked="
          (handler: any) => {
            $emit('additional-clicked', handler);
          }
        "
        @backClicked="backClicked"
        @nextClicked="nextClicked"
      ></WizardButtons>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from "vue";
import WizardButtons from "./WizardButtons.vue";
import WizardSteps from "./WizardSteps.vue";
import ProgressSpinner from "primevue/progressspinner";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface Step {
  key: string;
  label: string;
  hideStep?: boolean;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  moveToStepHandler?: (step: number) => Promise<void>;
  backHandler?: () => Promise<void>;
  nextHandler?: () => Promise<void>;
}

export default defineComponent({
  name: "Wizard",
  components: {
    WizardButtons,
    WizardSteps,
    ProgressSpinner,
  },
  emits: ["stepChanged", "additional-clicked"],
  props: {
    wizardData: { type: Array as PropType<Step[]> | any, default: () => [] },
    processing: { type: Boolean, default: false },
    viewFirstBackButton: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const stepIndex = ref(0);
    const isMobile = useDeviceDetect();

    const goBack = () => {
      if (stepIndex.value - 1 >= 0) {
        stepIndex.value--;
      }
    };

    const goNext = () => {
      if (stepIndex.value + 1 < props.wizardData.length) {
        stepIndex.value++;
      }
    };

    const step = computed<Step>(() => {
      return props.wizardData[stepIndex.value];
    });

    const stepKey = computed(() => {
      emit("stepChanged", props.wizardData[stepIndex.value].key);
      return props.wizardData[stepIndex.value].key;
    });

    const stepsNumber = computed(() => props.wizardData.length);

    const goToStep = (step: number) => {
      stepIndex.value = step;
    };

    const goFirst = () => {
      stepIndex.value = 0;
    };

    const goLast = () => {
      stepIndex.value = props.wizardData.length - 1;
    };

    const moveToStep = async (stepIndex: number) => {
      const stepToMove = props.wizardData[stepIndex];
      if (stepToMove.moveToStepHandler) {
        await stepToMove.moveToStepHandler(stepIndex);
      }
    };

    const backClicked = async () => {
      const currentStep = step.value;
      if (currentStep.backHandler) {
        await currentStep.backHandler();
      } else {
        goBack();
      }
    };

    const nextClicked = async () => {
      const currentStep = step.value;
      if (currentStep.nextHandler) {
        await currentStep.nextHandler();
      } else {
        goNext();
      }
    };

    const performWizardCheck = () => {
      if (!props.wizardData || props.wizardData.length === 0) {
        alert("wizardData list missing");
        return null;
      }

      for (let i = 0; i < props.wizardData.length; i++) {
        const step = props.wizardData[i];

        if (!step.key) {
          alert(`Missing key\n\n${JSON.stringify(step)}`);
          return null;
        }

        if (!step.label) {
          alert(`Missing label\n\n${JSON.stringify(step)}`);
          return null;
        }
      }
    };

    // const performSlotsCheck = () => {
    //   const missingSlots = [];
    //   const keys = props.wizardData.filter((x) => x.key).map((x) => x.key);

    //   keys.forEach((key) => {
    //     if (!$scopedSlots[key]) {
    //       missingSlots.push(key);
    //     }
    //   });

    //   if (missingSlots.length) {
    //     alert(`Missing slots:\n\n${JSON.stringify(missingSlots)}`);
    //   }
    // };

    onMounted(() => {
      performWizardCheck();
      // performSlotsCheck();
    });

    return {
      stepIndex,
      step,
      stepKey,
      stepsNumber,
      isMobile,
      goNext,
      goBack,
      moveToStep,
      backClicked,
      nextClicked,
      goToStep,
      goFirst,
      goLast,
    };
  },
});
</script>

<style scoped lang="scss">
.vue-wizard {
  table.wizard.wizard-steps {
    table-layout: fixed;
    width: 100%;
  }
  table.wizard.wizard-steps td {
    padding: 15px;
    border: 1px solid #ffffff;
  }
  table.wizard.wizard-buttons {
    table-layout: fixed;
    width: 100%;
    margin-top: 15px;
  }

  .wizard-body-container {
    position: relative;
    padding: 20px;

    > .wizard-body-container__step {
      &.blurred {
        filter: blur(2px);
      }
    }
  }
}
</style>
