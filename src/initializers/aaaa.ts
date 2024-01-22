import { createMongoAbility, MongoAbility as AppAbility } from "@casl/ability";

export type Subjects = string;
export type Roles = "user" | "agents" | "admin" | "manager" | "delete";
export type Actions = "manage" | "create" | "read" | "update" | "delete";

// export type AppAbility = Ability<[Actions, Subjects]> | undefined;

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
