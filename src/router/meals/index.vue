<template>
  <div class="card">
    <MealsView />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MealsView from "@/views/meals/MealsView.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MealsPage",
  components: { MealsView },
  props: {},
  setup() {
    // const router = useRoute();
    // onMounted(() => {
    //   const handleRender = router.query.fromQuiz;
    //   console.log(handleRender);
    //   if (
    //     handleRender === "fromQuizResults" &&
    //     !localStorage.getItem("reloadFlag")
    //   ) {
    //     localStorage.setItem("reloadFlag", "true");
    //     window.location.reload();
    //   }
    // });

    return {};
  },
});
</script>
<style></style>
