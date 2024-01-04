<script setup>
import { computed, watch, ref, onMounted, onBeforeUnmount } from "vue";
import AppTopbar from "./AppTopbar.vue";
import AppFooter from "./AppFooter.vue";
import AppSidebar from "./AppSidebar.vue";
import AppConfig from "./AppConfig.vue";
import { useLayout } from "@/layout/composables/layout";
// import useNotification from "@/hooks/useNotification/index.ts";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { useReduxSelector } from "@/store/redux/helpers";
import eRoles from "@/assets/enums/eRoles.ts";
const { layoutConfig, layoutState, isSidebarActive } = useLayout();
// const {
//   socket,
//   notifications,
//   connectSocket,
//   disconnectSocket,
//   addNotification,
// } = useNotification();

const toast = useToast();

const outsideClickListener = ref(null);

// onMounted(() => {
//   connectSocket();
//   const profile = useReduxSelector((state) => state.user);

//   socket.on("AppNotification", (notification) => {
//     // addNotification(notification);

//     if (profile.value.role === eRoles.Admin) {
//       toast.add({
//         life: 3000,
//         detail: notification.message,
//         severity: "info",
//         summary: "Pop up",
//       });
//     }
//   });
// });

// onBeforeUnmount(() => {
//   disconnectSocket();
// });

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    "layout-theme-light": layoutConfig.darkTheme.value === "light",
    "layout-theme-dark": layoutConfig.darkTheme.value === "dark",
    "layout-overlay": layoutConfig.menuMode.value === "overlay",
    "layout-static": layoutConfig.menuMode.value === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive.value &&
      layoutConfig.menuMode.value === "static",
    "layout-overlay-active": layoutState.overlayMenuActive.value,
    "layout-mobile-active": layoutState.staticMenuMobileActive.value,
    "p-input-filled": layoutConfig.inputStyle.value === "filled",
    "p-ripple-disabled": !layoutConfig.ripple.value,
  };
});
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
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
const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");

  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl?.contains(event.target) ||
    topbarEl?.isSameNode(event.target) ||
    topbarEl?.contains(event.target)
  );
};
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
    <div class="layout-sidebar">
      <app-sidebar></app-sidebar>
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <app-config></app-config>
    <div class="layout-mask"></div>
  </div>
  <Toast />
</template>

<style lang="scss" scoped></style>
