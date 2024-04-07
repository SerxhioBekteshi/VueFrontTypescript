import { eRoles } from "@/assets/enums/eRoles";
import IMenu from "./IMeal";
import ePaymentMethod from "@/assets/enums/ePaymentMethod";
import IPermissions from "./IPermissions";

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
  image?: string;
  email?: string;
  createdAt?: Date;
  active?: boolean;
  lastName?: string;
  password?: string;
  verified?: boolean;
  createdBy?: String;
  phoneNumber?: string;
  accessPermissions?: IPermissions[];
  paymentMethod?: ePaymentMethod;
  menu?: IMenu | IMenu[];
  passwordConfirm?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  gender?: string;
  birthDate?: Date;
  firstLogin?: boolean;
}
