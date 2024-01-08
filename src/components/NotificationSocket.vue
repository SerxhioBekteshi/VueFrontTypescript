<template>
  <div
    :class="`notification-item ${
      item?.seen === false
        ? 'bg-light-success bg-opacity-50 cursor-pointer unread'
        : ''
    }`"
  >
    <div
      className="flex align-items-start gap-3 cursor-pointer"
      @Click="() => handleClick(item?.id)"
    >
      <div
        class="circle-box md-box flex-shrink-0"
        style="width: 20px, height: 20px"
      ></div>
      <div className="col-9 notification-item-date">
        <div className="flex justify-content-between">
          <h5 className="mb-0 fw-bold text-black">
            {{ item?.sender.username }}
          </h5>
          <h5 className="mb-0 fs-6 fw-bold text-black">
            {{ moment(item?.createdAt).fromNow() }}
          </h5>
        </div>
        <div className="flex flex-column">
          <span className="d-block">
            {{ item?.message }}
            s
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
    const handleClick = async (id: any) => {
      emit("on-notification-click", id);
    };

    return { handleClick, moment };
  },
});
</script>
<style scoped>
.notifications-dropdown {
  background-color: var(--bs-dropdown-bg) !important;
}

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
.list-group-item {
  background-color: unset !important;
}
.notification-item-date {
  width: 85% !important;
}
.notification-item-title {
  width: 30%;
}
.avatars-hidden-list {
  width: 200px;
}
</style>
