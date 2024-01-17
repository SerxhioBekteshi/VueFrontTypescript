import ProfileDetails from "./profileDetails/index.vue";
import profilePassword from "./profilePassword/index.vue";
import AppLayout from "@/layout/AppLayout.vue";

const profileRoutes = [
  {
    path: "/",
    component: AppLayout,
    children: [
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
    ],
  },
];

export default profileRoutes;
