<template>
  <div
    :class="`notification-item border-2 border-green-400 border-round ${
      item?.seen === false ? 'bg-green-100 cursor-pointer unread m-1 ' : ''
    }`"
  >
    <div
      @click="
        () => {
          $emit('on-notification-click', item?.id);
          console.log(item);
        }
      "
    >
      <!-- <div
        class="circle-box md-box flex-shrink-0"
        style="width: 20px, height: 20px"
      ></div> -->
      <div className="col-12 notification-item-date	">
        <div className="flex justify-content-between">
          <h5 className="mb-0 font-bold text-900	">
            {{ item?.sender.name }} {{ item?.sender.lastName }}
          </h5>
          <h5 className="mb-0 text-lg font-bold text-900">
            {{ moment(item?.createdAt).fromNow() }} here will be the date the
            notification
          </h5>
        </div>
        <div className="flex flex-column">
          <span className="d-block">
            {{ item?.message }}
            Here will be the message of the notification
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import moment from "moment";
import { INotificationItem } from "@/interfaces/other/INotificationItem";

export default defineComponent({
  name: "NotificationSocket",
  components: {},
  props: {
    item: { type: Object as PropType<INotificationItem> },
  },
  setup(props, { emit }) {
    return { moment };
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

.notification-item-date {
  width: 100% !important;
}
.notification-item-title {
  width: 30%;
}
</style>
