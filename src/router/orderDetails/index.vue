<template>
  <div v-if="user.role === eRoleType.Admin">
    <TableData
      v-if="orderId"
      :controller="`orderDetails/${orderId}`"
      :keyWhereFilter="'orderId'"
      ref="tableDataRef"
      :showEdit="false"
      :showAddBt="false"
      :showDelete="false"
      :showExport="false"
    />
  </div>
  <div v-else>
    <Panel toggleable>
      <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            size="large"
            shape="circle"
            :label="`${orderDetails?.id}`"
          />
          <span class="font-bold">{{ orderDetails?.orderIdGenerated }}</span>
        </div>
      </template>
      <template #footer>
        <div class="surface-ground px-2 py-3 md:px-3 lg:px-4">
          <div
            v-for="(item, index) in orderDetails?.items"
            :key="index"
            class="grid"
          >
            <div class="col-12 md:col-6 lg:col-3">
              <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                  <div>
                    <span class="block text-500 font-medium mb-3">{{
                      item.name
                    }}</span>
                    <div class="text-900 font-medium text-xl">
                      {{ item.quantity }}
                    </div>
                  </div>
                  <div
                    class="flex align-items-center justify-content-center bg-blue-100 border-round"
                    style="width: 2.5rem; height: 2.5rem"
                  >
                    <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                  </div>
                </div>
                <span class="text-green-500 font-medium mr-2"
                  >{{ item.unit_amount.value }}
                </span>
                <span class="text-500">
                  {{ item.unit_amount.currency_code }}</span
                >
              </div>
            </div>

            <!-- <Button icon="pi pi-user" rounded text></Button>
            <Button
              icon="pi pi-bookmark"
              severity="secondary"
              rounded
              text
            ></Button> -->
          </div>
        </div>

        <div><DynamicObject :items="orderDetails?.payer" /></div>
      </template>

      <div>
        <div class="flex align-items-center gap-3 text-xl mb-2">
          <span
            class="pi pi-paypal"
            style="color: blue; font-size: 1.25rem"
          ></span>
          <div
            style="
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            {{ orderDetails?.link }}
          </div>
        </div>

        <div class="flex align-items-center gap-3 text-xl mb-2">
          <span
            class="pi pi-home"
            style="color: red; font-size: 1.25rem"
          ></span>
          <div>{{ orderDetails?.address }}</div>
        </div>

        <div class="flex align-items-center gap-3 text-xl mb-2">
          <span
            class="pi pi-calendar"
            style="color: wheat; font-size: 1.25rem"
          ></span>
          <div>{{ orderDetails?.create_time }}</div>
        </div>

        <div class="flex align-items-center gap-3 text-xl mb-2">
          <span
            class="pi pi-money-bill"
            style="color: #0e9d6e; font-size: 1.25rem"
          ></span>
          <div>{{ orderDetails?.valuePaid }}</div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script lang="ts">
import eRoleType from "@/assets/enums/eRoleType";
import TableData from "@/components/table/TableData.vue";
import IOrderDetails from "@/interfaces/database/IOrderDetails";
import { RootState } from "@/store/vuexStore/types";
import axios from "axios";
import Avatar from "primevue/avatar";
// import Button from "primevue/button";
import Panel from "primevue/panel";
import { useToast } from "primevue/usetoast";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import DynamicObject from "@/components/table/DynamicObject.vue";

export default defineComponent({
  name: "OrderDetails",
  components: { TableData, Panel, Avatar, DynamicObject },
  enums: {
    eRoleType,
  },
  setup() {
    const route = useRoute();
    const orderId = ref<number>(0);
    const store = useStore<RootState>();
    const user = computed(() => store.getters.getUserInfo);
    const toast = useToast();
    const orderDetails = ref<IOrderDetails>();

    onMounted(() => {
      orderId.value = parseInt(
        Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
      );
      console.log(orderId.value);
      if (user.value.role !== eRoleType.Admin) {
        fetchOrderDetails();
      }
    });

    const fetchOrderDetails = async () => {
      try {
        const res: any = await axios.get(`order/${orderId.value}`);

        if (res && res.data) {
          console.log(res.data);
          orderDetails.value = res.data;
        }
      } catch (err: any) {
        toast.add({
          life: 3000,
          detail: err.message,
          severity: "success",
          summary: "info",
        });
      }
    };

    return { orderId, orderDetails, user, eRoleType };
  },
});
</script>
<style></style>
