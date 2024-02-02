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
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              @click="
                () => {
                  fieldModal.provider = slotProps.item.name;
                  fieldModal.id = slotProps.item.id;
                  openModal = true;
                }
              "
              aria-label="Cancel"
            />
          </div>
        </div>
      </template>
    </PickList>

    <Modal
      v-model:openModal="openModal"
      @handleClose="() => (openModal = false)"
      :title="'Delete meal'"
      :actions="modalActions"
    >
      Are you sure you want to delete
      <span class="font-bold"> {{ fieldModal?.provider }} </span> ?
    </Modal>

    <Toast />
  </div>
</template>

<script lang="ts">
import PickList from "primevue/picklist";
import Message from "primevue/message";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

import axios from "axios";
import { defineComponent, onMounted, ref, shallowRef } from "vue";
import Button from "primevue/button";
import Modal from "@/components/Modal.vue";

interface IFieldModal {
  id?: number;
  provider?: string;
}

export default defineComponent({
  name: "ProvidersRegistration",
  components: { PickList, Message, Toast, Button, Modal },
  setup() {
    const generalDataAccounts = ref<any>([]);
    const toast = useToast();
    const openModal = ref<boolean>(false);
    const fieldModal = ref<IFieldModal>({});

    const removeProviderAccount = async (id: number) => {
      try {
        const res = await axios.delete(`user/${fieldModal.value?.id}`);
        if (res && res.data) {
          toast.add({
            life: 3000,
            detail: res.data.message,
            severity: "success",
            summary: "info",
          });
          fetchProviders();
          openModal.value = false;
        }
      } catch (err) {
        console.log(err, "ERR IN PROVIDER DELETE ");
      }
    };

    const modalActions = shallowRef<any[]>([
      {
        component: Button,
        props: {
          type: "Submit",
          icon: "pi pi-times",
          label: "Delete",
          severity: "danger",
          onclick: removeProviderAccount,
        },
      },
      {
        component: Button,
        props: {
          label: "Cancel",
          icon: "pi pi-check",
          severity: "info",
          onclick: () => (openModal.value = false),
        },
      },
    ]);

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

    return {
      generalDataAccounts,
      openModal,
      modalActions,
      fieldModal,
      removeProviderAccount,
      handleMoveToTarget,
      handleMoveToSource,
    };
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
