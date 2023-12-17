<template>
  <div class="card">
    <Message :closable="false"
      >Press the button in order to submit the account for the provider ( Or
      double click )</Message
    >

    <PickList
      v-model="generalDataAccounts"
      listStyle="height: fit-content"
      dataKey="id"
      :stripedRows="true"
      :showTargetControls="false"
      :showSourceControls="false"
      @move-to-target="handleMoveToTarget"
      @move-to-source="handleMoveToSource"
    >
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
          <div v-if="!slotProps.item.accountSubmitted">
            <!-- //if button clicked we will delete that account permanently -->
            <Button
              icon="pi pi-times"
              severity="danger"
              text
              rounded
              aria-label="Cancel"
            />
          </div>
        </div>
      </template>
    </PickList>
    <Toast />
  </div>
</template>

<script lang="ts">
import PickList from "primevue/picklist";
import Message from "primevue/message";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import Button from "primevue/button";

export default defineComponent({
  name: "ProvidersRegistration",
  components: { PickList, Message, Toast, Button },
  setup() {
    const generalDataAccounts = ref<any>([]);
    const toast = useToast();

    const fetchProviders = async () => {
      const res = await axios.get("/user/providers/get-all");

      if (res && res != null) {
        generalDataAccounts.value = [
          res.data.notSubmittedAccounts,
          res.data.submittedAccounts,
        ];
      }
    };

    const handleMoveToSource = async (event: { items: HTMLElement[] }) => {
      const res = await axios.put(
        `user/provider/controlSubmission/${
          JSON.parse(JSON.stringify(event.items))[0].id
        }`,
        { submit: false }
      );
      if (res && res !== null) {
        toast.add({
          life: 3000,
          detail: res.data.message,
          severity: "success",
          summary: "info",
        });
        fetchProviders();
      }
    };
    const handleMoveToTarget = async (event: { items: HTMLElement[] }) => {
      const res = await axios.put(
        `user/provider/controlSubmission/${
          JSON.parse(JSON.stringify(event.items))[0].id
        }`,
        { submit: true }
      );
      if (res && res !== null) {
        toast.add({
          life: 3000,
          detail: res.data.message,
          severity: "success",
          summary: "info",
        });
        fetchProviders();
      }
    };

    onMounted(() => {
      fetchProviders();
    });

    return { generalDataAccounts, handleMoveToTarget, handleMoveToSource };
  },
});
</script>
<style>
.p-picklist-buttons button:nth-child(2),
/* .p-picklist-buttons button:nth-child(3), */
.p-picklist-buttons button:nth-child(4) {
  display: none;
}
</style>
