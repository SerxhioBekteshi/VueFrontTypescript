import { PaymentState } from "./payments";
import { UserState } from "./user";

export interface RootState {
  userModule: UserState;
  paymentModule: PaymentState;
}
