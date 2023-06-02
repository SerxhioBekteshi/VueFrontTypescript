import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import IUser from '../../../interfaces/IUser';

export interface IUserState {
  email: string;
  id: number;
  role: string;
  firstName: string;
  lastName: string;
}

const userStore = createSlice({
  name: 'user',
  initialState: null as unknown as IUserState,
  reducers: {
    setUser(_state, action: PayloadAction<any>) {
      return action.payload;
    },
  },
});

export default userStore;

export const { setUser } = userStore.actions;
