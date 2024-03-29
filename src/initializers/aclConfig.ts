import { createMongoAbility, MongoAbility as AppAbility } from "@casl/ability";

export type Subjects = string;
export type Roles = "admin" | "provider" | "user";
export type Actions =
  | "manage"
  | "create"
  | "read"
  | "update"
  | "delete"
  | "upload"
  | "custom";

export type ACLObj = {
  action: Actions;
  subject: string;
};

export const defaultACLObj: ACLObj = {
  action: "read",
  subject: "",
};

export const buildAbility = (permissions: ACLObj[]): AppAbility =>
  createMongoAbility([
    {
      action: "read",
      subject: "profile",
    },
    ...permissions,
  ]);

// import { createMongoAbility, AbilityClass } from "@casl/ability";

// export type Actions = "create" | "read" | "update" | "delete" | "update";
// export type Subjects = string;
// export type Roles = "admin" | "provider" | "user";

// export type AppAbility = Ability<[Actions, Subjects]>;
// export const AppAbility = Ability as AbilityClass<AppAbility>;
