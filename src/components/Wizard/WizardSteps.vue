<template>
  <div class="wizard-steps__steps-container">
    <div
      v-if="!isMobile"
      class="wizard-steps__step_icon"
      :class="pointerClassIcon(step, 'back')"
      @click="!processing ? backClicked() : null"
    >
      <i
        class="pi pi-arrow-left"
        style="font-size: 1rem"
        aria-hidden="true"
      ></i>
    </div>

    <div
      class="wizard-steps__steps"
      :style="{ width: isMobile ? '100%' : '80%' }"
    >
      <div v-for="(stepData, index) in visibleSteps" :key="index">
        <div
          class="wizard-steps__step_item"
          :class="pointerClassItem(step, index)"
          @click="clickStep(getStepIndex(step), index)"
          :key="`step_${stepData.key}`"
        >
          <div
            class="wizard-steps__step_round"
            :class="classStatus(step, index, stepData)"
          >
            <div v-if="getStepIndex(step) > index">
              <i
                class="pi pi-check"
                style="font-size: 1rem"
                aria-hidden="true"
              ></i>
            </div>
            <div v-else>
              {{ index + 1 }}
            </div>
          </div>
        </div>

        <!-- <div
          class="wizard-steps__step_label"
          :class="pointerClassItem(step, index)"
          @click="clickStep(getStepIndex(step), index)"
          :key="`step_label_${stepData.key}`"
        >
          {{ stepData.label }}
        </div>

        <div
          v-if="index < visibleSteps.length - 1"
          :key="`step_seperator_${stepData.key}`"
          class="wizard-steps__step_separator"
          :class="classStatus(step, index, stepData)"
        ></div> -->
      </div>
    </div>

    <div
      v-if="!isMobile"
      class="wizard-steps__step_icon"
      :class="pointerClassIcon(step, 'next')"
      @click="!processing ? nextClicked() : null"
    >
      <i
        class="pi pi-arrow-right"
        style="font-size: 1rem"
        aria-hidden="true"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import useDeviceDetect from "@/hooks/useDeviceDetect";
interface IStep {
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
  name: "WizardSteps",
  components: {},
  props: {
    wizardData: { type: Array as PropType<IStep[]>, required: true },
    step: { type: Object as PropType<IStep>, required: true },
    processing: { type: Boolean, required: true },
  },
  emits: ["moveToStep"],
  setup(props, { emit }) {
    const isMobile = useDeviceDetect();
    const visibleSteps = computed(() => {
      if (!props.wizardData) return [];
      return props.wizardData.filter((x: any) => !x.hideStep);
    });

    const getStepIndex = (step: IStep) => {
      return visibleSteps.value.findIndex((obj: any) => obj.key === step.key);
    };

    const pointerClassIcon = (step: IStep, direction: string) => {
      if (!props.processing) {
        if (direction === "back" && step.key > visibleSteps.value[0].key)
          return "clickable";
        if (
          direction === "next" &&
          step.key !== visibleSteps.value[visibleSteps.value.length - 1].key
        )
          return "clickable";

        return "disabled";
      }
    };

    const pointerClassItem = (step: IStep, index: number) => {
      const actualIndex = getStepIndex(step);
      if (canClickStep(actualIndex, index)) return "clickable";
    };

    const classStatus = (step: IStep, index: number, stepData: IStep) => {
      if (getStepIndex(step) > index) return "done";
      if (step.key === stepData.key) return "active";
    };

    const backClicked = async () => {
      if (props.step.key === visibleSteps.value[0].key) return;
      await props.step.backHandler?.();
    };

    const nextClicked = async () => {
      if (
        props.step.key === visibleSteps.value[visibleSteps.value.length - 1].key
      )
        return;
      await props.step.nextHandler?.();
    };

    const canClickStep = (actualIndex: number, nextIndex: number) => {
      return actualIndex > nextIndex;
    };

    const clickStep = async (actualIndex: number, nextIndex: number) => {
      if (!canClickStep(actualIndex, nextIndex)) return;
      emit("moveToStep", nextIndex);
    };

    return {
      clickStep,
      nextClicked,
      backClicked,
      pointerClassIcon,
      pointerClassItem,
      classStatus,
      getStepIndex,
      visibleSteps,
      isMobile,
    };
  },
});
</script>

<style lang="scss">
.wizard-steps__steps-container {
  display: flex;
  justify-content: space-between;
  border: 1px solid #e3e3e3;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 25px 20px;
  margin-bottom: 30px;

  .wizard-steps__step_icon {
    display: flex;
    align-items: center;
    justify-content: center;

    color: #676767;

    &.clickable:hover {
      cursor: pointer;
    }
    &.disabled:hover {
      cursor: not-allowed;
    }
  }

  .wizard-steps__steps {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    color: #676767;

    .wizard-steps__step_item {
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: center;

      &.clickable:hover {
        cursor: pointer;
      }

      .wizard-steps__step_round {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        border: 2px solid var(--primary-color);
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;

        &.active {
          background-color: var(--indigo-200);
          border: 2px solid var(--purple-400);
          color: white;
        }
        &.done {
          border: 2px solid var(--purple-400);
          color: var(--red-800);
        }
      }
    }

    .wizard-steps__step_separator {
      border: 1px solid #676767;
      flex: 1;
      flex-grow: 1;
      margin-right: 4px;
      margin-left: 4px;
      height: 1px;

      &.done {
        border: 1px solid pink;
      }
    }

    .wizard-steps__step_label {
      flex-shrink: 1;
      max-width: 100px;
      font-weight: 600;
      text-wrap: wrap;

      &.clickable:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
