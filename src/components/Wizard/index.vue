<template>
  <div class="vue-wizard">
    <WizardSteps
      :wizard-data="wizardData"
      :step="step"
      :processing="processing"
      position="top"
      @moveToStep="moveToStep"
    ></WizardSteps>

    <div class="wizard-body-container">
      <!-- <LoadingMask :show="processing" /> -->

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

      <WizardButtons
        :wizard-data="wizardData"
        :step="step"
        :step-index="stepIndex"
        :processing="processing"
        :view-first-back-button="viewFirstBackButton"
        @additional-clicked="
          (handler) => {
            $emit('additional-clicked', handler);
          }
        "
        @back-clicked="backClicked"
        @next-clicked="nextClicked"
      ></WizardButtons>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from "vue";
import WizardButtons from "@/components/Wizard/WizardButtons.vue";
import WizardSteps from "@/components/Wizard/WizardSteps.vue";

interface Step {
  key: string;
  label: string;
  moveToStepHandler?: (step: number) => Promise<void>;
  backHandler?: () => Promise<void>;
  nextHandler?: () => Promise<void>;
}

export default defineComponent({
  name: "Wizard",
  components: {
    WizardButtons,
    WizardSteps,
  },
  props: {
    wizardData: { type: Array as PropType<Step[]>, default: () => [] },
    processing: { type: Boolean, default: false },
    viewFirstBackButton: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const stepIndex = ref(0);

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

    const goToStep = (step: number) => {
      stepIndex.value = step;
    };

    const goFirst = () => {
      stepIndex.value = 0;
    };

    const goLast = () => {
      stepIndex.value = props.wizardData.length - 1;
    };

    const moveToStep = async (step: number) => {
      if (props.wizardData[step].moveToStepHandler) {
        await props.wizardData[step].moveToStepHandler(step);
      }
    };

    const backClicked = async () => {
      if (props.wizardData[stepIndex.value].backHandler) {
        await props.wizardData[stepIndex.value].backHandler();
      } else {
        goBack();
      }
    };

    const nextClicked = async () => {
      if (props.wizardData[stepIndex.value].nextHandler) {
        await props.wizardData[stepIndex.value].nextHandler();
      } else {
        goNext();
      }
    };

    const step: any = computed(() => props.wizardData[stepIndex.value]);

    const stepKey = computed(() => {
      emit("stepChanged", props.wizardData[stepIndex.value].key);
      return props.wizardData[stepIndex.value].key;
    });
    const stepsNumber = computed(() => props.wizardData.length);

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

    const performSlotsCheck = () => {
      const missingSlots = [];
      const keys = props.wizardData.filter((x) => x.key).map((x) => x.key);

      keys.forEach((key) => {
        if (!$scopedSlots[key]) {
          missingSlots.push(key);
        }
      });

      if (missingSlots.length) {
        alert(`Missing slots:\n\n${JSON.stringify(missingSlots)}`);
      }
    };

    onMounted(() => {
      performWizardCheck();
      performSlotsCheck();
    });

    return {
      stepIndex,
      step,
      stepKey,
      stepsNumber,
      moveToStep,
      backClicked,
      nextClicked,
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
