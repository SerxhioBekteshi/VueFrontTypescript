export interface ACL {
  action: string;
  subject: string;
}

export interface IUserState {
  email: string;
  id: number;
  _id?: any;
  role: string;
  name: string;
  lastName: string;
  nipt?: string;
  accountSubmitted?: boolean;
  quizFulfilled?: boolean;
  photo?: string;
  accessPermissions?: ACL[];
}
