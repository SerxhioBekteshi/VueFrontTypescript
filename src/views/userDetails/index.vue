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
                  v-if="userDetails.role !== eRoles.Admin"
                  severity="primary"
                  label="Send Email"
                  style="width: fit-content"
                  icon="pi pi-send"
                />
              </div>
            </template>
          </Card>
        </div>
        <div class="col-12" v-if="userDetails.role === eRoles.Provider">
          <Card>
            <template #content>
              <div v-if="isLoading" class="flex justify-content-center">
                <ProgressSpinner />
              </div>
              <div v-else>
                <OnClickOutside
                  :options="{
                    ignore: [
                      /* ... */
                    ],
                  }"
                  @trigger="() => handleOutsideClick()"
                >
                  <div
                    v-for="(social, index) in socials"
                    :key="index"
                    class="flex flex-column py-2"
                  >
                    <div class="flex flex-wrap justify-content-between">
                      <div class="flex gap-2 align-items-center">
                        <div>
                          <span :class="social.iconClass"> </span>
                        </div>
                        {{ social.name }}
                      </div>
                      <div
                        class="website"
                        @click="toggleSocialInput(social.name.toLowerCase())"
                        v-if="!inputSocial[social.name.toLowerCase()]"
                      >
                        <div v-if="social.url">
                          {{ social.url }}
                        </div>
                        <div v-else v-tooltip="'Click to add'">-</div>
                      </div>
                      <div v-else>
                        <InputText
                          v-model="social.url"
                          @change="
                            updateSocialData(
                              social.name.toLowerCase(),
                              social.url
                            )
                          "
                          style="width: 100%"
                        />
                      </div>
                    </div>
                  </div>
                </OnClickOutside>
              </div>
            </template>
          </Card>
        </div>
        <div v-if="userDetails.quizResults" class="col-12">
          <Card>
            <template #content>
              <div class="container">
                <p class="text-xl"><strong> Quiz results </strong></p>
                <div
                  v-for="(value, key) in userDetails.quizResults"
                  :key="key"
                  class="item"
                >
                  <strong>{{ key }}:</strong>
                  {{ Array.isArray(value) ? value.join(", ") : value }}
                </div>
              </div>
            </template>
            <template #footer>
              <Button label="Request to change quiz results" v-rippple="true" />
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
              <div v-if="userDetails.role === eRoles.Admin">ADMIN HERE</div>
              <div v-else>
                <Chart
                  type="bar"
                  :data="chartData"
                  :options="chartOptions"
                  class="h-13rem"
                />
              </div>
            </template>
          </Card>
        </div>
        <div class="md:col-6 sm:col-12">
          <Card>
            <template #content>
              <div v-if="filteredActionObjects">
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
              <div
                class="flex align-items-center gap-3 mb-2 justify-content-between"
              >
                <span> <strong> Full Name</strong></span>
                <span>{{ userDetails.name }} {{ userDetails.lastName }}</span>
              </div>
              <div
                class="flex align-items-center gap-3 mb-2 justify-content-between"
              >
                <span> <strong> Phone Number</strong></span>
                <span v-if="userDetails.phoneNumber"
                  >{{ userDetails.phoneNumber }}
                </span>
                <span v-else>-</span>
              </div>
              <div
                class="flex align-items-center gap-3 mb-2 justify-content-between"
              >
                <span> <strong> Address</strong></span>
                <span v-if="userDetails.address"
                  >{{ userDetails.address }}
                </span>
                <span v-else>-</span>
              </div>

              <div
                class="flex align-items-center gap-3 mb-2 justify-content-between"
                v-if="userDetails.role !== eRoles.Provider"
              >
                <span> <strong> Birth Date </strong></span>
                <span v-if="userDetails.birthDate"
                  >{{ userDetails.birthDate }}
                </span>
                <span v-else>-</span>
              </div>

              <div
                v-if="userDetails.role === eRoles.User"
                class="flex align-items-center gap-3 mb-2 justify-content-between"
              >
                <span> <strong> Gender </strong></span>
                <span v-if="userDetails.gender">{{ userDetails.gender }} </span>
                <span v-else>-</span>
              </div>

              <div
                class="flex align-items-center gap-3 mb-2 justify-content-between"
              >
                <span> <strong> Account submitted </strong></span>
                <span>
                  <InputSwitch
                    disabled
                    readonly
                    :modelValue="userDetails.accountSubmitted"
                /></span>
              </div>

              <div
                class="flex align-items-center gap-3 mb-2 justify-content-between"
                v-if="userDetails.role === eRoles.User"
              >
                <span> <strong> Quiz fulfilled </strong></span>
                <span>
                  <InputSwitch
                    disabled
                    readonly
                    :modelValue="userDetails.quizFulfilled"
                  />
                </span>
              </div>
              <div v-else>
                <div
                  v-if="userDetails.role === eRoles.Provider"
                  class="flex align-items-center gap-3 mb-2 justify-content-between"
                >
                  <span> <strong> Nipt </strong></span>
                  <span>
                    {{ userDetails.nipt }}
                  </span>
                </div>
                <div
                  v-if="userDetails.role === eRoles.Provider"
                  class="flex align-items-center gap-3 mb-2 justify-content-between"
                >
                  <span> <strong> Terms agreed </strong></span>

                  <span>
                    <InputSwitch
                      disabled
                      readonly
                      :modelValue="userDetails.termsAgreed"
                    />
                  </span>
                </div>
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
import { eRoles } from "@/assets/enums/eRoles";
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
import InputText from "primevue/inputtext";
// import type { OnClickOutsideHandler } from "@vueuse/core";
// import { onClickOutside } from "@vueuse/core";
import { OnClickOutside } from "@vueuse/components";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import ProgressSpinner from "primevue/progressspinner";

