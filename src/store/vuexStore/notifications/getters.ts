import { GetterTree } from "vuex";
import { RootState } from "../types";
import { NotificationState } from ".";

export const getters: GetterTree<NotificationState, RootState> = {
  getErrorMessage(state) {
    return state.errorMessage;
  },
};
