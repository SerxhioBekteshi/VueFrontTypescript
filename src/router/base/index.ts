import LandingPage from "./LandingPage/index.vue";
import RegisterView from "./Register/index.vue";
import LoginView from "./Login/index.vue";
import ConfirmEmailView from "../user/confirm/index.vue";

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
    component: RegisterView,
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
];

export default baseRoutes;
