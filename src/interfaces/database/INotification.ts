export interface IAppNotification {
  id: number;
  _id?: any;
  message?: string;
  role?: string;
  route?: string;
  seen?: boolean;
  createdAt?: Date;
  sender?: number;
  title?: string;
}
