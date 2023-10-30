<template>
  <div>
    <Rating v-model="rate" :readonly="!shouldRate" :cancel="false" />
    <Toast />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Rating from "primevue/rating";
import { defineComponent, ref, watch } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "InputSelect",
  components: { Rating, Toast },
  props: {
    rateId: { type: Number },
    rateValue: { type: Number },
    shouldRate: { type: Boolean },
    controller: { type: String },
  },
  setup(props) {
    const rate = ref<any>(props.rateValue);
    const toast = useToast();
    const handleRateCall = async () => {
      try {
        const res: any = await axios.put(
          `${props.controller}/${props.rateId}`,
          { rating: rate.value }
        );
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
        }
      } catch (err) {
        console.log(err, "ERR");
      }
    };

    watch([rate], () => {
      handleRateCall();
    });

    return { rate };
  },
});
</script>
<style scoped></style>
