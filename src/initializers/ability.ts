import store from "@/store/redux/configurations";
import { useReduxSelector } from "@/store/redux/helpers";
import { createMongoAbility, defineAbility } from "@casl/ability";
import axios from "axios";
import { provideAbility } from "@casl/vue";
import { acl } from ".";

export const fetchUserPermissions = async () => {
  const response = await axios.get(`/user/loggedUser`);

  if (response && response.data) return response.data.accessPermissions;
};

export type Roles = "admin" | "provider" | "user";
export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type Subjects = string;

export const defineAbilityFor = async () => {
  const ability = createMongoAbility<[Actions, Subjects]>();
  // console.log(ability, "CREATE MONGO ABILITY??");

  //   if (user) {
  try {
    // const user = useReduxSelector((state) => state.user);

    const accessPermissions = await fetchUserPermissions();
    // acl.buildAbility(accessPermissions);

    // console.log(acl, "ACL");

    if (accessPermissions) {
      // Dynamically define abilities based on fetched permissions
      accessPermissions.forEach((permission: any) => {
        const { action, subject } = permission;
        ability.can(action.toLowerCase(), subject.toLowerCase());
        // provideAbility(ability);
        // defineAbility;
        console.log(ability.rules, "ABILITY");
        // ability.can(action, subject);
      });
    } else {
      ability.can("read", "");
      //   ability.cannot("read", "restrictedSubject");
    }
  } catch (error) {
    console.error("Error fetching user permissions:", error);
  }
  //   }
  console.log("Defined Abilities:", ability.rules); // Log defined abilities

  return ability;
};
