<template>
  <div>
    <div class="card">
      <Stepper />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import Stepper from "../../components/Stepper.vue";

export default defineComponent({
  name: "QuizLayout",
  components: { Stepper },
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const quizQuestion = ref<any[]>([]);

    const getQuiz = async () => {
      try {
        const res = await axios.get("/quiz/get-all");
        if (res && res.data) {
          res.data.sort((a: any, b: any) => a.order - b.order);
          console.log(res.data);
          quizQuestion.value = res.data;
        }
      } catch (err: any) {
        console.log(err, "ERR");
      }
    };

    onMounted(() => {
      // router.push({ name: "PersonalDemo" });
      // getQuiz();
    });

    return {};
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
</style>
