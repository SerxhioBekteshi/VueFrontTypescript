import { eRoles } from "@/assets/enums/eRoles";
import IMenu from "./IMeal";
import ePaymentMethod from "@/assets/enums/ePaymentMethod";

export interface IUser {
  id: Number;
  name?: string;
  roleId?: Number;
  role?: eRoles;
  quizFulfilled?: Boolean;
  accountSubmitted?: Boolean;
  nipt?: String;
  termsAgreed?: String;
  address?: String;
  state?: String;
  photo?: string;
  email?: string;
  createdAt?: Date;
  active?: boolean;
  lastName?: string;
  password?: string;
  verified?: boolean;
  createdBy?: String;
  phoneNumber?: string;
  paymentMethod?: ePaymentMethod;
  menu?: IMenu | IMenu[];
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  gender?: string;
  birthDate?: Date;
  firstLogin?: boolean;
  createPasswordResetToken: () => string;
  changePasswordAfter: (iat: number) => boolean;
  correctPassword: (
    reqPassword: string,
    currentPassword: string
  ) => Promise<boolean>;
}