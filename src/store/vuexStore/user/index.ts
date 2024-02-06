import { Module } from "vuex";
import { RootState } from "./types";
import { getters } from "./getters";
import { mutations } from "./mutation";
import { IUserState } from "@/interfaces/other/IUserState";
import { actions } from "./actions";

export interface UserState {
  user: IUserState | null;
}

const state: UserState = {
  user: null,
};

export const userStore: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
