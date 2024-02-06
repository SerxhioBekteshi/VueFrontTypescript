import { ActionTree } from "vuex";
import { UserState } from "./index";
import { RootState } from "../types";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";

export const actions: ActionTree<UserState, RootState> = {
  setUser({ commit }: any, payload: any) {
    commit(eMutationTypes.SET_USER, payload);
  },
  clearUser({ commit }: any) {
    commit(eMutationTypes.CLEAR_USER, null);
  },
};
