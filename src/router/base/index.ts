import LandingPage from "./LandingPage/index.vue";
import RegisterView from "./Register/index.vue";
import RegisterProviderView from "./RegisterProvider/index.vue";
import LoginView from "./Login/index.vue";
import ConfirmEmailView from "../user/confirm/index.vue";
import ResetPasswordView from "./ResetPassword/index.vue";
import NotFoundRoutePage from "./404pageError.vue";

const baseRoutes = [
  {
    path: "/",
    component: LandingPage,
    name: "Landing Page",
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/registerProvider",
    name: "RegisterProviderView",
    component: RegisterProviderView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/confirm",
    name: "ConfirmEmailView",
    component: ConfirmEmailView,
  },
  {
    path: "/resetpassword",
    name: "ResetPasswordView",
    component: ResetPasswordView,
  },
  {
    path: "/404NotFound",
    name: "404NotFound",
    component: NotFoundRoutePage,
  },
  { path: "/:pathMatch(.*)", redirect: "/" },
];

export default baseRoutes;
