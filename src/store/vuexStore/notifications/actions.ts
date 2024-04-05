import { ActionTree } from "vuex";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { RootState } from "../types";
import { NotificationState } from ".";

export const actions: ActionTree<NotificationState, RootState> = {
  setErrorMessage({ commit }: any, payload: NotificationState) {
    commit(eMutationTypes.SET_ERROR_MESSAGE, payload);
  },
};
