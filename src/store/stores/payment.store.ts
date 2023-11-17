import { IPaymentState } from "@/interfaces/other/IPaymentState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const paymentStore = createSlice({
  name: "payment",
  initialState: [] as unknown as IPaymentState[],
  reducers: {
    setPaymentData(_state, action: PayloadAction<any>) {
      return [..._state, action.payload];
    },
    clearPaymentState(_state) {
      return [] as unknown as [];
    },
  },
});

export default paymentStore;

export const { setPaymentData, clearPaymentState } = paymentStore.actions;
