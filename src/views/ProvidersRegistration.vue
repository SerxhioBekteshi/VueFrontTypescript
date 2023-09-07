<template>
  <div class="card">
    <Message :closable="false"
      >Press the button in order to submit the account for the provider</Message
    >

    <PickList
      v-model="generalDataAccounts"
      listStyle="height: fit-content"
      dataKey="id"
      :stripedRows="true"
      :showTargetControls="false"
      :showSourceControls="false"
      @move-to-target="handleMoveToTarget"
    >
      <!--  :class="{ 'p-disabled': JSON.parse(JSON.stringify(generalDataAccounts))[0].length === 0 }" -->
      <template #sourceheader> Unsubmitted accounts </template>
      <template #targetheader> Submitted accounts </template>
      <template #item="slotProps">
        <div class="flex flex-wrap p-2 align-items-center gap-3">
          <div class="flex-1 flex flex-column gap-2">
            <span class="font-bold">{{ slotProps.item.name }}</span>
            <div class="flex align-items-center gap-2">
              <span>{{ slotProps.item.email }}</span>
            </div>
          </div>
          <i class="pi pi-times" style="color: red"></i>
        </div>
      </template>
    </PickList>
  </div>
</template>

<script lang="ts">
import PickList from "primevue/picklist";
import Message from "primevue/message";

import axios from "axios";
import { defineComponent, DirectiveBinding } from "vue";

export default defineComponent({
  name: "ProvidersRegistration",
  components: { PickList, Message },
  data() {
    return {
      generalDataAccounts: [] as object[][],
    };
  },
  methods: {
    async fetchSubmittedAndNotProviders() {
      const res = await axios.get("/providers/get-all");
      if (res) {
        this.generalDataAccounts = [
          res.data.providersNotSubmitted,
          res.data.providersSubmitted,
        ];
      }
    },
    async handleMoveToTarget(event: { items: HTMLElement[] }) {
      const res = await axios.put(
        `providers/submitAccount/${
          JSON.parse(JSON.stringify(event.items))[0].id
        }`
      );
      if (res.data) {
        // this.$toast.open({
        //     message: res.data.message,
        //     type: "success",
        //     position: "top-right"
        // });
      }
    },
  },
  async mounted() {
    this.fetchSubmittedAndNotProviders();
  },
});
</script>
<style>
.p-picklist-buttons button:nth-child(2),
.p-picklist-buttons button:nth-child(3),
.p-picklist-buttons button:nth-child(4) {
  display: none;
}
</style>
