<template>
  <div class="wrapper">
    <div class="rpHeaderContainer">
      <div v-for="(step, i) in steps" :key="i">
        <div class="circle">{{ i + 1 }}</div>
      </div>
    </div>

    <div class="container">
      //here it will be the children slot
      <!-- <div v-if="activeIndex === 0"></div>
      <div v-else>stepps here</div> -->
      <div class="panel_add_footer">
        <div>
          <Button @click="() => setActiveIndex(activeIndex + 1)">Back</Button>
        </div>
        <div>
          <Button @click="() => setActiveIndex(activeIndex - 1)">Next</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import { ref, onMounted, defineComponent } from "vue";

export default defineComponent({
  name: "StepperComponent",
  components: { Button },
  props: {
    steps: { type: Number, required: true, default: 3 },
    selectedVal: { type: Object, required: false },
    onSubmitData: { type: Function, required: false },
  },
  setup() {
    const allCities = ref(null);

    const activeIndex = ref(0);

    const setActiveIndex = (index: number) => {
      activeIndex.value = index;
    };

    const resetForm = () => {
      // Reset the form here
    };

    const onSubmit = (event: any) => {
      event.preventDefault();
    };

    onMounted(() => {
      // axios.get(`/cities`).then((data) => {
      //   allCities.value = data.data;
      // });
    });

    return {
      allCities,
      activeIndex,
      setActiveIndex,
      resetForm,
      onSubmit,
    };
  },
});
</script>
<style scoped>
.balance_div {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  flex-direction: row;
}
.balanceContainer {
  display: flex;
  flex-direction: row;
}

.withdrway_btn {
  background-color: var(--font-h1-primary-comor);
  padding: 6px;
  color: #f1faee;
  border-radius: 10px;
}

.addNewButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.circle {
  width: 25px;
  height: 25px;
  background-color: #3498db; /* Blue color, you can change it to your preferred color */
  border-radius: 50%; /* Makes it a circle */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* Text color */
  font-size: 14px;
}

.form-column {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.form-columnFooter {
  display: flex;
  flex: 1;
  width: 100%;
}
.form-group {
  flex: 1;
  padding: 0 10px;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
}

input[type="text"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="tel"]:focus,
textarea:focus {
  border-color: #007bff;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  color: #ff0000;
  margin-top: 5px;
}
/* .wrapper {
  min-height: 100vh;
  position: relative;
} */
.form-container {
  padding: 3rem;
  display: flex;
  flex-direction: column;
}
.mainImageCointainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}

.imageCointainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}

.panel_add_footer {
  left: 0;
  padding: 16px;
  display: flex;
  bottom: 0px;
  width: 100%;
  justify-content: space-between;
}

.rpHeaderContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 2rem;
  margin-top: 1rem;
  background-color: red;
}
</style>
