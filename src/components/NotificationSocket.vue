<template>
  <div
    v-if="item"
    :class="`notification-item border-2 border-green-400 border-round cursor-pointer m-1 ${
      item?.seen === false ? 'bg-green-100 cursor-pointer unread m-1 ' : ''
    }`"
  >
    <div>
      <div class="flex flex-column p-3">
        <div class="flex justify-content-between align-items-center">
          <h5 className="mb-0 font-bold text-900	">
            {{ item?.title }}
          </h5>
          <div
            class="flex flex-end"
            v-tooltip="'Delete'"
            @click="
              () => {
                $emit('handle-delete', item?.id);
              }
            "
          >
            <span style="color: red" class="pi pi-trash"></span>
          </div>
        </div>
        <div
          @click="
            () => {
              console.log(item?.id, item?.route);
              $emit('on-notification-click', {
                id: item?.id,
                route: item?.route,
              });
            }
          "
        >
          <h5 className="mb-0 text-lg font-bold text-900">
            {{ item?.user.name }} {{ item?.user.lastName }}
          </h5>
          <div class="flex align-items-center justify-content-between mt-3">
            <span>
              {{ item?.message }}
            </span>
            <span class="font-bold text-sm text-right">
              {{ moment(item?.createdAt).fromNow() }}
            </span>
          </div>
        </div>
      </div>
      <!-- <div
        class="circle-box md-box flex-shrink-0"
        style="width: 20px, height: 20px"
      ></div> -->
      <!-- <div className="col-12 notification-item-date	">
        <div className="flex justify-content-between">
          <h5 className="mb-0 font-bold text-900	">
            {{ item?.user.name }} {{ item?.user.lastName }}
          </h5>
          <h5 className="mb-0 text-lg font-bold text-900">
            {{ moment(item?.createdAt).fromNow() }}
          </h5>
        </div>
        <div className="flex flex-column">
          <span className="d-block">
            {{ item?.message }}
          </span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import moment from "moment";
import { INotificationItem } from "@/interfaces/other/INotificationItem";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NotificationSocket",
  components: {},
  emits: ["handle-delete", "on-notification-click"],
  props: {
    item: { type: Object as PropType<INotificationItem> },
  },
  setup(props, { emit }) {
    const router = useRouter();
    return { moment, router };
  },
});
</script>
<style scoped>
.notifications-header {
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: var(--bs-dropdown-bg);
}

.notification-item {
  padding: 0 !important;
  padding-left: 0 !important;
  background-color: white;
  /* .unread {
    &:hover {
      background-color: var(--bs-light-success);
    }
  } */
}

/* .notification-item-date {
  width: 100% !important;
} */
/* .notification-item-title { */
/* width: 30%; */
/* } */
</style>
