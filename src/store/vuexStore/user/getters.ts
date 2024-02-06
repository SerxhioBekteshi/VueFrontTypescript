import { GetterTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./index";

export const getters: GetterTree<UserState, RootState> = {
  getUserInfo(state) {
    return state.user;
  },
};
