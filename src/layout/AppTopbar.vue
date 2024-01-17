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
      <div class="flex align-items-center">
        <NotificationIcon :icon="'pi pi-circle'" />
      </div>
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
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
      <button
        @click="onLogoutClick()"
        v-tooltip="'Log out'"
        class="p-link layout-topbar-button"
      >
        <i class="pi pi-sign-out"></i>
        <span>Log out</span>
      </button>
    </div>
  </div>

  <Menu ref="menu" id="overlay_menuProfile" :model="items" :popup="true" />
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
import { useDispatch } from "@/store/redux/helpers";
import AuthManager from "@/utils/authManager";
import NotificationIcon from "@/components/NotificationIcon.vue";

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
    const dispatch = useDispatch();

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
    const onLogoutClick = () => {
      // topbarMenuActive.value = false;
      AuthManager.logout(dispatch);
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
        label: "Navigate",
        items: [
          {
            label: "Password",
            icon: "pi pi-user-edit",
            to: "/profilePassword",
          },
          {
            label: "Details",
            icon: "pi pi-folder",
            to: "/profileDetails",
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
