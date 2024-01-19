import store from "@/store/redux/configurations";
import { useReduxSelector } from "@/store/redux/helpers";
import { createMongoAbility } from "@casl/ability";
import axios from "axios";

export const fetchUserPermissions = async () => {
  const response = await axios.get(`/user/loggedUser`);

  if (response && response.data) return response.data.accessPermissions;
};

export const defineAbilityFor = async () => {
  const ability = createMongoAbility();

  //   if (user) {
  try {
    // const user = useReduxSelector((state) => state.user);

    const accessPermissions = await fetchUserPermissions();

    if (accessPermissions) {
      // Dynamically define abilities based on fetched permissions
      accessPermissions.forEach((permission: any) => {
        const { action, subject } = permission;
        ability.can(action, subject);
      });
    } else {
      ability.can("read", "");
      //   ability.cannot("read", "restrictedSubject");
    }
  } catch (error) {
    console.error("Error fetching user permissions:", error);
  }
  //   }

  return ability;
};
