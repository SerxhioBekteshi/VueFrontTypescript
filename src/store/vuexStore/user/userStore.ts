import { eMutationTypes } from "../../../assets/enums/eMutationTypes";
import { IUserState } from "@/interfaces/other/IUserState";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type UserState = { user: IUserState | null };

const state: UserState = {
  user: null,
};

//define the MutationType
export type Mutations<S = UserState> = {
  [eMutationTypes.SET_USER](state: S, payload: any): void;
};

//define mutations
const mutations: MutationTree<UserState> & Mutations = {
  [eMutationTypes.SET_USER](state: UserState, payload: any) {
    state.user = payload;
  },
};

//actions
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, UserState>, "commit">;

//action interface
export interface Actions {
  [eMutationTypes.SET_USER](
    { commit }: AugmentedActionContext,
    payload: any
  ): void;
}

//define actions
const actions: ActionTree<UserState, UserState> & Actions = {
  [eMutationTypes.SET_USER]({ commit }, payload: any) {
    commit(eMutationTypes.SET_USER, payload);
  },
};

//getter type
export type Getters = {
  getUser(state: UserState): IUserState | null;
};

const getters: GetterTree<UserState, UserState> & Getters = {
  getUser: (state: UserState) => state.user,
};

export const userModule = {
  state,
  mutations,
  actions,
  getters,
};

//setup store type
export type UserStore = Omit<
  VuexStore<UserState>,
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

export default userModule;
