import { MutationTree } from "vuex";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { NotificationState } from ".";

export const mutations: MutationTree<NotificationState> = {
  [eMutationTypes.SET_ERROR_MESSAGE](state, payload: string) {
    state.errorMessage = payload;
  },
};
