<template>
  <div
    class="h-100 w-100 flex flex-column align-items-center justify-content-between"
  >
    <div
      class="flex flex-column"
      :style="{
        maxWidth: '500px',
        margin: '0 auto',
        // marginTop: !isMobile ? '-100px' : '',
        paddingTop: '20%',
      }"
    >
      <!-- <div class="d-block d-md-none d-lg-none py-2 text-center">
        <MainLogo />
      </div> -->
      SOME MAIN LOGO STUFF
      <template v-if="token">
        <h1 class="text-primary text-bold m-2 fw-bold py-3 text-center">
          {{
            validToken
              ? `Email Verified Successfully`
              : `Email Verification has expired`
          }}
        </h1>
        <template v-if="validToken">
          <h3 class="text-muted fw-bold text-center">
            You will be redirected Shortly
          </h3>
        </template>
        <template v-else>
          <Button
            :disabled="disableResend"
            @click="handleResendEmail(true)"
            class="btn btn-outline-primary mx-4 mt-2"
          >
            {{
              disableResend
                ? `You can use resend again in 00:${countDown} seconds`
                : "Resend verification email"
            }}
          </Button>
        </template>
      </template>
      <template v-else>
        <h1 class="text-primary text-bold m-2 fw-bold py-3 text-center">
          Email verification Sent
        </h1>
        <h3 class="text-muted fw-bold text-center">
          Please confirm your email
        </h3>
        <Button
          :disabled="disableResend"
          @click="handleResendEmail(false)"
          class="btn btn-outline-primary mx-4 mt-2"
        >
          {{
            disableResend
              ? `You can use resend again in 00:${countDown} seconds`
              : "Resend verification email"
          }}
        </Button>
      </template>
    </div>
    <div class="w-100 flex p-4 justify-content-center">
      <Button
        @click="logoutAndNavigate"
        class="btn btn-primary"
        style="{ width: 241px, height: 56px }"
      >
        Go to login page
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import AuthManager from "@/utils/authManager";
// import useGetUser from "../../../../main/hooks/useGetUser";
// import { useStore } from "vuex";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useAbility } from "@casl/vue";
import { defineAbilityFor } from "@/initializers/ability";

export default defineComponent({
  name: "ConfirmEmailView",
  components: { Button },
  props: {},
  setup() {
    // const user = useGetUser();
    const route = useRoute();
    const token = route.query.token;
    const store = useStore();
    const ability = useAbility();

    const router = useRouter();
    // const store = useStore();
    const disableResend = ref<boolean>();
    const localCountdown = Number(localStorage.getItem("countDown"));

    const countDown = ref<number>(localCountdown > 0 ? localCountdown : 0);
    const validToken = ref<boolean>();

    onMounted(() => {
      let interval: any;
      if (localCountdown > 0) {
        interval = handleDisable(localCountdown > 0 ? localCountdown : 60);
      }
      return () => {
        clearInterval(interval);
      };
    });

    onMounted(() => {
      if (token) {
        (async () => {
          try {
            const res = await axios.post("authentication/confirm", null, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data) {
              ability.update([
                ...ability.rules,
                { action: "read", subject: "quiz layout" },
              ]);
              setTimeout(() => {
                AuthManager.loginWithToken(
                  res.data.user,
                  res.data.access_token,
                  res.data.refresh_token,
                  router,
                  store

                  // res.data.refresh_token,
                  // dispatch
                );
              }, 3000);
              const updatedAbility = await defineAbilityFor();
              ability.update(updatedAbility.rules);
              validToken.value = true;
            }
          } catch (err: any) {
            validToken.value = false;
          }
        })();
      }
    });

    const handleCountdown = () => {
      countDown.value = countDown.value - 1;

      if (countDown.value >= 0) {
        localStorage.setItem("countDown", countDown.value.toString());

        if (countDown.value === 0) {
          disableResend.value = false;
        }
      } else {
        countDown.value = 0;
      }
    };

    const handleDisable = (currentCountdown = 60) => {
      disableResend.value = true;
      countDown.value = currentCountdown;
      let interval = setInterval(handleCountdown, 1000);
      return interval;
    };

    const handleResendEmail = async (hasToken: boolean) => {
      let interval = handleDisable();
      setTimeout(() => {
        clearInterval(interval);
      }, 60000);

      if (hasToken) {
        await axios.post("authentication/resendEmailConfirmation", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("authentication/resendEmailConfirmation");
      }
    };

    const logoutAndNavigate = () => {
      // AuthManager.logout(store);
      router.push("/login");
    };

    return {
      // user,
      disableResend,
      countDown,
      validToken,
      // store,
      token,
      handleResendEmail,
      logoutAndNavigate,
      // Other returned values...
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
