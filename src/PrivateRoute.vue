<template>
  <div>
    <slot v-if="user"></slot>
    <router-link v-else to="/login" :state="{ prev: prevLocation }" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'PrivateRoute',
  computed: {
    user() {
      return true;
    },
    prevLocation() {
      return useRoute().value.path;
    },
  },
};
</script>
