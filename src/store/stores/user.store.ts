import { IUserState } from "@/interfaces/IUserState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: null as unknown as IUserState,
  reducers: {
    setUser(_state, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export default userStore;

export const { setUser } = userStore.actions;
