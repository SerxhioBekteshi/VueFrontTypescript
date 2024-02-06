import { Module } from "vuex";
import { actions } from "./actions";
import { IPaymentState } from "@/interfaces/other/IPaymentState";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutation";

export interface PaymentState {
  payment: IPaymentState | null;
}

const state: PaymentState = {
  payment: null,
};

export const paymentStore: Module<PaymentState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
