import { ref, onMounted, onBeforeUnmount } from "vue";

const useDeviceDetect = () => {
  const isMobile = ref(checkForDevice());

  function checkForDevice() {
    const windowWidth = window.innerWidth;
    return windowWidth <= 545;
  }

  function handlePageResized() {
    isMobile.value = checkForDevice();
  }

  onMounted(() => {
    window.addEventListener("resize", handlePageResized);
    window.addEventListener("orientationchange", handlePageResized);
    window.addEventListener("load", handlePageResized);
    window.addEventListener("reload", handlePageResized);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handlePageResized);
    window.removeEventListener("orientationchange", handlePageResized);
    window.removeEventListener("load", handlePageResized);
    window.removeEventListener("reload", handlePageResized);
  });

  return isMobile;
};

export default useDeviceDetect;
