import { IUserState } from "@/interfaces/other/IUserState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: null as unknown as IUserState,
  reducers: {
    setUser(_state, action: PayloadAction<any>) {
      return action.payload;
    },
    clearUser(_state) {
      return null as unknown as IUserState;
    },
  },
});

export default userStore;

export const { setUser } = userStore.actions;
