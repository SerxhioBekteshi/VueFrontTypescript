import {
  AbilityBuilder,
  createMongoAbility,
  // defineAbility,
} from "@casl/ability";
import axios from "axios";
// import { provideAbility } from "@casl/vue";
// import { acl } from ".";
// import { useStore } from "vuex";
import store from "@/store/vuexStore/storeModules";
import eRoleType from "@/assets/enums/eRoleType";
import { eRoles } from "@/assets/enums/eRoles";

export const fetchUserPermissions = async () => {
  const response = await axios.get(`/user/loggedUser`);

  if (response && response.data) return response.data.accessPermissions;
};

export type Roles = "admin" | "provider" | "user";
export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type Subjects = string;

export const defineAbilityFor = async () => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  const userPermissions: any = store?.state;
  const accessPermissions = userPermissions?.user?.user?.accessPermissions;

  // acl.buildAbility(accessPermissions);

  // if(userPermissions?.user?.user?.role === eRoles.User && !userPermissions?.user?.user?.quizFulfilled) {
  //   can("read", "quiz layout");
  //   return build();
  // }
  // else
  if (accessPermissions) {
    // Dynamically define abilities based on fetched permissions
    accessPermissions.forEach((permission: any) => {
      const { action, subject } = permission;
      can(action.toLowerCase(), subject.toLowerCase());
      // provideAbility(ability);
      // defineAbility;
      // console.log(ability.rules, "ABILITY");
      // ability.can(action, subject);
    });
  } else {
    can("read", "all");
    //   ability.cannot("read", "restrictedSubject");
  }

  return build();
};