type socialItem = {
  name: string;
  iconClass: string;
  url?: string;
};

export type ISocials = socialItem[];

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
    OnClickOutside,
    InputText,
    ProgressSpinner,
  },
  enums: {
    eRoles,
  },
  props: {
    userDetails: { type: Object as PropType<IUser>, required: true },
  },
  emits: ["update-socials"],
  setup(props, { emit }) {
    const userId = ref<number>(0);
    const profilePercentageCompleted = ref<number>();
    const toast = useToast();
    const isLoading = ref<boolean>(false);

    const filteredActionObjects = ref<any>();
    const inputSocial = ref({
      website: false,
      twitter: false,
      facebook: false,
      instagram: false,
    });
    const socialsData = ref<ISocials>([
      { name: "Website", iconClass: "pi pi-link" },
      { name: "Instagram", iconClass: "pi pi-instagram instagram" },
      { name: "Facebook", iconClass: "pi pi-facebook facebook" },
      { name: "Twitter", iconClass: "pi pi-twitter twitter" },
    ]);

    const socials = computed(() => {
      return socialsData.value.map((social) => {
        let backEndData = null;
        if (props.userDetails.websites === undefined) {
          const websites = {
            website: "",
            facebook: "",
            instagram: "",
            twitter: "",
          };
          backEndData = websites[social.name.toLowerCase()];
        } else {
          backEndData = props.userDetails.websites[social.name.toLowerCase()];
        }
        return {
          ...social,
          url: backEndData !== null ? backEndData : "",
        };
      });
    });

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
      if (permissions && actionObjects) {
        filteredActionObjects.value = Object.entries(actionObjects).map(
          ([key, _]) => key
        );
        permissions.forEach((permission: IPermissions) => {
          if (permission.action === "Upload" || permission.action === "Rate")
            permission.action = "Custom";
          actionObjects[permission.action].push(permission.subject);
        });
      }
    };

    provide("actionPermissionsObject", actionObjects);

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
      if (props.userDetails.orders) {
        chartData.value = setChartData(props.userDetails.orders);
        chartOptions.value = setChartOptions();
      }
    });

    const chartData = ref();
    const chartOptions = ref();

    const setChartData = (orders: any) => {
      const documentStyle = getComputedStyle(document.documentElement);

      const mappedMonths = orders.map((order: any) => order._id.monthName);
      const mappedValuesForMonths = orders.map((order: any) => order.count);

      return {
        labels: mappedMonths,
        datasets: [
          {
            label: "Orders last year",
            backgroundColor: documentStyle.getPropertyValue("--cyan-500"),
            borderColor: documentStyle.getPropertyValue("--cyan-500"),
            data: mappedValuesForMonths,
          },
        ],
      };
    };

    // const requestQuizResultsChange = () => {
    //   const res: any = await axios.post("quizResults/change-request");
    //   if (res && res.data) {
    //   }
    // };

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

    const toggleSocialInput = (social: string) => {
      switch (social) {
        case "website":
          inputSocial.value.website = true;
          break;
        case "twitter":
          inputSocial.value.twitter = true;
          break;
        case "facebook":
          inputSocial.value.facebook = true;
          break;
        case "instagram":
          inputSocial.value.instagram = true;
          break;
        default:
          break;
      }
    };

    const updateSocialData = (socialName: string, url: string) => {
      const index = socialsData.value.findIndex(
        (social) => social.name.toLowerCase() === socialName
      );
      if (index !== -1) {
        socialsData.value[index].url = url;
      }
    };

    const handleOutsideClick = async () => {
      isLoading.value = true;

      if (
        Object.keys(inputSocial.value).some(
          (key) => inputSocial.value[key] === true
        )
      ) {
        const res: any = await axios.put(
          `user/websites/${props.userDetails.id}`,
          {
            websites: getUrlsObject(),
          }
        );

        if (res && res.data) {
          toast.add({
            severity: "success",
            summary: res.data.message,
            detail: "INFO",
            life: 3000,
          });
          emit("update-socials", false);
          isLoading.value = false;
        }
      }

      inputSocial.value.website = false;
      inputSocial.value.twitter = false;
      inputSocial.value.facebook = false;
      inputSocial.value.instagram = false;
      isLoading.value = false;
    };

    const getUrlsObject = () => {
      return socialsData.value.reduce((urls, social) => {
        const key = social.name.toLowerCase();
        urls[key] =
          social.url !== undefined
            ? social.url
            : props.userDetails.websites[key] || null;
        return urls;
      }, {});
    };

    return {
      userId,
      meterGroupValue,
      actionObjects,
      chartData,
      chartOptions,
      isLoading,
      filteredActionObjects,
      eRoles,
      inputSocial,
      socials,
      updateSocialData,
      handleOutsideClick,
      toggleSocialInput,
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

.website:hover {
  cursor: pointer;
}

.container {
  display: flex;
  flex-direction: column;
}

.item {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  background-color: var(--primary-100);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item strong {
  margin-right: 4px;
}
</style>
