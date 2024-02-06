import { ActionTree } from "vuex";
import { PaymentState } from "./index";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { RootState } from "../types";
import { IPaymentState } from "@/interfaces/other/IPaymentState";

export const actions: ActionTree<PaymentState, RootState> = {
  setUser({ commit }: any, payload: IPaymentState) {
    commit(eMutationTypes.SET_PAYMENT, payload);
  },
  clearUser({ commit }: any) {
    commit(eMutationTypes.CLEAR_PAYMENT, null);
  },
};
