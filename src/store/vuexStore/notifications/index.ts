import { Module } from "vuex";
import { actions } from "./actions";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutation";

export interface NotificationState {
  errorMessage: string;
}

const state: NotificationState = {
  errorMessage: "",
};

export const notificationStore: Module<NotificationState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
