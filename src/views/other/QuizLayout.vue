<template>
  <div class="card">
    <div v-if="quizQuestion.length > 0">
      <Steps
        :model="quizQuestion"
        aria-label="Form Steps"
        :readonly="false"
        :pt="{
          menuitem: () => ({
            class: 'p-highlight p-steps-current',
          }),
        }"
      >
        <template #item="{ item }">
          <div>
            <div class="circle">
              <span class="number"> {{ item.order + 1 }} </span>
            </div>
          </div>

          <!-- <router-link
          v-if="item.question"
          v-slot="routerProps"
          :to="item.question"
          custom
        >
          <a
            :href="routerProps.href"
            @click="($event) => routerProps.navigate($event)"
            @keydown.enter="($event) => routerProps.navigate($event)"
          >
            <span v-bind="props.step">{{ index + 1 }}</span>
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </router-link> -->
        </template>
      </Steps>
      <div class="card container mt-5 flex align-items-center">
        <div>CONTENT</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Steps from "primevue/steps";
import axios from "axios";

export default defineComponent({
  name: "QuizLayout",
  components: { Steps },
  props: {},
  setup() {
    const router = useRouter();
    const toast = useToast();
    const quizQuestion = ref<any>([]);

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
      getQuiz();
    });

    return { quizQuestion };
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

.circle {
  width: 25px;
  height: 25px;
  background-color: #3498db;
  border-radius: 50%; /* Creates a circle */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
}
.number {
  font-weight: bold;
}
</style>
