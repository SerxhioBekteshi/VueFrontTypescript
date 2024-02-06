import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { IUserState } from "@/interfaces/other/IUserState";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type PaymentState = { payment: IUserState | null };

const state: PaymentState = {
  payment: null,
};

//define the MutationType
export type Mutations<S = PaymentState> = {
  [eMutationTypes.SET_PAYMENT](state: S, payload: any): void;
};

//define mutations
const mutations: MutationTree<PaymentState> & Mutations = {
  [eMutationTypes.SET_PAYMENT](state: PaymentState, payload: any) {
    state.payment = payload;
  },
};

//actions
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PaymentState, PaymentState>, "commit">;

//action interface
export interface Actions {
  [eMutationTypes.SET_PAYMENT](
    { commit }: AugmentedActionContext,
    payload: any
  ): void;
}

//define actions
const actions: ActionTree<PaymentState, PaymentState> & Actions = {
  [eMutationTypes.SET_PAYMENT]({ commit }, payload: any) {
    commit(eMutationTypes.SET_PAYMENT, payload);
  },
};

//getter type
export type Getters = {
  getUser(state: PaymentState): IUserState | null;
};

const getters: GetterTree<PaymentState, PaymentState> & Getters = {
  getUser: (state: PaymentState) => state.payment,
};

export const paymentModule = {
  state,
  mutations,
  actions,
  getters,
};

//setup store type
export type PaymentStore = Omit<
  VuexStore<PaymentState>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export default paymentModule;
