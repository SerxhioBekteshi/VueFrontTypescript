import { MutationTree } from "vuex";
import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { IPaymentState } from "@/interfaces/other/IPaymentState";
import { PaymentState } from ".";

export const mutations: MutationTree<PaymentState> = {
  [eMutationTypes.SET_PAYMENT](state, payload: IPaymentState) {
    state.payment = payload;
  },
  [eMutationTypes.CLEAR_PAYMENT](state) {
    state.payment = null;
  },
};
