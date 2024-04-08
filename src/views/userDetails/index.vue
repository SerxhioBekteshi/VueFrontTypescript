<template>
  <div class="grid nested-grid">
    <div class="md:col-4 sm:col-12">
      <div class="grid">
        <div class="col-12">
          <Card>
            <template #content>
              <div class="flex flex-column justify-content-start">
                <div class="f mb-3">
                  <Avatar
                    v-badge.danger="4"
                    class="p-overlay-badge"
                    icon="pi pi-user"
                    size="xlarge"
                  />
                </div>

                <p class="text-lg">
                  <strong>
                    {{ userDetails.name }} {{ userDetails.lastName }}
                  </strong>
                </p>
                <p class="text-lg">
                  {{ userDetails.role }}
                </p>
                <Button
                  severity="primary"
                  label="Send Email"
                  style="width: fit-content"
                  icon="pi pi-send"
                />
              </div>
            </template>
          </Card>
        </div>
        <div class="col-12">
          <Card>
            <template #content>
              <div class="flex flex-column gap-2">
                <div class="flex flex-wrap justify-content-between">
                  <div class="flex gap-2 align-items-center">
                    <div>
                      <span class="pi pi-link"> </span>
                    </div>
                    Website
                  </div>
                  <div>url website</div>
                </div>
                <div class="flex flex-wrap justify-content-between">
                  <div class="flex gap-2 align-items-center">
                    <div>
                      <span class="pi pi-instagram instagram"> </span>
                    </div>
                    Instagram
                  </div>
                  <div>url website</div>
                </div>
                <div class="flex flex-wrap justify-content-between">
                  <div class="flex gap-2 align-items-center">
                    <div>
                      <span class="pi pi-facebook facebook"> </span>
                    </div>
                    Facebook
                  </div>
                  <div>url website</div>
                </div>
                <div class="flex flex-wrap justify-content-between">
                  <div class="flex gap-2 align-items-center">
                    <div>
                      <span class="pi pi-twitter twitter"> </span>
                    </div>
                    Twitter
                  </div>
                  <div>url website</div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="md:col-8 sm:col-12">
      <div class="grid">
        <div class="col-12">
          <Card>
            <template #content>
              <Chart
                type="bar"
                :data="chartData"
                :options="chartOptions"
                class="h-13rem"
              />
            </template>
          </Card>
        </div>
        <div class="md:col-6 sm:col-12">
          <Card>
            <template #content>
              <div>
                <p><strong> Permisions </strong></p>
                <div
                  v-for="(action, index) in filteredActionObjects"
                  :key="index"
                >
                  <SystemUserPermission :actionName="action" />
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="md:col-6 sm:col-12">
          <Card>
            <template #content>
              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Full Name</strong></span>
                <span>{{ userDetails.name }} {{ userDetails.lastName }}</span>
              </div>
              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Phone Number</strong></span>
                <span>{{ userDetails.phoneNumber }} </span>
              </div>
              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Address</strong></span>
                <span>{{ userDetails.address }} </span>
              </div>

              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Birth Date </strong></span>
                <span>{{ userDetails.birthDate }} </span>
              </div>

              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Gender </strong></span>
                <span>{{ userDetails.gender }} </span>
              </div>

              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Account submitted </strong></span>
                <span>
                  <InputSwitch
                    disabled
                    readonly
                    :value="userDetails.accountSubmitted"
                /></span>
              </div>

              <div class="flex align-items-center gap-3 mb-2">
                <span> <strong> Quiz fulfilled </strong></span>
                <span>
                  <InputSwitch
                    disabled
                    readonly
                    :value="userDetails.quizFulfilled"
                  />
                </span>
              </div>
              <MeterGroup class="mt-3" :value="meterGroupValue" />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import eRoleType from "@/assets/enums/eRoleType";
import Avatar from "primevue/avatar";
import {
  PropType,
  computed,
  defineComponent,
  onMounted,
  provide,
  ref,
} from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import MeterGroup from "primevue/metergroup";
import InputSwitch from "primevue/inputswitch";
import IPermissions from "@/interfaces/database/IPermissions";
import Chart from "primevue/chart";
import SystemUserPermission from "./systemUserPermissions/index.vue";
import { IUser } from "@/interfaces/database/IUser";

export default defineComponent({
  name: "UserDetails",
  components: {
    Card,
    Avatar,
    Button,
    MeterGroup,
    InputSwitch,
    Chart,
    SystemUserPermission,
  },
  enums: {
    eRoleType,
  },
  props: {
    userDetails: { type: Object as PropType<IUser>, required: true },
  },
  setup(props) {
    const userId = ref<number>(0);
    const profilePercentageCompleted = ref<number>();
    const isLoading = ref<boolean>(true);

    const actionObjects = {
      Read: [],
      Custom: [],
      Add: [],
      Edit: [],
      Delete: [],
    };

    onMounted(() => {
      if (props.userDetails) {
        handleProfilePercentageCompleted(props.userDetails);
        handlePermissions(props.userDetails.accessPermissions);
      }
    });

    const handleProfilePercentageCompleted = (object) => {
      let nullCount = 0;
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          if (
            object[key] === null ||
            object[key] === undefined ||
            object[key] === ""
          ) {
            nullCount++;
          }
        }
      }
      profilePercentageCompleted.value = nullCount;
    };

    const handlePermissions = (permissions: IPermissions[] | undefined) => {
      if (permissions) {
        permissions.forEach((permission: IPermissions) => {
          console.log(actionObjects[permission.action]);
          actionObjects[permission.action].push(permission.subject);
        });
      }
    };

    provide("actionPermissionsObject", actionObjects);

    const filteredActionObjects = computed(() => {
      return Object.entries(actionObjects).map(([key, _]) => key);
    });

    const meterGroupValue = computed(() => {
      const userDetailsValue = props.userDetails;
      const totalKeys = Object.keys(userDetailsValue || {}).length;
      const percentageCompleted = profilePercentageCompleted.value || 0;

      return [
        {
          label: "Profile completed",
          value: ((totalKeys - percentageCompleted) / totalKeys) * 100,
          icon: "",
          color: "Red",
        },
      ];
    });

    onMounted(() => {
      chartData.value = setChartData();
      chartOptions.value = setChartOptions();
    });

    const chartData = ref();
    const chartOptions = ref();

    const setChartData = () => {
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Orders",
            backgroundColor: documentStyle.getPropertyValue("--cyan-500"),
            borderColor: documentStyle.getPropertyValue("--cyan-500"),
            data: [65, 59, 80, 81, 56, 55, 40, 12, 43, 21, 43, 76],
          },
        ],
      };
    };
    const setChartOptions = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    };

    return {
      userId,
      meterGroupValue,
      actionObjects,
      chartData,
      chartOptions,
      isLoading,
      filteredActionObjects,
    };
  },
});
</script>
<style scoped lang="scss">
.instagram {
  color: var(--pink-500);
}

.facebook {
  color: var(--blue-600);
}

.twitter {
  color: var(--cyan-300);
}
</style>
