<template>
  <div class="layout-topbar">
    <!-- <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>SAKAI</span>
        </router-link> -->

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <div class="flex align-items-center" v-tooltip="'Notifications'">
        <NotificationIcon :icon="'pi pi-circle'" />
      </div>
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar" v-tooltip="'Show date'"></i>
        <span>Calendar</span>
      </button>
      <button
        v-tooltip="'Profile'"
        @click="toggle"
        class="p-link layout-topbar-button"
      >
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
      <button @click="onLogoutClick()" class="p-link layout-topbar-button">
        <i class="pi pi-sign-out"></i>
        <span>Log out</span>
      </button>
    </div>
  </div>

  <Menu :model="items" ref="menu" :popup="true" id="overlay_menuProfile">
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
} from "vue";
import { useLayout } from "@/layout/composables/layout";
import { useRouter } from "vue-router";
import Menu from "primevue/menu";
// import JwtManager from "../utils/jwtManager";
import AuthManager from "@/utils/authManager";
import NotificationIcon from "@/components/NotificationIcon.vue";
import { useStore } from "vuex";
// import Calendar from "primevue/calendar";

export default defineComponent({
  name: "AppTopbar",
  components: { Menu, NotificationIcon },
  props: {},
  setup() {
    const { layoutConfig, onMenuToggle } = useLayout();

    const outsideClickListener = ref<any>(null);
    const topbarMenuActive = ref<boolean>(false);
    const router = useRouter();
    const menu = ref<any>();
    const showCalendar = ref<boolean>(false);
    const store = useStore();

    onMounted(() => {
      bindOutsideClickListener();
    });

    onBeforeUnmount(() => {
      unbindOutsideClickListener();
    });

    const logoUrl = computed(() => {
      return `layout/images/${
        layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
      }.svg`;
    });

    const onTopBarMenuButton = () => {
      topbarMenuActive.value = !topbarMenuActive.value;
    };

    const onCalendarIconClick = () => {
      showCalendar.value = true;
    };

    const onLogoutClick = () => {
      // topbarMenuActive.value = false;
      AuthManager.logout(store);
      router.push("/login");
      // JwtManager.clearToken();
    };
    const topbarMenuClasses = computed(() => {
      return {
        "layout-topbar-menu-mobile-active": topbarMenuActive.value,
      };
    });

    const bindOutsideClickListener = () => {
      if (!outsideClickListener.value) {
        outsideClickListener.value = (event: any) => {
          if (isOutsideClicked(event)) {
            topbarMenuActive.value = false;
          }
        };
        document.addEventListener("click", outsideClickListener.value);
      }
    };
    const unbindOutsideClickListener = () => {
      if (outsideClickListener.value) {
        document.removeEventListener("click", outsideClickListener);
        outsideClickListener.value = null;
      }
    };
    const isOutsideClicked = (event: any) => {
      if (!topbarMenuActive.value) return;

      const sidebarEl: any = document.querySelector(".layout-topbar-menu");
      const topbarEl: any = document.querySelector(
        ".layout-topbar-menu-button"
      );

      return !(
        sidebarEl?.isSameNode(event.target) ||
        sidebarEl?.contains(event.target) ||
        topbarEl?.isSameNode(event.target) ||
        topbarEl?.contains(event.target)
      );
    };

    const toggle = (event: any) => {
      menu.value.toggle(event);
    };

    const items = ref([
      {
        label: "Profile",
        items: [
          {
            label: "Password",
            icon: "pi pi-user-edit",
            route: "/profilePassword",
          },
          {
            label: "Details",
            icon: "pi pi-folder",
            route: "/profileDetails",
          },
        ],
      },
    ]);

    return {
      onMenuToggle,
      onLogoutClick,
      toggle,
      onTopBarMenuButton,
      menu,
      items,
      topbarMenuClasses,
    };
  },
});
</script>

<style lang="scss" scoped></style>
