<template>
  <table
    class="wizard wizard-buttons"
    :class="{
      blurred: processing,
    }"
  >
    <tr>
      <td
        v-if="(viewFirstBackButton || stepIndex !== 0) && !step.hideBackButton"
      >
        <div class="text-left no_padding">
          <Button :disabled="processing" @click.prevent="$emit('back-clicked')">
            <i class="glyphicon glyphicon-chevron-left"></i>

            <span v-if="step.backLabel" v-html="step.backLabel"></span>
            <span v-else>
              Back
              <!-- {{ $t("wizards.back") }} -->
            </span>
          </Button>
          <Button
            v-for="abb in step.additionalBackButtons"
            :key="abb.key"
            class="btn btn-secondary fs_13 mleft_5"
            :disabled="processing"
            @click.prevent="$emit('additional-clicked', abb.handler)"
          >
            <i class="glyphicon glyphicon-chevron-left"></i>
            <span>
              {{ abb.label }}
              <!-- {{ $t(abb.label) }} -->
            </span>
          </Button>
        </div>
      </td>

      <td v-if="!step.hideNextButton">
        <div class="text-right no_padding">
          <Button
            v-for="anb in step.additionalNextButtons"
            :key="anb.key"
            class="btn btn-secondary fs_13 mright_5"
            :disabled="processing || disableNextButton"
            @click.prevent="$emit('additional-clicked', anb.handler)"
          >
            <span>
              {{ anb.label }}
              <!-- {{ $t(anb.label) }} -->
            </span>
            <i class="glyphicon glyphicon-chevron-right"></i>
          </Button>
          <Button
            class="btn btn-secondary fs_13"
            :disabled="processing || disableNextButton"
            @click.prevent="$emit('next-clicked')"
          >
            <span v-if="step.nextLabel" v-html="step.nextLabel"></span>
            <span v-else>
              next
              <!-- {{ $t("wizards.next") }} -->
            </span>
            <i class="glyphicon glyphicon-chevron-right"></i>
          </Button>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import Button from "primevue/button";
import { PropType, defineComponent } from "vue";

export interface IStep {
  key: string;
  backLabel?: string;
  nextLabel?: string;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  additionalBackButtons?: { key: string; label: string; handler: () => void }[];
  additionalNextButtons?: { key: string; label: string; handler: () => void }[];
}

export default defineComponent({
  name: "WizardButtons",
  components: { Button },
  props: {
    wizardData: { type: Array as PropType<any[]>, default: () => [] },
    step: { type: Object as PropType<IStep>, required: true },
    stepIndex: { type: Number, required: true },
    processing: { type: Boolean, required: true },
    viewFirstBackButton: { type: Boolean, required: true },
    disableNextButton: { type: Boolean, default: false },
  },
  emits: ["back-clicked", "additional-clicked", "next-clicked"],
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
table.wizard.wizard-buttons {
  table-layout: fixed;
  width: 100%;
  margin-top: 15px;

  &.blurred {
    filter: blur(2px);
  }
}
</style>
