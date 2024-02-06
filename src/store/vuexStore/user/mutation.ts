import { MutationTree } from "vuex";
import { UserState } from "./index";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";

export const mutations: MutationTree<UserState> = {
  [eMutationTypes.SET_USER](state, payload: any) {
    state.user = payload;
  },
  [eMutationTypes.CLEAR_USER](state) {
    state.user = null;
  },
};
