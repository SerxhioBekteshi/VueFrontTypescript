<template>
  <div style="padding: 1rem">
    <h1>Frequently Asked Questions</h1>
    <Accordion
      :multiple="true"
      :expand-icon="'pi pi-chevron-down'"
      :collapse-icon="'pi pi-chevron-up'"
    >
      <AccordionTab
        v-for="(faq, index) in faqData"
        :key="index"
        :header="faq.question"
      >
        {{ faq.answer }}
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script lang="ts">
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "FaqSection",
  components: {
    Accordion,
    AccordionTab,
  },
  setup() {
    const faqData = ref([
      {
        question: "How can a diet app help me?",
        answer:
          "A diet app can help you track your food intake, count calories, set goals, and provide you with personalized meal plans and recipes to help you achieve your desired weight and improve your overall health.",
      },
      {
        question: "Is it safe to use diet apps?",
        answer:
          "Yes, most diet apps are safe to use as long as you choose a reputable one and follow evidence-based recommendations. However, it's always a good idea to consult with a healthcare professional before starting any new diet or exercise program.",
      },
      {
        question: "Can a diet app replace professional advice?",
        answer:
          "While diet apps can be useful tools for managing your diet and nutrition, they should not replace personalized advice from a qualified healthcare professional, especially if you have specific health concerns or medical conditions.",
      },
      {
        question: "Which diet app do you recommend?",
        answer:
          "There are many great diet apps available, each with its own unique features and benefits. Some popular options include MyFitnessPal, Lose It!, and Lifesum. It's important to choose a diet app that aligns with your goals, preferences, and lifestyle.",
      },
    ]);

    return {
      faqData,
    };
  },
});
</script>

<style scoped></style>
