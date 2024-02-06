import { GetterTree } from "vuex";
import { RootState } from "../types";
import { PaymentState } from "./index";

export const getters: GetterTree<PaymentState, RootState> = {
  getPaymentInfo(state) {
    return state.payment;
  },
};
