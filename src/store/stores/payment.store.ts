import { IPaymentState } from "@/interfaces/other/IPaymentState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const paymentStore = createSlice({
  name: "user",
  initialState: null as unknown as IPaymentState,
  reducers: {
    setPaymentData(_state, action: PayloadAction<any>) {
      return action.payload;
    },
    clearPaymentState(_state) {
      return null as unknown as IPaymentState;
    },
  },
});

export default paymentStore;

export const { setPaymentData, clearPaymentState } = paymentStore.actions;
