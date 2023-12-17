import ProfileDetails from "./profileDetails/index.vue";
import profilePassword from "./profileDetails/index.vue";

const profileRoutes = [
  {
    path: "/profileDetails",
    name: "ProfileDetails",
    component: ProfileDetails,
  },
  {
    path: "/profilePassword",
    name: "ProfilePassword",
    component: profilePassword,
  },
];

export default profileRoutes;
