import { MutationTree } from "vuex";
import { UserState } from "./index";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { IUserState } from "@/interfaces/other/IUserState";

export const mutations: MutationTree<UserState> = {
  [eMutationTypes.SET_USER](state, payload: IUserState) {
    state.user = payload;
  },
  [eMutationTypes.CLEAR_USER](state) {
    state.user = null;
  },
};
