<template>
  <div class="wizard-steps__steps-container">
    <div
      class="wizard-steps__step_icon"
      :class="pointerClassIcon(step, 'back')"
      @click="!processing ? backClicked() : null"
    >
      <i class="fa fa-fw fa-chevron-left" aria-hidden="true"></i>
    </div>

    <div class="wizard-steps__steps">
      <template v-for="(stepData, index) in visibleSteps">
        <div
          class="wizard-steps__step_item"
          :class="pointerClassItem(step, index)"
          :key="`step_${stepData.key}`"
          @click="clickStep(getStepIndex(step), index, stepData)"
        >
          <div
            class="wizard-steps__step_round"
            :class="classStatus(step, index, stepData)"
          >
            <template v-if="getStepIndex(step) > index">
              <i class="fa fa-fw fa-check" aria-hidden="true"></i>
            </template>
            <template v-else>
              {{ index + 1 }}
            </template>
          </div>
        </div>

        <div
          class="wizard-steps__step_label text-wrap"
          :class="pointerClassItem(step, index)"
          @click="clickStep(getStepIndex(step), index, stepData)"
          :key="`step_label_${stepData.key}`"
        >
          {{ stepData.label }}
        </div>

        <div
          v-if="index < visibleSteps.length - 1"
          :key="`step_seperator_${stepData.key}`"
          class="wizard-steps__step_separator"
          :class="classStatus(step, index, stepData)"
        ></div>
      </template>
    </div>

    <div
      class="wizard-steps__step_icon"
      :class="pointerClassIcon(step, 'next')"
      @click="!processing ? nextClicked() : null"
    >
      <i class="fa fa-fw fa-chevron-right" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  defineComponent,
  PropType,
} from "vue";

export interface IStep {
  key: string;
  label: string;
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
    const visibleSteps = computed(() => {
      if (!props.wizardData) return [];
      return props.wizardData.filter(
        (x) => x.hideStep === "undefined" || !x.hideStep
      );
    });

    const getStepIndex = (step: IStep) => {
      return visibleSteps.value.findIndex((obj) => obj.key === step.key);
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

    const clickStep = async (
      actualIndex: number,
      nextIndex: number,
      step: IStep
    ) => {
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
      visibleSteps,
    };
  },
});
</script>

<style scoped lang="scss">
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
    width: 80%;
    display: flex;
    justify-content: center;
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
        border: 2px solid #676767;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;

        &.active {
          background-color: var(--main-color);
          border: 2px solid var(--main-color);
          color: white;
        }
        &.done {
          border: 2px solid var(--main-color);
          color: var(--main-color);
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
        border: 1px solid var(--main-color);
      }
    }

    .wizard-steps__step_label {
      flex-shrink: 1;
      max-width: 100px;
      font-weight: 600;

      &.clickable:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
