<template>
    <div class="card">
        <PickList v-model="generalDataAccounts" listStyle="height: fit-content" dataKey="id" :stripedRows="true"
            :showTargetControls="false" :showSourceControls="false" @move-to-target="handleMoveToTarget">
            <template #sourceheader> Available </template>
            <template #targetheader> Selected </template>
            <template #item="slotProps">
                <div class="flex flex-wrap p-2 align-items-center gap-3">
                    <div class="flex-1 flex flex-column gap-2">
                        <span class="font-bold">{{ slotProps.item.name }}</span>
                        <div class="flex align-items-center gap-2">
                            <span>{{ slotProps.item.email }}</span>
                        </div>
                    </div>
                    <i class="pi pi-times" style="color: red;"></i>
                </div>
            </template>
        </PickList>
    </div>
</template>
  
<script lang="ts">
import PickList from "primevue/picklist"

import axios from "axios";
import { defineComponent } from "vue"

export default defineComponent({
    name: "ProvidersRegistration",
    components: { PickList },
    data() {
        return {
            generalDataAccounts: [] as object[][],

        }
    },
    methods: {
        async fetchSubmittedAndNotProviders() {
            const res = await axios.get("/providers/get-all")
            if (res) {
                this.generalDataAccounts = [res.data.providersNotSubmitted, res.data.providersSubmitted]
            }
        },
        async handleMoveToTarget(event: { items: HTMLElement[] }) {
            console.log(JSON.parse(JSON.stringify(event.items)), 'ITEMS')
            const res = await axios.put(`/submitAccount/${JSON.parse(JSON.stringify(event.items))[0].id}`)
        }
    },
    mounted() {

        this.fetchSubmittedAndNotProviders()
    }
});
</script>
<style></style>
  